import { StorageItem } from './index'
import request from 'umi-request'

const cache = new StorageItem<string>('cache-api-token')

var tokenInMemory = cache.data

export function setApiToken(token: string, cacheIt: boolean = false) {
  tokenInMemory = token
  if (cacheIt) {
    cache.data = token
  }
}

export function getApiToken() {
  return tokenInMemory
}

var tokenExpireHandler: null | (() => void) = null

/**
 * 设置token过期的处理函数
 */
export function setTokenExpireHandler(handler: () => void) {
  tokenExpireHandler = handler
}

request.interceptors.request.use((url, options) => {
  if (tokenInMemory) {
    options.headers = {
      ...options.headers,
      'x-api-token': tokenInMemory,
    }
  }
  return { url, options }
})

request.interceptors.response.use(async response => {
  if (response.status === 403) {
    try {
      const result = await response.clone().json()
      if (result.code === 101) {
        // 令牌过期
        tokenExpireHandler && tokenExpireHandler()
      }
    } catch (e) {}
  }
  return response
})
