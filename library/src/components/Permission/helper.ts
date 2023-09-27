import { PermissionTree } from '../..'

function check(permissionTree: PermissionTree, index: number, path: string[]): boolean {
  if (!permissionTree) {
    return false
  }

  if (index >= path.length) {
    return true
  }

  if (permissionTree.wildcard) {
    return true
  }

  const code = path[index]
  if (permissionTree.code !== code) {
    return false
  }

  index++

  if (index >= path.length) {
    return true
  }

  const nextCode = path[index]
  return check(permissionTree.children[nextCode], index, path)
}

/**
 * 检查是否有权限
 * @param permissionTree
 * @param path
 * @returns
 */
export function checkPermission(permissionTree: PermissionTree, path: string | string[]): boolean {
  if (typeof path === 'string') {
    path = path.split('/')
  }
  if (path.length === 0) {
    return false
  }
  if (!permissionTree.code) {
    if (permissionTree.wildcard) {
      return true
    }
    const segment = path[0]
    const children = permissionTree.children[segment]
    return check(children, 0, path)
  } else {
    return check(permissionTree, 0, path)
  }
}
