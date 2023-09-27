import React, { useContext, useMemo } from 'react'
import { MetaContext } from '../../contexts'

export interface EnumRenderProps {
  enumName: string
  value: any
}

/**
 * 枚举显示
 * @param props
 * @returns
 */
export const EnumRender = (props: EnumRenderProps) => {
  const meta = useContext(MetaContext)

  const label = useMemo(() => {
    const em = meta.getEnum(props.enumName)
    if (!em) {
      return ''
    }
    for (const item of em.items) {
      if (item.value === props.value) {
        return item.label
      }
    }
    return ''
  }, [meta, props.enumName, props.value])

  return <span>{label}</span>
}
