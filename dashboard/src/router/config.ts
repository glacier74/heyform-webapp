import { AuthGuard, AuthLayout, WorkspaceLayout } from '@/components'
import { lazy } from 'react'

export interface CustomRouteConfig {
  path: string
  exact?: boolean
  title?: string
  loginRequired?: boolean
  layout: any
  component: any
}

/* Auth */
const Login = lazy(() => import('@/pages/auth/Login'))
const SignUp = lazy(() => import('@/pages/auth/SignUp'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))

/* Verify email address */
const VerifyEmail = lazy(() => import('@/pages/user/VerifyEmail'))

/* Workspace */
const Home = lazy(() => import('@/pages/home/Home'))
const Workspace = lazy(() => import('@/pages/workspace/Workspace'))
const Members = lazy(() => import('@/pages/workspace/Members'))

/* Audiences */
const Contacts = lazy(() => import('@/pages/audiences/Contacts'))
const Groups = lazy(() => import('@/pages/audiences/Groups'))

/* Project */
const Project = lazy(() => import('@/pages/project/Project'))
const Trash = lazy(() => import('@/pages/project/Trash'))

/* Billing */
const Subscription = lazy(() => import('@/pages/billing/Subscription'))
const Invoices = lazy(() => import('@/pages/billing/Invoices'))

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
    path: '/reset-password',
    loginRequired: false,
    layout: AuthLayout,
    component: ResetPassword,
    title: 'Reset Password'
  },

  /* Verify email address */
  {
    path: '/verify-email',
    loginRequired: true,
    exact: true,
    layout: AuthLayout,
    component: VerifyEmail
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
    path: '/workspace/:workspaceId/member',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Members
  },

  /* Audiences */
  {
    path: '/workspace/:workspaceId/audience',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Contacts
  },
  {
    path: '/workspace/:workspaceId/audience/group',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Groups
  },

  /* Billing */
  {
    path: '/workspace/:workspaceId/billing',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Subscription
  },
  {
    path: '/workspace/:workspaceId/billing/invoice',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Invoices
  },

  /* Project */
  {
    path: '/workspace/:workspaceId/project/:projectId',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Project
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/trash',
    loginRequired: true,
    exact: true,
    layout: WorkspaceLayout,
    component: Trash
  }
]

export default config
