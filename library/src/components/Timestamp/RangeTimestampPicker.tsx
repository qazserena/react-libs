import { Col, DatePicker, Radio, Row } from 'antd'
import moment, { Moment } from 'moment'
import React, { useContext, useMemo, useState } from 'react'
import { MetaContext } from '../../contexts'

const RangePicker = DatePicker.RangePicker

export interface RangeTimestampPickerProps {
  disabled?: boolean
  allowClear?: boolean
  /**
   * 是否禁用精度切换
   */
  disablePrecisionSwitch?: boolean
  /**
   * 单位: 毫秒|秒
   */
  unit?: 'millisecond' | 'second'
  /**
   * 精度: 日期 | 日期+时间
   */
  precision?: 'date' | 'datetime'

  value?: [number, number] | null
  onChange?: (value: [number, number] | null) => void
}

/**
 * 时间戳范围选择器
 * @param props
 * @returns
 */
export const RangeTimestampPicker: React.FC<RangeTimestampPickerProps> = props => {
  const { timezoneSupported, timezone } = useContext(MetaContext)
  const [precision, setPrecision] = useState<'date' | 'datetime'>(props.precision || 'date')

  const showTime = useMemo<{ defaultValue: Moment[]; hideDisabledOptions: boolean } | undefined>(() => {
    if (precision === 'datetime') {
      return {
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')],
      }
    } else {
      return undefined
    }
  }, [precision])

  const onOk = (value: [Moment, Moment]) => {
    if (!value) {
      props.onChange && props.onChange(null)
      return
    }
    let value0: Moment | null = value[0]
    let value1: Moment | null = value[1]
    if (!showTime) {
      // 抹去时间只留日期
      value0 = value0 ? value0.startOf('day') : null
      value1 = value1 ? value1.endOf('day') : null
    }
    const t0 = value0 ? value0.unix() : 0
    const t1 = value1 ? value1.unix() : 0
    if (props.unit === 'second') {
      props.onChange && props.onChange([t0, t1])
    } else {
      props.onChange && props.onChange([t0 * 1000, t1 * 1000])
    }
  }

  const momentValue: [Moment | null, Moment | null] | undefined = useMemo(() => {
    if (props.value) {
      if (props.unit === 'second') {
        const t0 = props.value[0] > 0 ? moment.unix(props.value[0]) : null
        const t1 = props.value[1] > 0 ? moment.unix(props.value[1]) : null
        return [t0, t1]
      } else {
        const t0 = props.value[0] > 0 ? moment(props.value[0]) : null
        const t1 = props.value[1] > 0 ? moment(props.value[1]) : null
        return [t0, t1]
      }
    }
    return undefined
  }, [props.value, props.unit])

  const footer: React.ReactNode[] = []
  if (timezone && timezoneSupported) {
    footer.push(<Col key="1">时区:</Col>)
    footer.push(<Col key="2">{timezone}</Col>)
  }
  if (!props.disablePrecisionSwitch) {
    footer.push(
      <Col key="3" offset={footer.length > 0 ? 2 : 0}>
        精度
      </Col>
    )
    footer.push(
      <Col key="4">
        <Radio.Group
          key="2"
          value={precision}
          size="small"
          onChange={e => {
            props.onChange && props.onChange(null)
            setPrecision(e.target.value)
          }}
        >
          <Radio value="date">日期</Radio>
          <Radio value="datetime">时间</Radio>
        </Radio.Group>
      </Col>
    )
  }

  const presetRanges = useMemo<Record<string, [Moment, Moment]>>(
    () => ({
      今天: [moment(), moment()],
      本周: [moment().startOf('week'), moment().endOf('week')],
      本月: [moment().startOf('month'), moment().endOf('month')],
    }),
    []
  )

  return (
    <RangePicker
      renderExtraFooter={() => {
        return <Row gutter={8}>{footer}</Row>
      }}
      ranges={presetRanges}
      disabled={props.disabled}
      allowClear={props.allowClear}
      value={momentValue}
      onChange={onOk}
      showTime={showTime}
      onOk={onOk}
    />
  )
}
