import { TableApi, TableView, TableViewColumnDict } from '@brilljoy/react-libs'
import { Select } from 'antd'
import React, { useMemo, useState } from 'react'

const dict: Record<string, string> = {
  '2': 'ef_game',
  '3': 'ef_game',
  '51': 'ef_game51',
}

function useGameDatabase(serverId: number) {
  return useMemo(() => {
    return new TableApi('/gms-ef3/table', 'ef_activity_conf_v2', '9.9.9', {
      database: serverId + ':' + dict[serverId + ''],
    })
  }, [serverId])
}

const CharacterTest = () => {
  const [selectedServer, setSelectedServer] = useState(2)

  const api = useGameDatabase(selectedServer)

  const columns: TableViewColumnDict = {
    // uid: {
    //   sorter: true,
    //   defaultSortOrder: 'descend',
    //   sortDirections: ['descend', 'ascend', 'descend'],
    // },
    // register_ts: {
    //   sorter: true,
    //   defaultSortOrder: 'descend',
    //   sortDirections: ['descend', 'ascend', 'descend'],
    // },
    beginType: {
      dependencies: ['category'],
      renderFormItem: (_a, _, form) => {
        return <div>render</div>
      },
    },
  }

  return (
    <div>
      <Select value={selectedServer} onChange={setSelectedServer}>
        <Select.Option value={2}>Server 2</Select.Option>
        <Select.Option value={3}>Server 3</Select.Option>
        <Select.Option value={51}>Server 51</Select.Option>
      </Select>
      <hr />
      <TableView
        dataProvider={api}
        columns={columns}
        proTableProps={{ rowSelection: { type: 'checkbox' } }}
      ></TableView>
    </div>
  )
}

export default CharacterTest
