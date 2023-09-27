import React, { useEffect, useState } from 'react'
import {
  PermissionEditor,
  PermissionData,
  loadPermissionData,
  PermissionTree,
  defaultExceptionHandler,
} from '@brilljoy/react-libs'
import { Col, Row } from 'antd'
import { RegionAndServerEditor } from './permission/RegionAndServer'
import { OrganizationEditor } from './permission/Organization'

const PermissionTest = () => {
  const [permissionData, setPermissionData] = useState<PermissionData>()
  const [permissionTree, setPermissionTree] = useState<PermissionTree>()
  useEffect(() => {
    loadPermissionData()
      .then(data => {
        setPermissionData(data)
        setPermissionTree({ code: '', wildcard: true, children: {} })
      })
      .catch(defaultExceptionHandler)
  }, [])

  const handleChange = (permissionTree: PermissionTree) => {
    console.log(permissionTree)
    setPermissionTree(permissionTree)
  }

  return (
    <div>
      <Row>
        <Col span={6}>
          <PermissionEditor
            defaultExpandAll={true}
            treeData={permissionData}
            value={permissionTree}
            onChange={handleChange}
          />
        </Col>
        <Col span={6}>
          <RegionAndServerEditor />
        </Col>
        <Col span={6}>
          <OrganizationEditor />
        </Col>
      </Row>
    </div>
  )
}

export { PermissionTest }
