import React, { useImperativeHandle, useMemo, useState } from 'react'
import { Badge, List, Space, Popover } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { BackgroundTask, TaskData } from './BackgroundTask'

interface AddFun {
  <T extends BackgroundTask>(task: T, taskViewRender: (task: T) => React.ReactNode): void
}

interface BackgroundTaskApi {
  add: AddFun
}

export const backgroundTaskApi = React.createRef<BackgroundTaskApi>()

interface TaskItem<T extends TaskData = TaskData> {
  finish: boolean
  task: BackgroundTask<T>
  taskViewRender: (task: BackgroundTask<T>) => React.ReactNode
}

interface BackgroundTaskIndicatorProps {}

/**
 *
 * @param props 后台任务指示器
 * @returns
 */
export const BackgroundTaskIndicator: React.FC<BackgroundTaskIndicatorProps> = _props => {
  const [items, setItems] = useState<TaskItem[]>([])

  const counter = useMemo<number>(() => {
    return items.length
  }, [items])

  useImperativeHandle(backgroundTaskApi, () => {
    return {
      add: (task, taskViewRender) => {
        task.onStart()
        task.once('finish', () => {
          setItems(items =>
            items.map(i => {
              if (i.task === task) {
                return { ...i, finish: true }
              }
              return i
            })
          )
        })
        setItems([...items, { task, finish: false, taskViewRender: taskViewRender }])
      },
    }
  })

  const taskListItemRender = (item: TaskItem) => {
    const actions = item.finish
      ? [
          <a
            key="clear"
            onClick={() => {
              setItems(items => items.filter(i => i !== item))
            }}
          >
            清除
          </a>,
        ]
      : undefined
    return <List.Item actions={actions}>{item.taskViewRender(item.task)}</List.Item>
  }

  // 套了一个无用的<>避免警告
  const overlay = (
    <div>
      <List<TaskItem>
        size="small"
        style={{ width: '700px', minHeight: '200px' }}
        dataSource={items}
        renderItem={taskListItemRender}
      ></List>
    </div>
  )

  return (
    <Popover content={overlay} placement="bottom" trigger="click" title="任务队列">
      <a onClick={e => e.preventDefault()}>
        <Space>
          <Badge count={counter} size="small" style={{ boxShadow: 'none' }}>
            {<BellOutlined shape="suqare" />}
          </Badge>
        </Space>
      </a>
    </Popover>
  )
}
