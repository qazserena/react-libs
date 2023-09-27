import { MetaContext, RangeTimestampPicker, TimestampPicker, TimestampRender } from '@brilljoy/react-libs'
import { Select } from 'antd'
import moment from 'moment'
import 'moment-timezone'
import { useContext, useEffect, useState } from 'react'

export const TimestampTest = () => {
  const [time, setTime] = useState(0)
  const metaContext = useContext(MetaContext)
  const [dynamicTime, setDyanmicTime] = useState(0)
  const [timeRange, setTimeRange] = useState<[number, number] | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <h3>时间测试</h3>
      <div>
        <TimestampRender value={time} />
      </div>
      <div>
        TimestampRender:
        <TimestampRender value={dynamicTime} /> | {dynamicTime} |
      </div>
      <div>timestamp: {dynamicTime}</div>
      <div>本地toLocaleString:{new Date(dynamicTime).toLocaleString()}</div>
      <div>mement.format: {moment(dynamicTime).format()}</div>
      <div>mement.format(上海): {moment(dynamicTime).tz('Asia/Shanghai').format()}</div>
      <div>
        <TimestampPicker allowClear precision="datetime" value={dynamicTime} onChange={setDyanmicTime} />
      </div>
      <hr />
      <div>{JSON.stringify(timeRange)}</div>
      <div>
        <RangeTimestampPicker allowClear precision="date" value={timeRange} onChange={setTimeRange} />
      </div>
      <hr />
      <Select
        onChange={value => {
          metaContext.setTimezone(value)
        }}
      >
        <Select.Option value="America/Los_Angeles">America/Los_Angeles</Select.Option>
        <Select.Option value="America/New_York">America/New_York</Select.Option>
        <Select.Option value="Asia/Shanghai">Asia/Shanghai</Select.Option>
      </Select>
    </div>
  )
}
