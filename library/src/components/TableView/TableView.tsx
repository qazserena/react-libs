import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import ProTable, { ActionType, RequestData } from '@ant-design/pro-table'
import { TableFormType, TableViewColumn, TableViewProps } from './typing'
import { SortOrder } from 'antd/lib/table/interface'
import { Condition, ConditionBuilder, ConditionItem, TableSchema } from '../..'
import { ParamsType } from '@ant-design/pro-provider'
import { Alert, Button, message, Popconfirm } from 'antd'
import { FormCreator } from './Form'
import { ExportButton } from './ExportButton'
import { useMounted } from '../../hooks'
import { MetaContext } from '../../contexts'
import { TimestampPicker, TimestampRender } from '../Timestamp'
import { Sort, tableAddressRegister, TableApi } from '../../api'
import { PlusOutlined } from '@ant-design/icons'

type RequestFn = (
  params: ParamsType & {
    pageSize?: number
    current?: number
    keyword?: string
  },
  sort: Record<string, SortOrder>,
  filter: Record<string, React.ReactText[] | null>
) => Promise<Partial<RequestData<any>>>

const requestForeignField = async (table: string, valueField: string, labelField?: string) => {
  const address = tableAddressRegister.query(table)
  const tableApi = new TableApi(address, table)
  const rows: any[] = await tableApi.query([valueField, labelField || valueField])
  return rows.map(row => {
    return { value: row[valueField], label: row[labelField || valueField] }
  })
}

/**
 * 通用数据表组件
 */
const TableView: React.FC<TableViewProps> = props => {
  const [schema, setSchema] = useState<TableSchema>()
  const [loading, setLoading] = useState<boolean>(false)
  const actionRef = useRef<ActionType>()
  const [currentEditRow, setCurrentEditRow] = useState<Record<string, any>>()
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false)
  const mounted = useMounted()
  const metaContext = useContext(MetaContext)
  const [errorMessage, setErrorMessage] = useState('')
  const loadingLock = useRef<boolean>(false)
  const [conditionString, setConditionString] = useState<string>()

  const primaryKey = useMemo<string | undefined>(() => {
    if (!schema) {
      return
    }
    for (const column of schema.columns) {
      if (column.primaryKey) {
        return column.name
      }
    }
    return
  }, [schema])

  const handleEditRow = useCallback(
    (row: Record<string, any>) => {
      setCurrentEditRow(row)
    },
    [setCurrentEditRow]
  )

  const handleDeleteRow = useCallback(
    async (row: Record<string, any>) => {
      if (!primaryKey) {
        message.error('找不到主键')
        return
      }
      const pkv = row[primaryKey]
      await props.dataProvider.delete(pkv)
      actionRef.current?.reload()
    },
    [primaryKey, props.dataProvider]
  )

  const behaviour = useMemo<{
    create?: boolean
    update?: boolean
    delete?: boolean
    export?: boolean
  }>(() => {
    if (!schema || !schema.behaviour) {
      return { create: false, update: false, delete: false, export: false }
    }
    return schema.behaviour
  }, [schema])

  const columns = useMemo<TableViewColumn[]>(() => {
    let items: TableViewColumn[] = []
    if (!schema) {
      return items
    }
    items = schema.columns
      .filter(columns => !columns.hidden)
      .map((column, index) => {
        const proColumn: TableViewColumn = {
          title: column.label,
          dataIndex: column.name,
          key: column.name,
          valueType: column.valueType as any,
          search: !column.queryable ? false : undefined,
          columnSchema: column,
          sequence: index * 10,
          sorter: column.sortable,
          defaultSortOrder: column.defaultSortOrder,
        }

        const metaEnum = column.meta?.enum
        if (metaEnum) {
          proColumn.request = async () => {
            const result = metaContext.getEnum(metaEnum.name)
            if (!result) {
              return []
            }
            return result.items.map(item1 => {
              return {
                label: item1.label,
                value: metaEnum.type === 'integer' ? item1.value : item1.code,
              }
            })
          }
        }

        const foreignField = column.meta?.foreignField
        if (foreignField) {
          proColumn.request = async () => {
            return await requestForeignField(foreignField.table, foreignField.valueField, foreignField.labelField)
          }
        }

        if (column.valueType === 'timestamp') {
          const metaTimestamp = column.meta?.timestamp
          proColumn.render = (_, record: any) => {
            return <TimestampRender value={record[column.name]} {...metaTimestamp} />
          }
          proColumn.renderFormItem = (_, props) => {
            return <TimestampPicker {...props} {...metaTimestamp} />
          }
        }

        return proColumn
      })
    if (props.rowOptionRender || behaviour.update || behaviour.delete) {
      items.push({
        title: '操作',
        key: 'option',
        width: 180,
        sequence: items.length * 10,
        valueType: 'option',
        render: (_, record) => {
          const options: React.ReactNode[] = []
          if (behaviour.update) {
            options.push(
              <a
                key="edit"
                onClick={() => {
                  handleEditRow(record)
                }}
              >
                修改
              </a>
            )
          }
          if (behaviour.delete) {
            options.push(
              <Popconfirm
                key="delete"
                title="确认删除该条数据吗?"
                okText="确认"
                cancelText="取消"
                onConfirm={() => {
                  handleDeleteRow(record)
                }}
              >
                <a>删除</a>
              </Popconfirm>
            )
          }
          if (props.rowOptionRender) {
            options.push(...props.rowOptionRender(record))
          }
          return options
        },
      })
    }
    if (props.columnPostProcessor) {
      items = props.columnPostProcessor(items)
    }
    if (props.columns) {
      const existColumns = new Set()
      items = items.map(item => {
        existColumns.add(item.dataIndex)
        const column = props.columns![item.dataIndex as string]
        if (column) {
          return { ...item, ...column } as TableViewColumn
        }
        return item
      })
      for (const key in props.columns) {
        if (!existColumns.has(key)) {
          items.push(props.columns[key])
        }
      }
    }
    items.forEach(item => {
      item.order = 100000 - (item.sequence || 0)
    })
    return items.sort((a, b) => (a.sequence || 0) - (b.sequence || 0))
  }, [schema, props.columnPostProcessor, props.columns, behaviour])

  const searchFormConfig = useMemo(() => {
    if (columns.findIndex(column => column.search !== false && column.dataIndex) >= 0) {
      return {}
    } else {
      return false
    }
  }, [columns])

  useEffect(() => {
    if (loadingLock.current) {
      return
    }
    loadingLock.current = true
    setLoading(true)
    props.dataProvider
      .loadSchema()
      .then(schema => {
        if (!mounted.current) {
          return
        }
        if (props.schemaPostProcesser) {
          schema = props.schemaPostProcesser(schema)
        }
        setLoading(false)
        loadingLock.current = false
        setSchema(schema)
        setErrorMessage('')
      })
      .catch(e => {
        if (mounted.current) {
          setLoading(false)
          loadingLock.current = false
          setErrorMessage(e + '')
        }
      })
    // 数据接口发生变化时, 重新加载表配置
  }, [props.dataProvider])

  useEffect(() => {
    if (!schema) {
      return
    }
    actionRef.current?.reload()
    // 表配置发生变化时，重新加载
  }, [schema, props.extraCondition])

  const requestData: RequestFn = async (params, sort, filters) => {
    if (!schema) {
      return { success: false }
    }

    const conditions: ConditionItem[] = []
    if (params && columns.length > 0) {
      for (const column of columns) {
        const columnSchema = column.columnSchema
        if (columnSchema && params[columnSchema.name]) {
          if (columnSchema.fuzzyQuery) {
            conditions.push(Condition.like(columnSchema.name, params[columnSchema.name]))
          } else {
            conditions.push(Condition.equal(columnSchema.name, params[columnSchema.name]))
          }
        } else {
          if (column.conditionBuilder) {
            const item = column.conditionBuilder(params)
            if (item) {
              conditions.push(item)
            }
          }
        }
      }
    }
    if (filters) {
      for (const key in filters) {
        const value = filters[key]
        if (value && Array.isArray(value)) {
          conditions.push(Condition.in(key, value))
        }
      }
    }
    let conditionBuilder: ConditionBuilder | null = null
    if (conditions.length > 0) {
      conditionBuilder = new ConditionBuilder()
      conditionBuilder.all(conditions)
    }

    if (props.extraCondition && !props.extraCondition.empty) {
      if (!conditionBuilder) {
        conditionBuilder = props.extraCondition
      } else {
        conditionBuilder.and().group(props.extraCondition)
      }
    }

    const sorts: Sort[] | undefined = sort
      ? Object.keys(sort).map(key => ({ name: key, direction: sort[key]! }))
      : undefined

    loadingLock.current = true

    const tmpConditionSting = conditionBuilder ? conditionBuilder.buildString() : undefined
    setConditionString(tmpConditionSting)

    setLoading(true)
    try {
      const pageData = await props.dataProvider.loadPage(
        params.current! - 1,
        params.pageSize!,
        tmpConditionSting,
        sorts
      )
      setErrorMessage('')
      return {
        data: pageData.content,
        success: true,
        total: pageData.totalElements,
      }
    } catch (e) {
      if (mounted.current) {
        setErrorMessage(e + '')
      }
      return {
        data: [],
        total: 0,
        success: true,
      }
    } finally {
      if (mounted.current) {
        loadingLock.current = false
        setLoading(false)
      }
    }
  }

  useImperativeHandle(props.actionRef, () => {
    return {
      reload: async () => {
        await actionRef.current?.reload()
      },
      openTableForm: (type: TableFormType, editRow?: Record<string, any>) => {
        if (type === TableFormType.EDIT) {
          if (editRow) {
            setCurrentEditRow(editRow)
          }
        } else {
          setCreateFormVisible(true)
        }
      },
    }
  })

  const handleEditFormSuccess = useCallback(() => {
    setTimeout(() => {
      actionRef.current?.reload()
    }, 300)
  }, [setCurrentEditRow])

  const handleEditFormClose = useCallback(() => {
    setCurrentEditRow(undefined)
  }, [setCurrentEditRow])

  const handleCreateFormSuccess = useCallback(() => {
    setTimeout(() => {
      actionRef.current?.reload()
    }, 300)
  }, [setCreateFormVisible])

  const handleCreateFormClose = useCallback(() => {
    setCreateFormVisible(false)
  }, [setCreateFormVisible])

  if (columns.length === 0) {
    return <></>
  }

  return (
    <>
      {behaviour.update && (
        <FormCreator
          formType={TableFormType.EDIT}
          dataProvider={props.dataProvider}
          visible={!!currentEditRow}
          columns={columns}
          currentRow={currentEditRow}
          creatorFun={props.formCreator}
          onSuccessComplete={handleEditFormSuccess}
          onClose={handleEditFormClose}
        />
      )}
      {behaviour.create && (
        <FormCreator
          key="create-form"
          formType={TableFormType.CREATE}
          visible={createFormVisible}
          dataProvider={props.dataProvider}
          columns={columns}
          creatorFun={props.formCreator}
          onSuccessComplete={handleCreateFormSuccess}
          onClose={handleCreateFormClose}
        />
      )}
      {errorMessage && (
        <Alert
          type="error"
          onClose={() => {
            setErrorMessage('')
          }}
          description={errorMessage}
          closable
          showIcon
        ></Alert>
      )}
      <ProTable
        {...props.proTableProps}
        actionRef={actionRef}
        columns={columns}
        search={searchFormConfig}
        rowKey={primaryKey}
        request={requestData}
        loading={loading}
        size="small"
        toolBarRender={() => [
          props.toolbarActions,
          behaviour.create && (
            <Button
              key="create-form-button"
              type="primary"
              onClick={() => {
                setCreateFormVisible(true)
              }}
            >
              <PlusOutlined />
              新建
            </Button>
          ),
          behaviour.export && schema ? (
            <ExportButton key="export" schema={schema} dataProvider={props.dataProvider} condition={conditionString} />
          ) : undefined,
        ]}
        options={{
          density: false,
        }}
        headerTitle={schema?.label || ''}
      ></ProTable>
    </>
  )
}

export default TableView
