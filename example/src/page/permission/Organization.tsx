import React, { useState } from 'react'
import {
  PermissionData,
  PermissionEditor,
  PermissionTree,
} from '@brilljoy/react-libs'

function createDepartment(n: number): Record<string, PermissionData> {
  const servers: Record<string, PermissionData> = {}
  for (let i = 0; i < n; ++i) {
    servers['d-' + i] = {
      code: 'd-' + i,
      name: '院系' + i,
      children: {},
    }
  }
  return servers
}

export const OrganizationEditor = () => {
  const [permissionTree, setPermissionTree] = useState<PermissionTree>()

  const treeData: PermissionData = {
    code: 'schools',
    name: '学校',
    children: {
      szu: {
        code: 'szu',
        name: '深圳大学',
        children: createDepartment(8),
      },
      whu: {
        code: 'whu',
        name: '武汉大学',
        children: createDepartment(7),
      },
      xu: {
        code: 'xu',
        name: '厦门大学',
        children: createDepartment(10),
      },
      cju: {
        code: 'cju',
        name: '长江大学',
        children: createDepartment(5),
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
      value={permissionTree}
      treeData={treeData}
      onChange={handleChange}
    ></PermissionEditor>
  )
}
