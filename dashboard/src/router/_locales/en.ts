import { AuthLayout, CommonLayout, WorkspaceLayout } from '@/components'
import { lazy } from 'react'
import type { CustomRouteConfig } from '../config'

/* Auth */
const Login = lazy(() => import('@/pages/auth/Login'))
const SignUp = lazy(() => import('@/pages/auth/SignUp'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))

/* Verify email address */
const VerifyEmail = lazy(() => import('@/pages/user/VerifyEmail'))

/* Billing */
const Subscription = lazy(() => import('@/pages/billing/Subscription'))
const Invoices = lazy(() => import('@/pages/billing/Invoices'))

const enConfig: CustomRouteConfig[] = [
  /* Login */
  {
    path: '/login',
    loginRequired: false,
    layout: CommonLayout,
    component: Login,
    title: 'Login'
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
  /* Reset Password */
  {
    path: '/reset-password',
    loginRequired: false,
    layout: CommonLayout,
    component: ResetPassword,
    title: 'Reset Password'
  },

  /* Verify email address */
  {
    path: '/verify-email',
    loginRequired: true,
    layout: AuthLayout,
    component: VerifyEmail,
    title: 'Verify email address'
  },

  /* Billing */
  {
    path: '/workspace/:workspaceId/billing',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Subscription
  },
  {
    path: '/workspace/:workspaceId/billing/invoice',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Invoices
  }
]

export default enConfig
