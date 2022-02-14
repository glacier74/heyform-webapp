import { AuthGuard, LayoutAuth, LayoutWorkspace } from '@/components'
import { lazy } from 'react'
import type { CustomRouteConfig } from './index'

/* Auth */
const Login = lazy(() => import('@/pages/auth/Login'))
const SignUp = lazy(() => import('@/pages/auth/SignUp'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))

/* Workspace */
const Home = lazy(() => import('@/pages/home/Home'))
const Workspace = lazy(() => import('@/pages/workspace/Workspace'))
const Members = lazy(() => import('@/pages/workspace/Members'))

const config: CustomRouteConfig[] = [
  /* Login */
  {
    path: '/login',
    loginRequired: false,
    layout: LayoutAuth,
    component: Login,
    title: 'Login'
  },
  /* Sign Up */
  {
    path: '/sign-up',
    loginRequired: false,
    layout: LayoutAuth,
    component: SignUp,
    title: 'Sign Up'
  },
  /* Forgot Password */
  {
    path: '/forgot-password',
    loginRequired: false,
    layout: LayoutAuth,
    component: ForgotPassword,
    title: 'Forgot Password'
  },
  /* Reset Password */
  {
    path: '/reset/:token',
    loginRequired: false,
    layout: LayoutAuth,
    component: ResetPassword,
    title: 'Reset Password'
  },

  /* Home */
  {
    path: '/',
    loginRequired: true,
    exact: true,
    layout: AuthGuard,
    component: Home
  },

  /* Workspace */
  {
    path: '/workspace/:workspaceId',
    loginRequired: true,
    exact: true,
    layout: LayoutWorkspace,
    component: Workspace,
    title: 'Workspace'
  },
  {
    path: '/workspace/:workspaceId/members',
    loginRequired: true,
    exact: true,
    layout: LayoutWorkspace,
    component: Members,
    title: 'Workspace'
  }
]

export default config
