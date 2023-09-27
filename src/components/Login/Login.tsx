import React, { useContext, useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, message, Spin } from 'antd'
import { defaultExceptionHandler, getApiToken, User } from '../../index'
import { AuthContext } from '../../contexts'

export interface LoginProps {
  /**
   * 登录成功回调
   */
  onLoginSuccess: (user: User) => void
}

/**
 * 登录组件
 * @param props
 * @returns
 */
const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const [spinning, setSpinning] = useState<boolean>(true)

  const authContext = useContext(AuthContext)

  const onFinish = async (values: any) => {
    try {
      const user = await authContext.loginWithAccount(values.username, values.password, values.remember)
      props.onLoginSuccess(user)
    } catch (e) {
      defaultExceptionHandler(e)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo + '')
  }

  useEffect(() => {
    const token = getApiToken()

    setSpinning(false)
    if (token) {
      const hide = message.loading('自动登录中...')
      setSpinning(true)
      authContext
        .loginWithToken()
        .then(user => {
          hide()
          props.onLoginSuccess(user)
        })
        .catch(() => {
          hide()
          setSpinning(false)
        })
    } else {
      setSpinning(false)
    }
  }, [])

  return (
    <Spin spinning={spinning} delay={100}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export { Login }
