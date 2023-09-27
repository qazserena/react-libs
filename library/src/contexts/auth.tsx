import React, { useCallback, useState } from 'react'
import {
  getApiToken,
  User,
  loginWithAccount as requestLoginWithAccount,
  loginWithToken as requestLoginWithToken,
  logout as requestLogout,
  setApiToken,
} from '..'

interface AuthContextType {
  /**
   * 当前用户
   */
  currentUser: User | undefined
  /**
   * 登录中
   */
  loading: boolean
  /**
   * 帐号登录
   */
  loginWithAccount: (username: string, password: string, cacheToken: boolean) => Promise<User>
  /**
   * token登录
   */
  loginWithToken: () => Promise<User>
  /**
   * 登出
   */
  logout: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContextType>({} as any)

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(false)

  const logout = useCallback(async () => {
    if (getApiToken()) {
      await requestLogout()
      setApiToken('', true)
    }
    setCurrentUser(undefined)
  }, [])

  const loginWithAccount = useCallback(async (username: string, password: string, cacheToken: boolean) => {
    setLoading(true)
    try {
      const user = await requestLoginWithAccount(username, password)
      setCurrentUser(user)
      setApiToken(user.token, cacheToken)
      setLoading(false)
      return user
    } catch (e) {
      setLoading(false)
      throw e
    }
  }, [])

  const loginWithToken = useCallback(async () => {
    setLoading(true)
    try {
      const user = await requestLoginWithToken()
      setCurrentUser(user)
      setApiToken(user.token, true)
      setLoading(false)
      return user
    } catch (e) {
      setLoading(false)
      throw e
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, loading, loginWithAccount, loginWithToken, logout }}>
      <>{props.children}</>
    </AuthContext.Provider>
  )
}
