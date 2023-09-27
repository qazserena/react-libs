import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Popconfirm } from 'antd'
import React from 'react'
import { metaApi, MetaEnum, MetaEnumItem } from '../../../api/meta'
import { RESTfulApi } from '../../../utils'

interface MetaEnumItemExpandEditorProps {
  row: MetaEnum
}

type Row = MetaEnumItem & { id: number; newRow: boolean }

export const MetaEnumItemExpandEditor = (props: MetaEnumItemExpandEditorProps) => {
  const api = new RESTfulApi<MetaEnumItem>(metaApi.data.enumRest + '/' + props.row.code, 'code')

  const columns: ProColumns[] = [
    {
      dataIndex: 'code',
      title: 'code',
      formItemProps: { rules: [{ required: true }] },
    },
    {
      dataIndex: 'value',
      title: '值',
      valueType: 'digit',
      formItemProps: { rules: [{ required: true }] },
    },
    {
      dataIndex: 'label',
      title: '名称',
      formItemProps: { rules: [{ required: true }] },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_text, record, _, action) => {
        if (!props.row.editable) {
          return []
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
              await api.delete(record.code)
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
    const rows = await api.list()
    return {
      data: rows.map((row, index) => ({ ...row, id: index, newRow: false })),
      success: true,
    }
  }

  const handleSave = async (_: React.Key, data: Row) => {
    if (data.newRow) {
      await api.create({ code: data.code, value: data.value, label: data.label })
      data.newRow = false
    } else {
      await api.update({ code: data.code, value: data.value, label: data.label })
    }
  }

  const handleDelete = async (_: React.Key, row: Row) => {
    if (!row.newRow) {
      await api.delete(row.code)
    }
  }

  return (
    <EditableProTable<Row>
      size="small"
      rowKey="id"
      recordCreatorProps={{
        creatorButtonText: '添加一项',
        record: () => {
          return { code: '', label: '', value: 0, id: Date.now(), newRow: true }
        },
      }}
      request={request}
      bordered
      columns={columns}
      editable={{ onSave: handleSave, onDelete: handleDelete }}
    />
  )
}
