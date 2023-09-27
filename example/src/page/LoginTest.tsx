import React from 'react'
import { Login, User } from '@brilljoy/react-libs'
import { useNavigate } from 'react-router'

const LoginTest = () => {
  const navigate = useNavigate()

  const handleLoginSuccess = (user: User) => {
    console.log('登录成功', user)
    navigate('/')
  }

  return (
    <div>
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  )
}

export { LoginTest }
