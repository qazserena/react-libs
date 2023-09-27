import React, { useState } from 'react'
import { PermissionData, PermissionEditor, PermissionTree } from '@brilljoy/react-libs'

function createServers(n: number): Record<string, PermissionData> {
  const servers: Record<string, PermissionData> = {}
  for (let i = 0; i < n; ++i) {
    servers['s-' + i] = {
      code: 's-' + i,
      name: 'Server' + i,
      children: {},
    }
  }
  return servers
}

export const RegionAndServerEditor = () => {
  const [permissionTree, setPermissionTree] = useState<PermissionTree>()

  const treeData: PermissionData = {
    code: 'region',
    name: '区域',
    children: {
      cn: {
        code: 'cn',
        name: '中国',
        children: createServers(10),
      },
      na: {
        code: 'na',
        name: '北美',
        children: createServers(10),
      },
      ru: {
        code: 'ru',
        name: '俄文',
        children: createServers(10),
      },
      de: {
        code: 'de',
        name: '德语',
        children: createServers(10),
      },
    },
  }

  const handleChange = (permissionTree: PermissionTree) => {
    setPermissionTree(permissionTree)
    console.log(permissionTree)
  }

  return (
    <PermissionEditor
      defaultExpandAll
      mutexes={[
        ['region|cn|s-1', 'region|cn|s-2', 'region|cn|s-3'],
        ['region|cn|s-5', 'region|cn|s-6', 'region|cn|s-7'],
      ]}
      dependencies={{ 'region|de|s-7': ['region|cn|s-7', 'region|na|s-7'] }}
      value={permissionTree}
      treeData={treeData}
      onChange={handleChange}
    ></PermissionEditor>
  )
}
