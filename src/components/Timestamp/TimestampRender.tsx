import moment, { Moment } from 'moment'
import { useContext, useMemo } from 'react'
import { MetaContext } from '../../contexts'
import React from 'react'

interface TimestampRenderProps {
  value?: number
  unit?: 'millisecond' | 'second'
  precision?: 'date' | 'datetime'
  format?: string
}

/**
 * 时间戳render
 * @param props
 * @returns
 */
export const TimestampRender: React.FC<TimestampRenderProps> = props => {
  const { timezoneSupported, timezone } = useContext(MetaContext)

  const momentValue: Moment | undefined = useMemo(() => {
    if (props.value) {
      return props.unit === 'second' ? moment.unix(props.value) : moment(props.value)
    }
    return undefined
  }, [props.value, props.unit])

  const format: string = useMemo(() => {
    if (props.format) {
      return props.format
    }
    if (props.precision === 'date') {
      if (timezoneSupported && timezone) {
        return 'YYYY-MM-DD z'
      } else {
        return 'YYYY-MM-DD'
      }
    } else {
      if (timezoneSupported && timezone) {
        return 'YYYY-MM-DD HH:mm:ss z'
      } else {
        return 'YYYY-MM-DD HH:mm:ss'
      }
    }
  }, [props.format, props.precision, timezoneSupported, timezone])

  const formatedString = useMemo(() => {
    if (!momentValue) {
      return '-'
    }
    if (timezoneSupported && timezone) {
      return momentValue.tz(timezone).format(format)
    } else {
      return momentValue.format(format)
    }
  }, [momentValue, format, timezoneSupported, timezone])

  return <span>{formatedString}</span>
}
