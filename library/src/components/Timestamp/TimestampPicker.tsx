import { DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import React, { useContext, useMemo } from 'react'
import { MetaContext } from '../../contexts'

export interface TimestampPickerProps {
  disabled?: boolean
  allowClear?: boolean

  /**
   * 单位: 毫秒|秒
   */
  unit?: 'millisecond' | 'second'
  /**
   * 精度: 日期 | 日期+时间
   */
  precision?: 'date' | 'datetime'

  value?: number
  onChange?: (value: number) => void
}

/**
 * 时间戳选择器
 * @param props
 * @returns
 */
export const TimestampPicker: React.FC<TimestampPickerProps> = props => {
  const { timezoneSupported, timezone } = useContext(MetaContext)

  const showTime = useMemo<{ defaultValue: Moment; hideDisabledOptions: boolean } | undefined>(() => {
    if (props.precision === 'datetime') {
      return {
        hideDisabledOptions: true,
        defaultValue: moment('00:00:00', 'HH:mm:ss'),
      }
    } else {
      return undefined
    }
  }, [props.precision])

  const onOk = (value: Moment | null) => {
    if (!value) {
      props.onChange && props.onChange(0)
      return
    }
    if (!showTime) {
      // 抹去时间只留日期
      value = value.startOf('day')
    }
    if (props.unit === 'second') {
      props.onChange && props.onChange(value.unix())
    } else {
      props.onChange && props.onChange(value.unix() * 1000)
    }
  }

  const momentValue: Moment | undefined = useMemo(() => {
    if (props.value) {
      if (props.unit === 'second') {
        return moment.unix(props.value)
      } else {
        return moment(props.value)
      }
    }
    return undefined
  }, [props.value, props.unit])

  return (
    <DatePicker
      renderExtraFooter={() => {
        if (timezone && timezoneSupported) {
          return <span>时区: {timezone}</span>
        } else {
          return undefined
        }
      }}
      disabled={props.disabled}
      allowClear={props.allowClear}
      value={momentValue}
      onChange={onOk}
      showTime={showTime}
      onOk={onOk}
    />
  )
}
