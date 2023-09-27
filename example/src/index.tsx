import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import {
  authApi,
  AuthContextProvider,
  metaApi,
  MetaContextProvider,
  permissionApi,
  tableAddressRegister,
} from '@brilljoy/react-libs'

/*
tableAddressRegister.register('role', '/auth/table')

authApi.setup({
  loginWithAccount: '/auth/user/login-with-account',
  loginWithToken: '/auth/user/login-with-token',
  logout: '/auth/user/logout',
})

permissionApi.setup({
  loadPermissionData: '/auth/permission/tree',
})

metaApi.setup({
  enumRest: '/auth/meta/enum',
  languageRest: '/auth/locale/language',
})
*/

tableAddressRegister.register('role', '/auth-center/table')

authApi.setup({
  loginWithAccount: '/auth-center/login',
  loginWithToken: '/auth-center/login-with-token',
  logout: '/auth-center/logout',
})

permissionApi.setup({
  loadPermissionData: '/auth-center/permission/tree',
})

metaApi.setup({
  enumRest: '/auth-center/meta/enum',
  languageRest: '/auth-center/locale/language',
})

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MetaContextProvider>
        <App />
      </MetaContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
