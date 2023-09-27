import React, { useContext } from 'react'
import { AuthContext } from '../../index'
import { checkPermission } from './helper'

interface AuthorizeProps {
  children: React.ReactNode
}

/**
 * 需要登录后才显示子节点
 * @param props
 * @returns
 */
export const Authorize: React.FC<AuthorizeProps> = (props: AuthorizeProps) => {
  const { currentUser } = useContext(AuthContext)
  if (currentUser) {
    return <>{props.children}</>
  }
  return null
}

/**
 * 高阶组件,登录后才渲染
 * @param C
 * @returns
 */
export function withAuthorize<Props extends JSX.IntrinsicAttributes>(C: React.FC<Props>): React.FC<Props> {
  return (props: Props) => {
    return (
      <Authorize>
        <C {...props}></C>
      </Authorize>
    )
  }
}

interface PermissionProps {
  children: React.ReactNode
  permissionPath: string
}

/**
 * 需要拥有指定权限才渲染子节点
 * @param props
 * @returns
 */
export const Permission: React.FC<PermissionProps> = props => {
  const { currentUser } = useContext(AuthContext)
  if (currentUser && checkPermission(currentUser.permissionTree, props.permissionPath)) {
    return <>{props.children}</>
  }
  return null
}

/**
 * 高阶组件,有指定权限才渲染
 * @param C
 * @returns
 */
export function withPermission<Props extends JSX.IntrinsicAttributes>(
  C: React.FC<Props>,
  permissionPath: string
): React.FC<Props> {
  return (props: Props) => {
    return (
      <Permission permissionPath={permissionPath}>
        <C {...props}></C>
      </Permission>
    )
  }
}
