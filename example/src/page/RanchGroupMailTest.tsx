import { TableApi, TableView } from '@brilljoy/react-libs'
import { Button } from 'antd'
import React from 'react'

const RanchGroupMailTest = () => {
  const tableApi = new TableApi('/gms-ranch/table', 'gms_ranch_group_mail', '9.9.9', { database: 'gms' })

  const handleSyncClick = () => {}

  return (
    <TableView
      dataProvider={tableApi}
      toolbarActions={[
        <Button onClick={handleSyncClick} key="sync">
          同步
        </Button>,
      ]}
    />
  )
}

export default RanchGroupMailTest
