import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { LanguageItem } from '../../../api/language'

interface LanguageFormProps {
  supportedLanguages: string[]
  value?: LanguageItem
  onFinish: (data: LanguageItem) => Promise<void>
}

export const LanguageForm = (props: LanguageFormProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(props.value)
  }, [props.value])

  const handleFinish = async (data: LanguageItem) => {
    if (!props.value) {
      return
    }
    await props.onFinish({ ...data, langKey: props.value.langKey })
  }

  return (
    <Form form={form} onFinish={handleFinish}>
      {props.supportedLanguages.map(language => {
        return (
          <Form.Item
            key={language}
            label={language}
            name={language}
            rules={[{ required: false }, { max: 4096 }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        )
      })}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}
