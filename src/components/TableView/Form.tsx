import { BetaSchemaForm, ProFormInstance } from '@ant-design/pro-form'
import { message } from 'antd'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { TableViewColumn } from './index'
import { TableFormProps, TableFormType, TableViewProps } from './typing'

const CreateForm: React.FC<TableFormProps> = (props: TableFormProps) => {
  const columns = useMemo(() => {
    return props.columns
      .filter(column => !!column.columnSchema && !column.columnSchema.generated && column.columnSchema.editable)
      .map(column => {
        if (column.dataFormItemProps) {
          return { ...column, formItemProps: column.dataFormItemProps }
        }
        return column
      })
  }, [props.columns])

  const formRef = useRef<ProFormInstance>()

  const handleFinish = useCallback(
    async (values: any) => {
      // 进入数据转换
      columns.forEach(column => {
        if (column.convertFromForm) {
          const key = column.columnSchema!.name
          values[key] = column.convertFromForm(values[key])
        }
      })
      try {
        await props.dataProvider.create(values)
        props.onSuccessComplete()
        formRef.current?.resetFields()
        return true
      } catch (e) {
        message.error(e + '', 2000)
        return false
      }
    },
    [props.dataProvider]
  )

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        props.onClose()
      }
    },
    [props.onClose]
  )

  return (
    <BetaSchemaForm
      columns={columns}
      formRef={formRef}
      layoutType="DrawerForm"
      shouldUpdate={false}
      visible={props.visible}
      title="新建"
      autoFocusFirstInput
      onFinish={handleFinish}
      onOpenChange={handleOpenChange}
    ></BetaSchemaForm>
  )
}

const EditForm = (props: TableFormProps) => {
  const formRef = useRef<ProFormInstance>()

  const columns = useMemo<TableViewColumn[]>(() => {
    return props.columns
      .filter(
        column =>
          !!column.columnSchema &&
          !column.columnSchema.generated &&
          !column.columnSchema.primaryKey &&
          column.columnSchema.editable
      )
      .map(column => {
        if (column.dataFormItemProps) {
          return { ...column, formItemProps: column.dataFormItemProps }
        }
        return column
      })
  }, [props.columns])

  useEffect(() => {
    if (props.currentRow && formRef.current) {
      // 重置所有
      formRef.current.resetFields()
      const row = { ...props.currentRow }
      // 进入数据转换
      columns.forEach(column => {
        if (column.convertToForm) {
          const key = column.columnSchema!.name
          row[key] = column.convertToForm(row[key])
        }
      })
      formRef.current.setFieldsValue(row)
    }
  }, [props.currentRow])

  const handleFinish = useCallback(
    async (values: any) => {
      try {
        // 进入数据转换
        columns.forEach(column => {
          if (column.convertFromForm) {
            const key = column.columnSchema!.name
            values[key] = column.convertFromForm(values[key])
          }
        })
        await props.dataProvider.update({ ...props.currentRow, ...values })
        props.onSuccessComplete()
        return true
      } catch (e) {
        message.error(e + '', 2000)
        return false
      }
    },
    [props.dataProvider, props.currentRow]
  )

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        props.onClose()
      }
    },
    [props.onClose]
  )

  return (
    <BetaSchemaForm
      columns={columns}
      formRef={formRef}
      layoutType="DrawerForm"
      shouldUpdate={false}
      open={props.visible}
      title="编辑"
      autoFocusFirstInput
      onOpenChange={handleOpenChange}
      onFinish={handleFinish}
    ></BetaSchemaForm>
  )
}

export const FormCreator = React.memo((props: TableFormProps & { creatorFun: TableViewProps['formCreator'] }) => {
  if (props.creatorFun) {
    const node = props.creatorFun(props)
    if (node) {
      return <>{node}</>
    }
  }
  if (props.formType === TableFormType.EDIT) {
    return <EditForm {...props} />
  } else {
    return <CreateForm {...props} />
  }
})
