import moment from 'moment'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { metaApi, MetaEnum } from '../api/meta'
import { RESTfulApi } from '../utils'

interface MetaContextType {
  getEnum: (name: string) => MetaEnum | undefined
  reload: () => Promise<void>
  timezone?: string
  setTimezone: (timezone: string) => void
  timezoneSupported: boolean
}

export const MetaContext = createContext<MetaContextType>({} as any)

interface MetaContextProviderProps {
  children: React.ReactNode
}

export const MetaContextProvider = (props: MetaContextProviderProps) => {
  const [enums, setEnums] = useState<{ [name: string]: MetaEnum }>({})
  const [timezone, setTimezone] = useState<string>()
  // 时区是否受支持
  const [timezoneSupported, setTimezoneSupported] = useState<boolean>(false)
  useEffect(() => {
    import('moment-timezone')
      .then(() => {
        setTimezoneSupported(true)
      })
      .catch(() => {
        setTimezoneSupported(false)
      })
  }, [])

  useEffect(() => {
    if (timezone && timezoneSupported) {
      // 如果支持时区则设置默认时区
      moment.tz.setDefault(timezone)
    }
  }, [timezone, timezoneSupported])

  const metaRestApi = new RESTfulApi<MetaEnum>(metaApi.data.enumRest, 'code')

  const reload = useCallback(async () => {
    try {
      const list = await metaRestApi.list()
      setEnums(() => {
        const result: { [name: string]: MetaEnum } = {}
        list.forEach(item => {
          result[item.code] = item
        })
        return result
      })
    } catch (e) {
      console.error('加载枚举元数据失败:' + e)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [])

  const getEnum = useCallback(
    (name: string) => {
      return enums[name]
    },
    [enums]
  )

  return (
    <MetaContext.Provider value={{ reload, getEnum, timezone, setTimezone, timezoneSupported }}>
      {props.children}
    </MetaContext.Provider>
  )
}
