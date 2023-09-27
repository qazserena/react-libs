import { Progress } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TableDataProvider, TableSchema } from '../../api'
import { BackgroundTask, TaskData } from '../BackgroundTask'

interface ExportTaskData extends TaskData {
  file: string
}

export class BackgroundExportTask extends BackgroundTask<ExportTaskData> {
  constructor(private dataProvider: TableDataProvider, private condition?: string, private timezone?: string) {
    super()
  }

  private timer: number

  private data: ExportTaskData = { progress: 0, file: '', finish: false }

  private jobId: number = 0

  onStart(): void {
    this.timer = window.setInterval(this.refresh, 100)
    this.dataProvider
      .export(this.condition, this.timezone)
      .then(taskId => {
        this.jobId = taskId
      })
      .catch(e => {
        console.error(e)
      })
  }

  getTaskData(): ExportTaskData {
    return this.data
  }

  onFinalize(): void {
    this.clearTimer()
  }

  private clearTimer() {
    if (this.timer > 0) {
      window.clearInterval(this.timer)
      this.timer = 0
    }
  }

  private refresh = async () => {
    try {
      const jobInfo = await this.dataProvider.getJob(this.jobId)
      if (jobInfo.finish) {
        this.data.finish = true
        this.data.file = jobInfo.userdata
        this.data.progress = 100
        this.setFinish()
        this.clearTimer()
      } else {
        this.data.progress = Math.floor(jobInfo.progress * 100)
      }
    } catch (e) {
      console.error(e)
    }
  }
}

interface ExportTaskProps {
  schema: TableSchema
  task: BackgroundExportTask
}
export const ExportTaskView = (props: ExportTaskProps) => {
  const [data, setData] = useState<ExportTaskData>({ file: '', finish: false, progress: 0 })

  const refreshTimer = useRef<number>()

  const clearTimer = () => {
    if (refreshTimer.current) {
      window.clearInterval(refreshTimer.current)
      refreshTimer.current = 0
    }
  }

  const refresh = useCallback(() => {
    const data0 = props.task.getTaskData()
    if (data0.finish) {
      clearTimer()
    }
    setData({ ...data0 })
  }, [setData, props.task])

  useEffect(() => {
    refreshTimer.current = window.setInterval(() => {
      refresh()
    }, 500)

    return clearTimer
  }, [])

  return (
    <div style={{ width: '100%' }}>
      {!data.finish ? (
        <div>[{props.schema.label}]正在导出...</div>
      ) : (
        <div>
          <span>[{props.schema.label}]导出完成</span>
          <a href={data.file} target="_blank" style={{ marginLeft: '10px' }}>
            点击下载
          </a>
        </div>
      )}
      <Progress percent={data.progress} />
    </div>
  )
}
