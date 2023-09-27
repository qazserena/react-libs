import { ConditionBuilder, Sort } from '../api';
export interface Page<Resource> {
    content: Resource[];
    totalElements: number;
}
/**
 * 遵守RESTfull约定规范的资源接口
 */
export declare class RESTfulApi<Resource> {
    protected resourceEndPoint: string;
    protected key: keyof Resource;
    constructor(resourceEndPoint: string, key: keyof Resource);
    /**
     * 获取所有数据
     * @returns
     */
    list(conditionBuilder?: ConditionBuilder, sort?: Sort[]): Promise<Resource[]>;
    /**
     * 获取分页数据
     * @param page
     * @param size
     * @returns
     */
    page(page: number, size: number, conditionBuilder?: ConditionBuilder, sort?: Sort[]): Promise<Page<Resource>>;
    /**
     * 创建一个新资源
     * @param resource
     */
    create(resource: Partial<Resource>): Promise<void>;
    /**
     * 更新一个资源
     * @param resource
     */
    update(resource: Partial<Resource>): Promise<void>;
    /**
     * 删除一个资源
     * @param key
     */
    delete(key: string | number): Promise<void>;
}
