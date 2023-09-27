import React from 'react'
import { Select, SelectProps } from 'antd'
import { useContext, useMemo } from 'react'
import { MetaEnumItem } from '../../api'
import { MetaContext } from '../../contexts'

export interface EnumSelectProps extends SelectProps {
  /**
   * 枚举名
   */
  enumName: string
}

/**
 * 枚举选择组件
 * @param props
 * @returns
 */
export const EnumSelect = (props: EnumSelectProps) => {
  const meta = useContext(MetaContext)
  const items = useMemo<MetaEnumItem[]>(() => {
    const em = meta.getEnum(props.enumName)
    return em ? em.items : []
  }, [meta, props.enumName])

  const selectProps: Partial<EnumSelectProps> = { ...props }
  delete selectProps['enumName']

  return (
    <Select {...selectProps}>
      {items.map(item => {
        return (
          <Select.Option key={item.code} value={item.value}>
            {item.label}
          </Select.Option>
        )
      })}
    </Select>
  )
}
