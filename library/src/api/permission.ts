import request from 'umi-request'
import { ApiSetting } from './setting'

export const permissionApi = new ApiSetting(
  '__brilljoy_libs_api_permission',
  {
    loadPermissionData: '/permission/tree',
  }
)

export interface PermissionData {
  code: string
  name: string
  children: Record<string, PermissionData>
}

export interface PermissionTree {
  code: string
  wildcard: boolean
  children: Record<string, PermissionTree>
}

export async function loadPermissionData() {
  return await request<PermissionData>(permissionApi.data.loadPermissionData, {
    method: 'GET',
  })
}
