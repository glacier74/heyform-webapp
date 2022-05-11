import { CommonLayout, WorkspaceLayout } from '@/components'
import { lazy } from 'react'
import type { CustomRouteConfig } from '../config'

/* Auth */
const Login = lazy(() => import('@/pages/_locales/zh-cn/auth/Login'))
const SignUp = lazy(() => import('@/pages/_locales/zh-cn/auth/SignUp'))
const ForgotPassword = lazy(() => import('@/pages/_locales/zh-cn/auth/ForgotPassword'))
const BindAccount = lazy(() => import('@/pages/_locales/zh-cn/auth/BindAccount'))

/* Billing */
const Subscription = lazy(() => import('@/pages/_locales/zh-cn/billing/Subscription'))
const Orders = lazy(() => import('@/pages/_locales/zh-cn/billing/Orders'))

const zhCnConfig: CustomRouteConfig[] = [
  {
    path: '/login',
    loginRequired: false,
    layout: CommonLayout,
    component: Login,
    title: 'login.button'
  },
  /* Sign Up */
  {
    path: '/sign-up',
    loginRequired: false,
    layout: CommonLayout,
    component: SignUp,
    title: 'auth.signup.description'
  },
  /* Forgot Password */
  {
    path: '/forgot-password',
    loginRequired: false,
    layout: CommonLayout,
    component: ForgotPassword,
    title: 'Forgot Password'
  },
  {
    path: '/bind-account',
    loginRequired: false,
    layout: CommonLayout,
    component: BindAccount,
    title: 'login.bindAccount'
  },

  /* Billing */
  {
    path: '/workspace/:workspaceId/billing',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Subscription
  },
  {
    path: '/workspace/:workspaceId/billing/orders',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Orders
  }
]

export default zhCnConfig
