import { ProFormItemProps } from '@ant-design/pro-form'
import { ProColumns, ProTableProps } from '@ant-design/pro-table'
import React from 'react'
import { TableDataProvider, TableSchema, TableColumn, ConditionBuilder, ConditionItem } from '../../api/table'

export enum TableFormType {
  /**
   * 创建
   */
  CREATE,
  /**
   * 编辑
   */
  EDIT,
}

export interface TableFormProps {
  /**
   * 表单类型
   */
  formType: TableFormType
  /**
   * 是否可见
   */
  visible: boolean
  /**
   * 数据接口
   */
  dataProvider: TableDataProvider
  /**
   * 数据列
   */
  columns: TableViewColumn[]
  /**
   * 当前数据行
   */
  currentRow?: Record<string, any>
  /**
   * 成功回调
   */
  onSuccessComplete: () => void
  /**
   * 关闭时
   */
  onClose: () => void
}

export interface TableViewAction {
  /**
   * 重新加载数据表
   */
  reload: () => Promise<void>

  /**
   * 打开表单窗口
   */
  openTableForm: (type: TableFormType, editRow?: Record<string, any>) => void
}

export type TableViewColumn = ProColumns & {
  /**
   * 数据表单(创建或修改)的属性
   */
  dataFormItemProps?: ProFormItemProps

  convertToForm?: (value: any) => any

  convertFromForm?: (value: any) => any

  /**
   * 列的配置信息
   */
  columnSchema?: TableColumn
  /**
   * 条件构建函数
   */
  conditionBuilder?: (values: any) => ConditionItem | undefined

  /**
   * 显示顺序
   * 小值排在前面
   * 服务器返回的列排序值以 0, 10, 20, 30, 40 ...的规律排列
   * 客户端可以选择中间值以控制插入想要的位置
   */
  sequence?: number
}

export type TableViewColumnDict = Record<string, TableViewColumn>

export interface TableViewProps {
  /**
   * 数据提供器
   */
  dataProvider: TableDataProvider

  /**
   * 工具栏自定义的actions
   */
  toolbarActions?: React.ReactNode

  /**
   * 加载完成后schema预处理器
   * 可在此修改定制schema
   */
  schemaPostProcesser?: (schema: TableSchema) => TableSchema

  /**
   * 列数据预处理函数
   */
  columnPostProcessor?: (columns: TableViewColumn[]) => TableViewColumn[]

  /**
   * 客户端列定义
   * 用于覆盖服务器配置
   */
  columns?: Record<string, TableViewColumn>

  /**
   * 数据行选项render
   */
  rowOptionRender?: (record: { [key: string]: any }) => React.ReactNode[]

  /**
   * 额外的查询条件
   */
  extraCondition?: ConditionBuilder

  /**
   * 操作接口引用
   */
  actionRef?: React.Ref<TableViewAction | undefined>

  /**
   * 用于ProTable的属性
   */
  proTableProps?: Partial<ProTableProps<any, any>>

  /**
   * 自定义表单构建器
   * 如果返回空则会使用默认表单
   */
  formCreator?: (formProps: TableFormProps) => React.ReactNode | undefined
}
