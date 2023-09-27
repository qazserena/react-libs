import { LanguageEditor } from '@brilljoy/react-libs'
import {
  LanguageApi,
  LanguageItem,
} from '@brilljoy/react-libs/libs/api/language'
import { Button } from 'antd'
import { useCallback, useEffect, useState } from 'react'

const TestLanguage = () => {
  const [dict, setDict] = useState<Record<string, LanguageItem>>({})

  const reload = useCallback(async () => {
    const api = new LanguageApi()
    const languages = await api.query('zhCN')
    const dict1: Record<string, LanguageItem> = {}

    languages.forEach(language => {
      dict1[language.langKey] = language
    })

    setDict(dict1)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return (
    <div>
      <div>{JSON.stringify(dict['local.menu.start'])}</div>
      <Button onClick={reload}>reload</Button>
    </div>
  )
}

export const LanguageTestEditor = () => {
  const localLanguages: Array<{ langKey: string; [lang: string]: string }> = [
    { langKey: 'local.menu.start' },
    { langKey: 'local.menu.stop' },
    { langKey: 'local.menu.job' },
    { langKey: 'local.menu.system' },
  ]

  for (let i = 0; i < 100; ++i) {
    localLanguages.push({
      langKey: 'local.gen.' + i,
      zhCN: '自动' + i,
    })
  }
  return (
    <div>
      <TestLanguage />
      <LanguageEditor localLanguages={localLanguages} />
    </div>
  )
}
