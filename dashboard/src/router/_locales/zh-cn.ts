import { CommonLayout } from '@/components'
import type { CustomRouteConfig } from '../config'
import { lazy } from 'react'

/* Auth */
const Login = lazy(() => import('@/pages/_locales/zh-cn/auth/Login'))

const zhCnConfig: CustomRouteConfig[] = [
  {
    path: '/login',
    loginRequired: false,
    layout: CommonLayout,
    component: Login,
    title: 'Login'
  }
]

export default zhCnConfig
