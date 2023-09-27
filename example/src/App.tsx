import React, { useContext, useEffect } from 'react'
import './App.css'

import { UserTest } from './page/UserTest'
import { LoginTest } from './page/LoginTest'
import { Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AuthContext,
  Authorize,
  BackgroundTaskIndicator,
  setTokenExpireHandler,
  withAuthorize,
} from '@brilljoy/react-libs'
import { Button, Col, Menu, Row, Space } from 'antd'
import { PermissionTest } from './page/PermissionTest'
import { Layout } from 'antd'
import { MetaEnumEditorTest } from './page/MetaEnumEditorTest'
import { DemoTest } from './page/DemoTest'
import { LanguageTestEditor } from './page/LanguageEditorTest'
import { ExamTestPage } from './page/ExamTest'
import RanchGroupMailTest from './page/RanchGroupMailTest'
import { RoleEditor } from './page/RoleEditor'
import CharacterTest from './page/CharacterTest'
import { TimestampTest } from './page/TimestampTest'

const { Sider, Content } = Layout
const { SubMenu, Item } = Menu

const componentsTestCase: Array<{
  path: string
  name: string
  element: React.FC
}> = [
  {
    path: '/test/component/permission',
    name: '权限编辑器',
    element: PermissionTest,
  },
  {
    path: '/test/component/roles',
    name: '角色编辑器',
    element: RoleEditor,
  },
  {
    path: '/test/component/meta-enum',
    name: '枚举编辑器',
    element: MetaEnumEditorTest,
  },
  {
    path: '/test/component/language',
    name: '多语言编辑器',
    element: LanguageTestEditor,
  },
  {
    path: '/test/component/table-view',
    name: 'TableView',
    element: UserTest,
  },
  {
    path: '/test/component/character-view',
    name: '角色表',
    element: CharacterTest,
  },
  {
    path: '/test/component/exam',
    name: 'ExamView',
    element: ExamTestPage,
  },
  {
    path: '/test/component/demo',
    name: 'Demo',
    element: DemoTest,
  },
  {
    path: '/test/component/ranch-group-mail',
    name: 'RanchGroupMail',
    element: RanchGroupMailTest,
  },
  {
    path: '/test/page/timestamp-test',
    name: '时间测试',
    element: TimestampTest,
  },
]

setTokenExpireHandler(() => {
  if (window.location.pathname !== '/login') {
    console.log('会话过期，重新加载页面!')
    window.location.reload()
  }
})

const UserStatusBar = () => {
  const { currentUser, logout } = useContext(AuthContext)

  const handleLogoutClick = () => {
    logout()
  }

  return (
    <Row>
      <Col span={10}>
        当前用户: {currentUser!.username}
        <Space />
        <Button type="link" onClick={handleLogoutClick}>
          退出登录
        </Button>
        <Space />
      </Col>
      <Col>
        <BackgroundTaskIndicator />
      </Col>
    </Row>
  )
}

const UserStatusBarHOC = withAuthorize(UserStatusBar)

const BaseLayout = () => {
  return (
    <Layout>
      <Sider>
        <Menu mode="inline" defaultOpenKeys={['1']}>
          <SubMenu key="1" title="组件测试">
            {componentsTestCase.map(comp => (
              <Item key={comp.path}>
                <Link to={comp.path}>{comp.name}</Link>
              </Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <div>
          <UserStatusBarHOC />
        </div>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

function App() {
  const auth = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/login' && !auth.currentUser) {
      navigate('/login')
    }
  }, [location, auth.currentUser, navigate])

  return (
    <Routes>
      <Route path="/login" element={<LoginTest />}></Route>
      <Route path="/" element={<BaseLayout />}>
        {componentsTestCase.map(comp => (
          <Route
            key={comp.path}
            path={comp.path}
            element={
              <Authorize>
                <comp.element></comp.element>
              </Authorize>
            }
          ></Route>
        ))}
        <Route index element={<span>Welcome!</span>} />
      </Route>
    </Routes>
  )
}

export default App
