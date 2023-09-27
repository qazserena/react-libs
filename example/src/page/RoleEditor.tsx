import { useState, useEffect } from 'react'
import {
  defaultExceptionHandler,
  loadPermissionData,
  PermissionData,
  PermissionEditor,
  PermissionEditorProps,
  TableApi,
  TableView,
  TableViewColumnDict,
  useMounted,
} from '@brilljoy/react-libs'

const DefaultPermissionEditor = (props: PermissionEditorProps) => {
  const mounted = useMounted()

  const [permissionData, setPermissionData] = useState<PermissionData>()
  //   const [permissionTree, setPermissionTree] = useState<PermissionTree>()

  useEffect(() => {
    loadPermissionData()
      .then(data => {
        if (!mounted.current) {
          return
        }
        setPermissionData(data)
        // setPermissionTree({ code: '', wildcard: true, children: {} })
      })
      .catch(defaultExceptionHandler)
  }, [setPermissionData, mounted])

  //   const handleChange = (permissionTree: PermissionTree) => {
  //     console.log(permissionTree)
  //     setPermissionTree(permissionTree)
  //   }

  console.log(props.value)

  return (
    <PermissionEditor
      defaultExpandAll
      value={props.value}
      treeData={permissionData}
      onChange={props.onChange}
    ></PermissionEditor>
  )
}

interface RoleEditorProps {
  serviceEndpoint?: string
}

export const RoleEditor: React.FC<RoleEditorProps> = props => {
  const dataProvider = new TableApi(props.serviceEndpoint || '/auth-center/table', 'role')

  const columns: TableViewColumnDict = {
    permissionTree: {
      title: '权限',
      hideInTable: true,
      renderFormItem: () => {
        return <DefaultPermissionEditor />
      },
    },
  }

  return (
    <div>
      <TableView dataProvider={dataProvider} columns={columns} />
    </div>
  )
}
