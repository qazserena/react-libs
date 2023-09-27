import React from 'react'
import { TableView, TableApi, TableViewColumnDict } from '@brilljoy/react-libs'

export const ExamTestPage = () => {
  const dataProvider = new TableApi('/auth-center/table', 'test', '9.9.9')

  const columns: TableViewColumnDict = {
    category: {
      filters: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
      ],
    },
  }

  return <TableView dataProvider={dataProvider} columns={columns}></TableView>
}
