import request from 'umi-request'
import { buildSortParams, ConditionBuilder, Sort } from '../api'

export interface Page<Resource> {
  content: Resource[]
  totalElements: number
}

/**
 * 遵守RESTfull约定规范的资源接口
 */
export class RESTfulApi<Resource> {
  constructor(protected resourceEndPoint: string, protected key: keyof Resource) {}

  /**
   * 获取所有数据
   * @returns
   */
  async list(conditionBuilder?: ConditionBuilder, sort?: Sort[]): Promise<Resource[]> {
    return await request(this.resourceEndPoint, {
      method: 'GET',
      responseType: 'json',
      params: {
        condition: conditionBuilder ? conditionBuilder.buildString() : undefined,
        sort: buildSortParams(sort),
      },
    })
  }

  /**
   * 获取分页数据
   * @param page
   * @param size
   * @returns
   */
  async page(page: number, size: number, conditionBuilder?: ConditionBuilder, sort?: Sort[]): Promise<Page<Resource>> {
    return await request<Page<Resource>>(this.resourceEndPoint + '/page', {
      method: 'GET',
      responseType: 'json',
      params: {
        page,
        size,
        condition: conditionBuilder ? conditionBuilder.buildString() : undefined,
        sort: buildSortParams(sort),
      },
    })
  }

  /**
   * 创建一个新资源
   * @param resource
   */
  async create(resource: Partial<Resource>) {
    await request(this.resourceEndPoint, {
      method: 'POST',
      requestType: 'json',
      data: resource,
    })
  }

  /**
   * 更新一个资源
   * @param resource
   */
  async update(resource: Partial<Resource>) {
    await request(this.resourceEndPoint + '/' + encodeURIComponent(resource[this.key] + ''), {
      method: 'PUT',
      requestType: 'json',
      data: resource,
    })
  }

  /**
   * 删除一个资源
   * @param key
   */
  async delete(key: string | number) {
    await request(this.resourceEndPoint + '/' + encodeURIComponent(key), {
      method: 'DELETE',
    })
  }
}
