import React, { useState } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import ProTable, { EditableProTable } from '@ant-design/pro-table'
import { ProFormRadio, ProFormField } from '@ant-design/pro-form'

const waitTime = (time: number = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

type DataSourceType = {
  id: React.Key
  title?: string
  readonly?: string
  decs?: string
  state?: string
  created_at?: string
  update_at?: string
  children?: DataSourceType[]
}

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    update_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
    update_at: '2020-05-26T08:19:22Z',
  },
]

export const DemoTest = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<DataSourceType[]>([])
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom')

  const columns: ProColumns<DataSourceType>[] = [
    {
      dataIndex: 'id',
      title: 'id',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
        }
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0
      },
      width: '15%',
    },
    {
      title: '活动名称二',
      dataIndex: 'readonly',
      tooltip: '只读，使用form.getFieldValue可以获取到值',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
        }
      },
      readonly: true,
      width: '15%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      fieldProps: (from: any, { rowKey, rowIndex }: any) => {
        if (from.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          }
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          }
        }
        return {}
      },
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter(item => item.id !== record.id))
          }}
        >
          删除
        </a>,
      ],
    },
  ]

  return (
    <ProTable<DataSourceType>
      rowKey="id"
      headerTitle="可编辑表格"
      toolBarRender={() => [
        <ProFormRadio.Group
          key="render"
          fieldProps={{
            value: position,
            onChange: e => setPosition(e.target.value),
          }}
          options={[
            {
              label: '添加到顶部',
              value: 'top',
            },
            {
              label: '添加到底部',
              value: 'bottom',
            },
            {
              label: '隐藏',
              value: 'hidden',
            },
          ]}
        />,
      ]}
      columns={columns}
      request={async () => ({
        data: defaultData,
        total: 3,
        success: true,
      })}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row)
          await waitTime(2000)
        },
        onChange: setEditableRowKeys,
      }}
    />
  )
}
