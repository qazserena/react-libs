import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { useCallback, useContext, useState } from 'react'
import { TableDataProvider, MetaContext } from '../../index'
import { TableSchema } from '../../api'
import { useMounted } from '../../hooks'
import { backgroundTaskApi } from '../BackgroundTask'
import { BackgroundExportTask, ExportTaskView } from './ExportTask'

interface ExportButtonProps {
  schema: TableSchema
  dataProvider: TableDataProvider
  condition?: string
}

export const ExportButton = (props: ExportButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { timezone } = useContext(MetaContext)
  const mounted = useMounted()

  const handleExport = useCallback(async () => {
    if (loading) {
      return
    }
    if (!backgroundTaskApi.current) {
      console.error('找不到BackgroundTaskIndicator组件')
      return
    }

    setLoading(true)

    const task = new BackgroundExportTask(props.dataProvider, props.condition, timezone)
    task.on('finish', () => {
      window.setTimeout(() => {
        if (mounted.current) {
          setLoading(false)
        }
      })
    })
    backgroundTaskApi.current.add<BackgroundExportTask>(task, task => (
      <ExportTaskView schema={props.schema} task={task}></ExportTaskView>
    ))
  }, [loading, setLoading, props.schema, props.dataProvider, props.condition, timezone])

  return (
    <Tooltip key="export" title="导出数据">
      <div className="ant-pro-table-list-toolbar-setting-item" onClick={handleExport}>
        {loading ? <LoadingOutlined /> : <DownloadOutlined />}
      </div>
    </Tooltip>
  )
}
