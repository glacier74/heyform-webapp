import { AuthGuard, AuthLayout, WorkspaceLayout } from '@/components'
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

/* Audiences */
const Contacts = lazy(() => import('@/pages/audiences/Contacts'))

/* Project */
const Project = lazy(() => import('@/pages/project/Project'))

const config: CustomRouteConfig[] = [
  /* Login */
  {
    path: '/login',
    loginRequired: false,
    layout: AuthLayout,
    component: Login,
    title: 'Login'
  },
  /* Sign Up */
  {
    path: '/sign-up',
    loginRequired: false,
    layout: AuthLayout,
    component: SignUp,
    title: 'Sign Up'
  },
  /* Forgot Password */
  {
    path: '/forgot-password',
    loginRequired: false,
    layout: AuthLayout,
    component: ForgotPassword,
    title: 'Forgot Password'
  },
  /* Reset Password */
  {
    path: '/reset/:token',
    loginRequired: false,
    layout: AuthLayout,
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
    layout: WorkspaceLayout,
    component: Workspace
  },
  {
    path: '/workspace/:workspaceId/members',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Members
  },

  /* Audiences */
  {
    path: '/workspace/:workspaceId/audiences',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Contacts
  },

  /* Project */
  {
    path: '/workspace/:workspaceId/project/:projectId',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Project
  }
]

export default config
