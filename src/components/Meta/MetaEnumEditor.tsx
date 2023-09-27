import React from 'react'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { metaApi, MetaEnum } from '../../api/meta'
import { MetaEnumItemExpandEditor } from './components/MetaEnumItemExpandEditor'
import { Popconfirm } from 'antd'
import { RESTfulApi } from '../../utils'

type Row = MetaEnum & { id: number; newRow: boolean }

export const MetaEnumEditor = () => {
  const metaRestApi = new RESTfulApi<MetaEnum>(metaApi.data.enumRest, 'code')

  const columns: ProColumns[] = [
    {
      dataIndex: 'code',
      title: '枚举代码',
      editable: (_, record: Row) => {
        return record.newRow
      },
      formItemProps: { rules: [{ required: true, message: '不能为空' }] },
    },
    {
      dataIndex: 'label',
      title: '枚举名',
      formItemProps: { rules: [{ required: true, message: '不能为空' }] },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_text, record: Row, _, action) => {
        if (!record.editable) {
          return null
        }
        return [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id)
            }}
          >
            编辑
          </a>,
          <Popconfirm
            key="delete"
            title="确认删除该条数据吗?"
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              await metaRestApi.delete(record.code)
              action?.reload()
            }}
          >
            <a>删除</a>
          </Popconfirm>,
        ]
      },
    },
  ]

  const request = async (_params: any, _sort: any, _filter: any) => {
    const rows = await metaRestApi.list()
    return {
      data: rows.map((row, index) => ({ ...row, id: index, newRow: false })),
      success: true,
    }
  }

  const handleSave = async (_: React.Key, data: Row) => {
    if (!data.code || !data.label) {
      throw new Error('数据为空')
    }
    if (data.newRow) {
      await metaRestApi.create({ code: data.code, label: data.label })
      data.newRow = false
    } else {
      await metaRestApi.update({ code: data.code, label: data.label })
    }
  }

  const handleDelete = async (_: React.Key, row: Row) => {
    if (!row.newRow) {
      await metaRestApi.delete(row.code)
    }
  }

  return (
    <EditableProTable<Row>
      rowKey="id"
      columns={columns}
      expandable={{
        expandedRowRender: record => <MetaEnumItemExpandEditor row={record} />,
      }}
      request={request}
      recordCreatorProps={{
        creatorButtonText: '新增枚举',
        record: () => ({
          id: Date.now(),
          code: '',
          label: '',
          editable: true,
          items: [],
          newRow: true,
        }),
      }}
      editable={{
        type: 'multiple',
        onSave: handleSave,
        onDelete: handleDelete,
      }}
    />
  )
}
