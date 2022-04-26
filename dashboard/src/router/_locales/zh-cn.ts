import { CommonLayout, WorkspaceLayout } from '@/components'
import { lazy } from 'react'
import type { CustomRouteConfig } from '../config'

/* Auth */
const Login = lazy(() => import('@/pages/_locales/zh-cn/auth/Login'))
const BindPhoneNumber = lazy(() => import('@/pages/_locales/zh-cn/auth/BindPhoneNumber'))

/* Billing */
const Subscription = lazy(() => import('@/pages/_locales/zh-cn/billing/Subscription'))

const zhCnConfig: CustomRouteConfig[] = [
  {
    path: '/login',
    loginRequired: false,
    layout: CommonLayout,
    component: Login,
    title: 'login.button'
  },
  {
    path: '/bind-phone-number',
    loginRequired: false,
    layout: CommonLayout,
    component: BindPhoneNumber,
    title: 'login.bindPhoneNumber'
  },

  /* Billing */
  {
    path: '/workspace/:workspaceId/billing',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Subscription
  }
]

export default zhCnConfig
