import request from 'umi-request'
import { PermissionTree } from './permission'
import { ApiSetting } from './setting'

export const authApi = new ApiSetting('__brilljoy_react_libs_api_auth', {
  loginWithToken: '/login-with-token',
  loginWithAccount: '/login',
  logout: '/logout',
})

/**
 * 用户信息
 */
export interface User {
  uid: number
  username: string
  roles: string[]
  token: string
  tokenExpiredTick: number
  permissionTree: PermissionTree
}

/**
 * 使用token登录
 * @param api
 * @returns
 */
export async function loginWithToken() {
  const user = await request<User>(authApi.data.loginWithToken, {
    method: 'POST',
  })
  return user
}

/**
 * 使用帐号密码登录
 * @param username
 * @param password
 * @param api
 * @returns
 */
export async function loginWithAccount(username: string, password: string) {
  const user = await request<User>(authApi.data.loginWithAccount, {
    method: 'POST',
    params: { username, password },
  })
  return user
}

/**
 * 登出
 * @param api
 */
export async function logout() {
  await request(authApi.data.logout, { method: 'POST' })
}
