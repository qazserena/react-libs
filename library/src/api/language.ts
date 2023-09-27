import request from 'umi-request'
import { metaApi } from './meta'
import { RESTfulApi } from '../utils'

export interface LanguageItem {
  langKey: string
  [lang: string]: string
}

export class LanguageApi extends RESTfulApi<LanguageItem> {
  constructor() {
    super(metaApi.data.languageRest, 'langKey')
  }

  async query(lang: string): Promise<LanguageItem[]> {
    return await request<LanguageItem[]>(this.resourceEndPoint + '/query', {
      method: 'GET',
      params: { lang },
    })
  }

  async getSupporedLanguages(): Promise<string[]> {
    return await request<string[]>(this.resourceEndPoint + '/languages', {
      method: 'GET',
    })
  }
}
