import React, { useEffect, useRef } from 'react'
import {
  TableView,
  TableApi,
  ConditionBuilder,
  TableViewColumn,
  TableViewAction,
  Condition,
  TableViewColumnDict,
  TableFormType,
  TableFormProps,
} from '@brilljoy/react-libs'
import { Button } from 'antd'
import { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-form'

export const UserForm = (props: TableFormProps) => {
  const formRef = useRef<ProFormInstance>()

  const handleFinish = async (values: any) => {
    const row = { ...props.currentRow, ...values }
    await props.dataProvider.update(row)
    props.onSuccessComplete()
  }

  useEffect(() => {
    if (props.currentRow) {
      formRef.current?.setFieldsValue(props.currentRow)
    }
  }, [props.currentRow])

  return (
    <ModalForm
      formRef={formRef}
      visible={props.visible}
      title={props.formType === TableFormType.CREATE ? '新建' : '编辑'}
      onVisibleChange={visible => {
        if (!visible) {
          props.onClose()
        }
      }}
      onFinish={handleFinish}
    >
      <ProFormText name="username" label="用户名"></ProFormText>
      <ProFormText name="phoneNumber" label="手机号"></ProFormText>
    </ModalForm>
  )
}

export const UserTest: React.FC = () => {
  const dataProvider = new TableApi('/auth-center/table', 'user')

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

  const columnPostProcessor = (columns: TableViewColumn[]) => {
    columns.push({
      dataIndex: 'registerTimeRange',
      key: 'registerTimeRange',
      title: '注册时间',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => ({ start: value[0], end: value[1] }),
      },
      conditionBuilder: values => {
        if (!values.start || !values.end) {
          return undefined
        }
        // const start = Math.round(new Date(values.start).getTime() / 1000)
        // const end = Math.round(new Date(values.start).getTime() / 1000)
        return Condition.between('registerTime', [values.start, values.end])
      },
    })
    return columns
  }

  const columns: TableViewColumnDict = {
    roles: {
      fieldProps: { mode: 'multiple' },
    },
    password: {
      sequence: 11,
      title: '密码',
      hideInTable: true,
      dataIndex: 'password',
      valueType: 'password',
      columnSchema: { name: 'password', editable: true, label: '密码' },
    },
  }

  const extraCondition = new ConditionBuilder()

  return (
    <TableView
      actionRef={actionRef}
      dataProvider={dataProvider}
      extraCondition={extraCondition}
      formCreator={formProps => {
        return <UserForm {...formProps} />
      }}
      toolbarActions={[
        <Button
          key="key-1"
          onClick={() => {
            actionRef.current?.openTableForm(TableFormType.CREATE)
          }}
        >
          自定义打开
        </Button>,
      ]}
      rowOptionRender={rowOptionRender}
      columnPostProcessor={columnPostProcessor}
      columns={columns}
      proTableProps={{ pagination: { showSizeChanger: true } }}
    ></TableView>
  )
}
