import request from 'umi-request'

export interface TableJob {
  jobId: number
  finish: boolean
  userdata: string
  progress: number
}

export interface TableDataProvider {
  loadSchema: () => Promise<TableSchema>
  loadPage: (page: number, size: number, condition?: string, sort?: Sort[]) => Promise<PageData>
  create(row: Record<string, any>): Promise<Record<string, any>>
  update(row: Record<string, any>): Promise<Record<string, any>>
  delete(primaryKey: string): Promise<void>
  export(condition?: string, timezone?: string): Promise<number>
  getJobs(): Promise<TableJob[]>
  getJob(jobId: number): Promise<TableJob>
}

class TableAddressRegister {
  private _address: Record<string, string> = {}

  register(table: string, address: string) {
    this._address[table] = address
  }

  query(table: string) {
    return this._address[table] || ''
  }
}

export const tableAddressRegister = new TableAddressRegister()

/**
 * 数据表列
 */
export interface TableColumn {
  name: string
  // 是否主键
  primaryKey?: boolean
  // 是否隐藏
  hidden?: boolean
  // 数据是否为自动生成
  generated?: boolean
  // 数据是否可编辑
  editable?: boolean
  // 标签
  label?: string
  // 是否可排序
  sortable?: boolean
  // 默认排序方式
  defaultSortOrder?: 'ascend' | 'descend'
  // 是否可查询
  queryable?: boolean
  // 是否可模糊查询
  fuzzyQuery?: boolean
  // 值类型
  valueType?: string
  // 默认值
  defaultValue?: boolean
  // 是否为json格式
  json?: boolean
  // 元数据信息
  meta?: {
    // 关联外部表字段
    foreignField: { table: string; valueField: string; labelField?: string }
    // 枚举信息
    enum: { name: string; type: 'integer' | 'string' }
    // 时间戳
    timestamp: {
      // 单位
      unit: 'second' | 'millisecond'
      // 精度
      precision: 'date' | 'datetime'
    }
  }
}

/**
 * 数据表模式
 */
export interface TableSchema {
  /**
   * 表名
   */
  tableName: string
  /**
   * 表名label
   */
  label: string
  /**
   * 版本
   */
  version: string
  /**
   * 选项
   */
  behaviour?: { update: boolean; delete: boolean; create: boolean }
  /**
   * 数据列
   */
  columns: TableColumn[]
}

export enum ConditionOperator {
  EQUAL = 1,
  NOT_EQUAL = 2,
  GREATER = 3,
  GREATER_EQUAL = 4,
  LESS = 5,
  LESS_EQUAL = 6,
  IN = 7,
  NOT_IN = 8,
  START_WITH = 9,
  END_WITH = 10,
  LIKE = 11,
  BETWEEN = 12,
}

export interface ConditionItem {
  operator: ConditionOperator
  name: string
  value: any
}

export class Condition implements ConditionItem {
  public operator: ConditionOperator
  public name: string
  public value: any

  constructor(operator: ConditionOperator, name: string, value: any) {
    this.operator = operator
    this.name = name
    this.value = value
  }

  static equal(name: string, value: any): Condition {
    return new Condition(ConditionOperator.EQUAL, name, value)
  }

  static notEqual(name: string, value: any) {
    return new Condition(ConditionOperator.NOT_EQUAL, name, value)
  }

  static greater(name: string, value: any) {
    return new Condition(ConditionOperator.GREATER, name, value)
  }

  static greaterEqual(name: string, value: any) {
    return new Condition(ConditionOperator.GREATER_EQUAL, name, value)
  }

  static less(name: string, value: any) {
    return new Condition(ConditionOperator.LESS, name, value)
  }

  static lessEqual(name: string, value: any) {
    return new Condition(ConditionOperator.LESS_EQUAL, name, value)
  }

  static in(name: string, value: any[]) {
    return new Condition(ConditionOperator.IN, name, value)
  }

  static notIn(name: string, value: any[]) {
    return new Condition(ConditionOperator.NOT_IN, name, value)
  }

  static startWith(name: string, value: any) {
    return new Condition(ConditionOperator.START_WITH, name, value)
  }

  static endWith(name: string, value: any) {
    return new Condition(ConditionOperator.END_WITH, name, value)
  }

  static like(name: string, value: any) {
    return new Condition(ConditionOperator.LIKE, name, value)
  }

  static between(name: string, value: any[]) {
    return new Condition(ConditionOperator.BETWEEN, name, value)
  }
}

type ConditionArrayItem = ConditionItem | ConditionItem[] | string | ConditionArrayItem[]

/**
 * 条件构建器
 */
export class ConditionBuilder {
  private data: ConditionArrayItem[] = []

  get empty() {
    return this.data.length === 0
  }

  equal(name: string, value: any) {
    return this.condition(ConditionOperator.EQUAL, name, value)
  }

  notEqual(name: string, value: any) {
    return this.condition(ConditionOperator.NOT_EQUAL, name, value)
  }

  greater(name: string, value: any) {
    return this.condition(ConditionOperator.GREATER, name, value)
  }

  greaterEqual(name: string, value: any) {
    return this.condition(ConditionOperator.GREATER_EQUAL, name, value)
  }

  less(name: string, value: any) {
    return this.condition(ConditionOperator.LESS, name, value)
  }

  lessEqual(name: string, value: any) {
    return this.condition(ConditionOperator.LESS_EQUAL, name, value)
  }

  in(name: string, value: any[]) {
    return this.condition(ConditionOperator.IN, name, value)
  }

  notIn(name: string, value: any[]) {
    return this.condition(ConditionOperator.NOT_IN, name, value)
  }

  startWith(name: string, value: any) {
    return this.condition(ConditionOperator.START_WITH, name, value)
  }

  endWith(name: string, value: any) {
    return this.condition(ConditionOperator.END_WITH, name, value)
  }

  like(name: string, value: any) {
    return this.condition(ConditionOperator.LIKE, name, value)
  }

  between(name: string, value: any[]) {
    return this.condition(ConditionOperator.BETWEEN, name, value)
  }

  and() {
    if (this.canAppendCondition()) {
      throw new Error('bad logic operator')
    }
    this.data.push('and')
    return this
  }

  or() {
    if (this.canAppendCondition()) {
      throw new Error('bad logic operator')
    }
    this.data.push('or')
    return this
  }

  group(builder: ConditionBuilder) {
    if (!this.canAppendCondition()) {
      throw new Error('cat not append group')
    }
    this.data.push(builder.build())
    return this
  }

  all(items: ConditionItem[]) {
    let first = true
    for (const item of items) {
      if (first) {
        first = false
      } else {
        this.and()
      }
      this.data.push(item)
    }
  }

  any(items: ConditionItem[]) {
    let first = true
    for (const item of items) {
      if (first) {
        first = false
      } else {
        this.or()
      }
      this.data.push(item)
    }
  }

  condition(operator: ConditionOperator, name: string, value: any) {
    if (!this.canAppendCondition()) {
      throw new Error('cat not append condition')
    }
    this.data.push({ operator, name, value })
    return this
  }

  private canAppendCondition() {
    if (this.data.length === 0) {
      return true
    }
    const last = this.data[this.data.length - 1]
    return typeof last === 'string'
  }

  build() {
    return this.data
  }

  buildString() {
    return this.data.length > 0 ? JSON.stringify(this.build()) : undefined
  }
}

export interface PageData {
  content: any[]
  totalElements: number
}

export interface Sort {
  name: string
  direction: 'ascend' | 'descend'
}

export function buildSortParams(sort?: Sort[]) {
  const sortParams = sort
    ? sort.map(item => {
        return item.name + ',' + (item.direction === 'ascend' ? 'asc' : 'desc')
      })
    : undefined
  return sortParams
}

class TableApi implements TableDataProvider {
  private _serviceEndpoint: string
  private _table: string
  private _version: string
  private _schema: TableSchema
  private _extraParams: Record<string, any>

  constructor(
    serviceEndpoint: string,
    table: string,
    version: string = '1.0.0',
    extraParams: Record<string, any> = {}
  ) {
    this._serviceEndpoint = serviceEndpoint
    this._table = table
    this._version = version
    this._extraParams = extraParams
  }

  async loadSchema(): Promise<TableSchema> {
    if (this._schema) {
      return this._schema
    }
    const response = await request<TableSchema>(this._serviceEndpoint + '/schema/' + this._table, {
      method: 'GET',
      params: { ...this._extraParams, version: this._version },
    })
    this._schema = response
    return this._schema
  }

  async query(fields: string[], condition?: string | ConditionBuilder, sort?: Sort[]): Promise<any[]> {
    if (condition instanceof ConditionBuilder) {
      condition = condition.buildString()
    }

    const url = this._serviceEndpoint + '/proxy/' + this._table + '/query'
    return await request<any[]>(url, {
      method: 'GET',
      params: {
        fields,
        condition,
        sort: buildSortParams(sort),
      },
    })
  }

  /**
   * 加载分页数据
   * @param page 页码,0开始
   * @param size 单页数据量
   * @param condition 条件串,由ConditionBuilder构建
   * @param sort 排序方式
   * @returns
   */
  async loadPage(page: number, size: number, condition?: string, sort?: Sort[]): Promise<PageData> {
    const url = this._serviceEndpoint + '/proxy/' + this._table

    const data = await request<PageData>(url, {
      method: 'GET',
      params: {
        ...this._extraParams,
        page,
        size,
        version: this._version,
        condition,
        sort: buildSortParams(sort),
      },
    })
    return data
  }

  /**
   * 创建一条数据
   * @param row
   */
  async create(row: Record<string, any>) {
    const url = this._serviceEndpoint + '/proxy/' + this._table
    const dbRow = await request<Record<string, any>>(url, {
      method: 'POST',
      params: {
        ...this._extraParams,
        version: this._version,
      },
      data: row,
    })
    return dbRow
  }

  /**
   * 更新一条数据
   * @param row
   */
  async update(row: Record<string, any>) {
    const url = this._serviceEndpoint + '/proxy/' + this._table
    const dbRow = await request<Record<string, any>>(url, {
      method: 'PUT',
      params: {
        ...this._extraParams,
        version: this._version,
      },
      data: row,
    })
    return dbRow
  }

  /**
   * 删除一条数据
   * @param primaryKey
   * @returns
   */
  async delete(primaryKey: string) {
    const url = this._serviceEndpoint + '/proxy/' + this._table
    await request(url, {
      method: 'DELETE',
      params: {
        ...this._extraParams,
        version: this._version,
        primaryKey,
      },
    })
  }

  /**
   * 导出
   * @returns
   */
  async export(condition?: string, timezone?: string): Promise<number> {
    const url = this._serviceEndpoint + '/proxy/' + this._table + '/export'
    return await request<number>(url, {
      method: 'POST',
      params: {
        ...this._extraParams,
        condition,
        timezone,
        version: this._version,
      },
    })
  }

  async getJobs(): Promise<TableJob[]> {
    const url = this._serviceEndpoint + '/job'
    return await request<TableJob[]>(url, {
      method: 'GET',
    })
  }

  async getJob(jobId: number): Promise<TableJob> {
    const url = this._serviceEndpoint + '/job/' + jobId
    return await request<TableJob>(url, {
      method: 'GET',
    })
  }
}

export { TableApi }
