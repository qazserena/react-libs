import { ApiSetting } from './setting'

export interface MetaEnumItem {
  code: string
  value: number
  label: string
}

export interface MetaEnum {
  code: string
  label: string
  editable: boolean
  items: MetaEnumItem[]
}

export const metaApi = new ApiSetting('__brilljoy_react_libs_api_meta', {
  enumRest: '/meta/enum',
  languageRest: '/locale/language',
})
