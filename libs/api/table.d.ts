export interface TableJob {
    jobId: number;
    finish: boolean;
    userdata: string;
    progress: number;
}
export interface TableDataProvider {
    loadSchema: () => Promise<TableSchema>;
    loadPage: (page: number, size: number, condition?: string, sort?: Sort[]) => Promise<PageData>;
    create(row: Record<string, any>): Promise<Record<string, any>>;
    update(row: Record<string, any>): Promise<Record<string, any>>;
    delete(primaryKey: string): Promise<void>;
    export(condition?: string, timezone?: string): Promise<number>;
    getJobs(): Promise<TableJob[]>;
    getJob(jobId: number): Promise<TableJob>;
}
declare class TableAddressRegister {
    private _address;
    register(table: string, address: string): void;
    query(table: string): string;
}
export declare const tableAddressRegister: TableAddressRegister;
/**
 * 数据表列
 */
export interface TableColumn {
    name: string;
    primaryKey?: boolean;
    hidden?: boolean;
    generated?: boolean;
    editable?: boolean;
    label?: string;
    sortable?: boolean;
    defaultSortOrder?: 'ascend' | 'descend';
    queryable?: boolean;
    fuzzyQuery?: boolean;
    valueType?: string;
    defaultValue?: boolean;
    json?: boolean;
    meta?: {
        foreignField: {
            table: string;
            valueField: string;
            labelField?: string;
        };
        enum: {
            name: string;
            type: 'integer' | 'string';
        };
        timestamp: {
            unit: 'second' | 'millisecond';
            precision: 'date' | 'datetime';
        };
    };
}
/**
 * 数据表模式
 */
export interface TableSchema {
    /**
     * 表名
     */
    tableName: string;
    /**
     * 表名label
     */
    label: string;
    /**
     * 版本
     */
    version: string;
    /**
     * 选项
     */
    behaviour?: {
        update: boolean;
        delete: boolean;
        create: boolean;
    };
    /**
     * 数据列
     */
    columns: TableColumn[];
}
export declare enum ConditionOperator {
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
    BETWEEN = 12
}
export interface ConditionItem {
    operator: ConditionOperator;
    name: string;
    value: any;
}
export declare class Condition implements ConditionItem {
    operator: ConditionOperator;
    name: string;
    value: any;
    constructor(operator: ConditionOperator, name: string, value: any);
    static equal(name: string, value: any): Condition;
    static notEqual(name: string, value: any): Condition;
    static greater(name: string, value: any): Condition;
    static greaterEqual(name: string, value: any): Condition;
    static less(name: string, value: any): Condition;
    static lessEqual(name: string, value: any): Condition;
    static in(name: string, value: any[]): Condition;
    static notIn(name: string, value: any[]): Condition;
    static startWith(name: string, value: any): Condition;
    static endWith(name: string, value: any): Condition;
    static like(name: string, value: any): Condition;
    static between(name: string, value: any[]): Condition;
}
type ConditionArrayItem = ConditionItem | ConditionItem[] | string | ConditionArrayItem[];
/**
 * 条件构建器
 */
export declare class ConditionBuilder {
    private data;
    get empty(): boolean;
    equal(name: string, value: any): this;
    notEqual(name: string, value: any): this;
    greater(name: string, value: any): this;
    greaterEqual(name: string, value: any): this;
    less(name: string, value: any): this;
    lessEqual(name: string, value: any): this;
    in(name: string, value: any[]): this;
    notIn(name: string, value: any[]): this;
    startWith(name: string, value: any): this;
    endWith(name: string, value: any): this;
    like(name: string, value: any): this;
    between(name: string, value: any[]): this;
    and(): this;
    or(): this;
    group(builder: ConditionBuilder): this;
    all(items: ConditionItem[]): void;
    any(items: ConditionItem[]): void;
    condition(operator: ConditionOperator, name: string, value: any): this;
    private canAppendCondition;
    build(): ConditionArrayItem[];
    buildString(): string | undefined;
}
export interface PageData {
    content: any[];
    totalElements: number;
}
export interface Sort {
    name: string;
    direction: 'ascend' | 'descend';
}
export declare function buildSortParams(sort?: Sort[]): string[] | undefined;
declare class TableApi implements TableDataProvider {
    private _serviceEndpoint;
    private _table;
    private _version;
    private _schema;
    private _extraParams;
    constructor(serviceEndpoint: string, table: string, version?: string, extraParams?: Record<string, any>);
    loadSchema(): Promise<TableSchema>;
    query(fields: string[], condition?: string | ConditionBuilder, sort?: Sort[]): Promise<any[]>;
    /**
     * 加载分页数据
     * @param page 页码,0开始
     * @param size 单页数据量
     * @param condition 条件串,由ConditionBuilder构建
     * @param sort 排序方式
     * @returns
     */
    loadPage(page: number, size: number, condition?: string, sort?: Sort[]): Promise<PageData>;
    /**
     * 创建一条数据
     * @param row
     */
    create(row: Record<string, any>): Promise<Record<string, any>>;
    /**
     * 更新一条数据
     * @param row
     */
    update(row: Record<string, any>): Promise<Record<string, any>>;
    /**
     * 删除一条数据
     * @param primaryKey
     * @returns
     */
    delete(primaryKey: string): Promise<void>;
    /**
     * 导出
     * @returns
     */
    export(condition?: string, timezone?: string): Promise<number>;
    getJobs(): Promise<TableJob[]>;
    getJob(jobId: number): Promise<TableJob>;
}
export { TableApi };
