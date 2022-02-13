import { LayoutAuth } from '@/components'
import { lazy } from 'react'
import type { CustomRouteConfig } from './index'

const Login = lazy(() => import('@/pages/auth/login'))

const config: CustomRouteConfig[] = [
  /* Login */
  {
    path: '/login',
    loginRequired: false,
    layout: LayoutAuth,
    component: Login,
    title: 'Login'
  }
]

export default config
