import { AuthLayout, CommonLayout } from '@/components'
import type { CustomRouteConfig } from '../config'
import { lazy } from 'react'

/* Auth */
const Login = lazy(() => import('@/pages/auth/Login'))
const SignUp = lazy(() => import('@/pages/auth/SignUp'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))

/* Verify email address */
const VerifyEmail = lazy(() => import('@/pages/user/VerifyEmail'))

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
    title: 'Sign Up'
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
  }
]

export default enConfig
