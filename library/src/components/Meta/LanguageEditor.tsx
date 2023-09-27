import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import ProForm, {
  ModalForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-form'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Menu,
  message,
  Popconfirm,
  Row,
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { metaApi, MetaEnum } from '../../api/meta'
import { useMounted } from '../../hooks'
import { LanguageApi, LanguageItem } from '../../api/language'
import { LanguageForm } from './components/LanguageForm'
import { RESTfulApi } from '../../utils'

interface LanguageEditorProps {
  /**
   * 本地语言项
   */
  localLanguages?: LanguageItem[]
  /**
   * 表格列中默认显示的语言
   */
  defaultLanguage?: string
  /**
   * 禁用自动加载枚举多语言
   */
  disableEnumLanguage?: boolean
}

type Row = LanguageItem & {
  type: 'server' | 'local'
}

/**
 * 多语言编辑器
 *
 * 数据来源
 * 1. 本地配置文件
 * 2. 枚举自动填充
 * 3. 从服务器读取
 *
 * @returns
 */
export const LanguageEditor = (props: LanguageEditorProps) => {
  const [columns, setColumns] = useState<ProColumns<Row>[]>([])
  const [dataSource, setDataSource] = useState<Row[]>([])
  const [selectedRow, setSelectedRow] = useState<LanguageItem>()
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([])
  const [enumLanguages, setEnumLanguages] = useState<LanguageItem[]>([])
  const languages = useRef<Map<string, Row>>(new Map())
  const [serverLanguages, setServerLanguages] = useState<LanguageItem[]>([])
  const [searchKeyword, setSearchKeyword] = useState<string>()
  const formRef = useRef<ProFormInstance>()
  const mounted = useMounted()
  const languageApi = new LanguageApi()

  const handleDeleteRow = async (record: LanguageItem) => {
    await languageApi.delete(record.langKey)
    setServerLanguages(serverLanguages => {
      return serverLanguages.filter(item => item.langKey !== record.langKey)
    })
    setSelectedRow(selectedRow => {
      if (selectedRow && selectedRow.langKey === record.langKey) {
        return undefined
      }
      return selectedRow
    })
  }

  useEffect(() => {
    languageApi.getSupporedLanguages().then(languages => {
      if (!mounted.current) {
        return
      }
      setSupportedLanguages(languages)
      const columns = languages.map(language => {
        return {
          dataIndex: language,
          title: language,
          hideInTable: props.defaultLanguage
            ? language !== props.defaultLanguage
            : language !== 'zhCN',
          search: false,
          ellipsis: true,
          valueType: 'textarea',
        } as ProColumns
      })
      setColumns([
        {
          dataIndex: 'langKey',
          title: 'key',
        },
        ...columns,
        {
          dataIndex: 'option',
          title: '操作',
          hideInDescriptions: true,
          valueType: 'option',
          width: '60px',
          render: (_, record) => {
            if (record.type === 'local') {
              return undefined
            }
            return (
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
          },
        },
      ])
    })
  }, [])

  useEffect(() => {
    if (columns.length === 0) {
      return
    }
    languageApi.list().then(data => {
      setServerLanguages(data)
    })
    if (!props.disableEnumLanguage) {
      const metaRestApi = new RESTfulApi<MetaEnum>(metaApi.data.enumRest, 'code')
      metaRestApi.list().then(data => {
        const list: LanguageItem[] = []
        for (const em of data) {
          for (const item of em.items) {
            list.push({
              langKey: 'enum.' + em.code + '.' + item.value,
              zhCN: item.label,
            })
          }
        }
        setEnumLanguages(list)
      })
    }
  }, [columns, props.disableEnumLanguage])

  useEffect(() => {
    languages.current.clear()
    // 合并本地数据
    if (props.localLanguages) {
      for (const item of props.localLanguages) {
        languages.current.set(item.langKey, { ...item, type: 'local' })
      }
    }
    // 合并枚举数据
    for (const item of enumLanguages) {
      languages.current.set(item.langKey, { ...item, type: 'local' })
    }
    // 合并服务器数据
    for (const item of serverLanguages) {
      languages.current.set(item.langKey, { ...item, type: 'server' })
    }
    let list: Row[] = []
    languages.current.forEach(item => list.push(item))
    list.sort((a, b) => a.langKey.localeCompare(b.langKey))
    if (searchKeyword) {
      list = list.filter(item => {
        return (
          item.langKey.indexOf(searchKeyword) >= 0 ||
          (item['zhCN'] && item['zhCN'].indexOf(searchKeyword) >= 0)
        )
      })
    }
    // 设置数据
    setDataSource(list)
  }, [props.localLanguages, serverLanguages, enumLanguages, searchKeyword])

  useEffect(() => {
    if (selectedRow) {
      formRef.current?.resetFields()
      formRef.current?.setFieldsValue(selectedRow)
    }
  }, [selectedRow])

  const handleFormFinish = async (data: Row) => {
    await languageApi.update(data)
    setServerLanguages(serverLanguages => {
      let exist = false
      const list = serverLanguages.map(item => {
        if (item.langKey === data.langKey) {
          exist = true
          return { ...data, type: 'server' }
        }
        return item
      })
      if (!exist) {
        list.push({ ...data, type: 'server' })
      }
      return list
    })
    message.success('保存成功!')
  }

  const handleCreate = async (data: { langKey: string }) => {
    if (serverLanguages.findIndex(item => item.langKey === data.langKey) >= 0) {
      message.error('存在重复的key')
      return false
    }

    await languageApi.create(data)
    const newItem = { langKey: data.langKey, type: 'server' }
    setServerLanguages(serverLanguages => {
      return [...serverLanguages, newItem]
    })
    setSelectedRow(newItem)
    return true
  }

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    setSelectedRow(undefined)
  }

  return (
    <Row>
      <Col span={16}>
        <ProTable<Row>
          rowKey="langKey"
          size="small"
          columns={columns}
          dataSource={dataSource}
          options={{ setting: false, density: false, reload: false }}
          search={false}
          rowClassName={record => {
            return record.langKey === selectedRow?.langKey
              ? 'ant-table-row-selected'
              : ''
          }}
          onRow={record => {
            return {
              onClick: event => {
                event.stopPropagation()
                setSelectedRow(record)
                return false
              },
            }
          }}
          toolBarRender={() => [
            <Input.Search
              key="searchKey"
              style={{ width: 300 }}
              placeholder="输入多语言Key模糊搜索"
              onSearch={handleSearch}
              enterButton
            />,
            <ModalForm
              key="new"
              layout="inline"
              title="新建一条多语言"
              modalProps={{ destroyOnClose: true }}
              trigger={
                <Button icon={<PlusOutlined />} type="primary">
                  新建
                </Button>
              }
              onFinish={handleCreate}
            >
              <ProForm.Group>
                <ProFormText
                  width="xl"
                  name="langKey"
                  label="多语言Key"
                  rules={[{ required: true }]}
                />
              </ProForm.Group>
            </ModalForm>,
            <Dropdown
              key="menu"
              overlay={
                <Menu>
                  <Menu.Item key="1">批量导入</Menu.Item>
                  <Menu.Item key="2">批量导出</Menu.Item>
                </Menu>
              }
            >
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>,
          ]}
        />
      </Col>
      <Col span={8}>
        {selectedRow && (
          <Card title={'编辑多语言项:' + selectedRow.langKey}>
            <LanguageForm
              supportedLanguages={supportedLanguages}
              value={selectedRow}
              onFinish={handleFormFinish}
            />
          </Card>
        )}
      </Col>
    </Row>
  )
}
