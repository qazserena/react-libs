import { message } from 'antd'
import request from 'umi-request'

/**
 * 业务逻辑错误
 */
export class BusinessError {
  code: number

  message: string

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }

  toString() {
    return this.message
  }
}

/**
 * 网络请求错误
 */
export class HttpError {
  status: number

  body: string

  constructor(status: number, body: string) {
    this.status = status
    this.body = body
  }

  toString() {
    return `http error [${this.status}]`
  }
}

request.interceptors.response.use(async response => {
  if (response.status !== 200) {
    let result: any = null
    const body = await response.text()
    try {
      result = JSON.parse(body)
    } catch {
      throw new HttpError(response.status, body)
    }
    throw new BusinessError(result.code, result.message)
  }
  return response
})

export function defaultExceptionHandler(e: any) {
  if (e instanceof BusinessError) {
    message.error(e.message)
  } else if (e instanceof HttpError) {
    message.error(e.body)
  } else {
    message.error(e + '')
  }
}
export function createExceptionHandler(handlers: {
  business?: (e: BusinessError) => void
  http?: (e: HttpError) => void
}) {
  return function (e: any) {
    if (e instanceof BusinessError && handlers.business) {
      handlers.business(e)
      return
    }
    if (e instanceof HttpError && handlers.http) {
      handlers.http(e)
      return
    }
    defaultExceptionHandler(e)
  }
}
