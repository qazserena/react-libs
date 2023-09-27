import React, { useCallback, useMemo } from 'react'
import { Tree, TreeDataNode } from 'antd'
import { PermissionData, PermissionTree } from '../../api/permission'

/**
 * 依赖信息
 */
type DependencyDict = { [key: string]: string[] }

/**
 * 互斥的组
 */
type MutexGroup = string[]

export interface PermissionEditorProps {
  value?: PermissionTree
  onChange?: (value: PermissionTree) => void
  treeData?: PermissionData
  defaultExpandAll?: boolean
  mutexes?: MutexGroup[]
  /**
   * 依赖的组
   */
  dependencies?: DependencyDict
}

interface PermissionTreeDataNode extends TreeDataNode {
  key: string
  permissionData: PermissionData
}

function initTree(index: number, keys: string[], tree: PermissionTree, isLeaf: boolean) {
  if (index >= keys.length) {
    return
  }
  const key = keys[index]

  let child = tree.children[key]
  const wildcard = index + 1 === keys.length && !isLeaf
  if (!child) {
    child = { code: key, wildcard, children: {} }
    tree.children[key] = child
  } else {
    if (wildcard) {
      child.wildcard = true
      child.children = {}
    }
  }
  if (child.wildcard) {
    return
  }
  initTree(++index, keys, child, isLeaf)
}

function buildPermissionTree(checkedNodes: PermissionTreeDataNode[]): PermissionTree {
  const tree: PermissionTree = { code: '', wildcard: false, children: {} }

  for (const node of checkedNodes) {
    const isLeaf = node.isLeaf!
    const keys = node.key.split('|')
    initTree(0, keys, tree, isLeaf)
  }

  return tree
}

function permission2node(
  data: PermissionData,
  prefix: string,
  checkedKeys: string[],
  dependencies?: DependencyDict
): PermissionTreeDataNode {
  const key = prefix ? prefix + '|' + data.code : data.code
  const title = data.name || data.code
  const childrenKey = Object.keys(data.children)

  let disabled = false
  if (dependencies) {
    const requireKeys = dependencies[key]
    if (requireKeys && requireKeys.findIndex(k => !checkedKeys.includes(k)) >= 0) {
      disabled = true
    }
  }

  return {
    key,
    title,
    isLeaf: childrenKey.length === 0,
    permissionData: data,
    disabled,
    children: childrenKey
      .sort()
      .map(childrenKey => permission2node(data.children[childrenKey], key, checkedKeys, dependencies)),
  }
}

function permission2keys(permissionTree: PermissionTree, permissionData: PermissionData, prefix: string): string[] {
  const list: string[] = []
  if (permissionTree.code) {
    prefix = prefix ? prefix + '|' + permissionTree.code : permissionTree.code
    if (permissionTree.wildcard) {
      list.push(prefix)
      return list
    }
  } else {
    if (permissionTree.wildcard) {
      list.push(...Object.keys(permissionData.children))
      return list
    }
  }
  let count = 0
  if (permissionTree.children) {
    for (const key in permissionTree.children) {
      ++count
      const child = permissionTree.children[key]
      list.push(...permission2keys(child, permissionData && permissionData.children[key], prefix))
    }
  }
  if (count === 0 && prefix) {
    list.push(prefix)
  }
  return list
}

/**
 * 权限编辑组件
 * @param props
 * @returns
 */
const PermissionEditor = (props: PermissionEditorProps) => {
  const checkedKeys = useMemo<string[]>(() => {
    if (!props.value || !props.treeData) {
      return []
    }
    return permission2keys(props.value, props.treeData, '')
  }, [props.value, props.treeData])

  const nodes = useMemo<PermissionTreeDataNode[]>(() => {
    if (!props.treeData) {
      return []
    }
    const items: PermissionTreeDataNode[] = []
    if (props.treeData.code) {
      items.push(permission2node(props.treeData, '', checkedKeys, props.dependencies))
    } else {
      Object.keys(props.treeData.children)
        .sort()
        .forEach(key => {
          items.push(permission2node(props.treeData!.children[key], '', checkedKeys, props.dependencies))
        })
    }
    return items
  }, [props.treeData, checkedKeys, props.dependencies])

  const handleCheck = useCallback(
    (
      _checkedKeys: string[],
      e: { checked: boolean; node: PermissionTreeDataNode; checkedNodes: PermissionTreeDataNode[] }
    ) => {
      let checkedNodes = e.checkedNodes
      if (e.checked && checkedNodes.length > 0 && props.mutexes) {
        // 排除互斥
        const newCheckedNode = e.node
        if (newCheckedNode.isLeaf) {
          for (const mutex of props.mutexes) {
            if (mutex.includes(newCheckedNode.key)) {
              checkedNodes = checkedNodes.filter(node => node.key === newCheckedNode.key || !mutex.includes(node.key))
            }
          }
        } else {
          // TODO
          console.log('fix.e')
        }
      }
      // 检查依赖
      if (!e.checked && props.dependencies) {
        // 找出依赖此节点的的
        checkedNodes = checkedNodes.filter(node => {
          const requireKeys = props.dependencies![node.key]
          if (!requireKeys) {
            return true
          }
          return !requireKeys.includes(e.node.key)
        })
      }

      // 构建权限树
      const permissionTree = buildPermissionTree(checkedNodes)
      props.onChange && props.onChange(permissionTree)
    },
    [props.treeData, props.mutexes, props.dependencies]
  )

  if (!props.treeData) {
    return <></>
  }

  return (
    <Tree<PermissionTreeDataNode>
      treeData={nodes}
      defaultExpandAll={props.defaultExpandAll}
      checkedKeys={checkedKeys}
      checkable={true}
      selectable={false}
      showIcon={false}
      showLine={true}
      onCheck={handleCheck as any}
    ></Tree>
  )
}

export { PermissionEditor }
