import React from 'react'
import ProForm, { ProFormUploadButton } from '@ant-design/pro-form'
import {
  getApiToken,
  TableApi,
  TableView,
  TableViewAction,
  TableViewColumnDict,
  Upload,
} from '@brilljoy/react-libs'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export const Drama = () => {
  const dataProvider = new TableApi(
    'http://127.0.0.1:8002/admin/table',
    // "https://api.szgbtek.com/admin/table",
    'drama'
  )

  const actionRef = React.useRef<TableViewAction>()

  const handleLock = (record: any) => {
    console.log(record)
    actionRef.current?.reload()
  }

  const rowOptionRender = (record: any) => [
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      key="lock"
      onClick={() => {
        handleLock(record)
      }}
    >
      锁定
    </a>,
  ]

  const columns: TableViewColumnDict = {
    icon: {
      dataFormItemProps: { rules: [{ required: true }] },
      width: 'md',
      renderFormItem: () => {
        return (
          <Upload
            name="icon"
            maxCount={1}
            listType="picture"
            accept=".png,.jpg,.jpeg"
            headers={{ 'x-api-token': getApiToken()! }}
            action="http://127.0.0.1:8002/business/file/upload?purpose=drama-icon"
          />
        )
      },
    },
    name: { width: 'md', dataFormItemProps: { required: true } },
    num: { valueType: 'digit', dataFormItemProps: { required: true } },
    femaleNum: { valueType: 'digit', width: 'xs' },
    maleNum: { valueType: 'digit', width: 'xs' },
    duration: {
      valueType: 'digit',
      width: 'xs',
      fieldProps: { rules: [{ required: true }] },
    },
    albums: {
      convertToForm: (value: string) => {
        return JSON.parse(value)
      },
      convertFromForm: (value: string[]) => {
        return JSON.stringify(value)
      },
      renderFormItem: () => {
        return (
          <Upload
            name="icon"
            maxCount={5}
            listType="picture-card"
            accept=".png,.jpg,.jpeg"
            headers={{ 'x-api-token': getApiToken()! }}
            action="http://127.0.0.1:8002/business/file/upload?purpose=drama-icon"
          />
        )
      },
    },
  }

  return (
    <TableView
      actionRef={actionRef}
      dataProvider={dataProvider}
      rowOptionRender={rowOptionRender}
      columns={columns}
    ></TableView>
  )
}
