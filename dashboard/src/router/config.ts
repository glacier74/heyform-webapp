import { lazy } from 'react'

import { AuthGuard, AuthLayout, CommonLayout, FormLayout, WorkspaceLayout } from '@/components'

export interface CustomRouteConfig {
  path: string
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
const OauthAuthorization = lazy(() => import('@/pages/auth/OauthAuthorization'))

/* Verify email address */
const VerifyEmail = lazy(() => import('@/pages/user/VerifyEmail'))

/* Join workspace */
const JoinWorkspace = lazy(() => import('@/pages/workspace/JoinWorkspace'))

/* OnBoarding Trial */
const OnBoardingTrial = lazy(() => import('@/pages/workspace/OnBoardingTrial'))

/* Workspace */
const Home = lazy(() => import('@/pages/home/Home'))
const CreateWorkspace = lazy(() => import('@/pages/workspace/CreateWorkspace'))
const Workspace = lazy(() => import('@/pages/workspace/Workspace'))
const Members = lazy(() => import('@/pages/workspace/Members'))

/* Billing */
const Subscription = lazy(() => import('@/pages/billing/Subscription'))
const Invoices = lazy(() => import('@/pages/billing/Invoices'))

// /* Audiences */
// const Contacts = lazy(() => import('@/pages/audiences/Contacts'))
// const Groups = lazy(() => import('@/pages/audiences/Groups'))

/* Project */
const Project = lazy(() => import('@/pages/project/Project'))
const Trash = lazy(() => import('@/pages/project/Trash'))

/* Form */
// const CreateForm = lazy(() => import('@/pages/CreateForm'))
const FormBuilder = lazy(() => import('@/pages/form/Create'))
// @Discard at Sep 8 2022
// const ImportForm = lazy(() => import('@/pages/ImportForm'))
// const Templates = lazy(() => import('@/pages/Templates'))
// const TemplatePreview = lazy(() => import('@/pages/TemplatePreview'))
const Integration = lazy(() => import('@/pages/form/Integration'))
const Analytics = lazy(() => import('@/pages/form/Analytics'))
const Submissions = lazy(() => import('@/pages/form/Submissions'))
const FormSettings = lazy(() => import('@/pages/form/FormSettings'))

const config: CustomRouteConfig[] = [
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

  /* Home */
  {
    path: '/',
    loginRequired: true,
    layout: AuthGuard,
    component: Home
  },

  /* Setup workspace if there is no one exists */
  {
    path: '/workspace/create',
    loginRequired: true,
    layout: AuthLayout,
    component: CreateWorkspace,
    title: 'Create workspace'
  },
  /* OnBoading */
  {
    path: '/workspace/:workspaceId/trial',
    loginRequired: true,
    layout: OnBoardingTrial,
    component: OnBoardingTrial,
    title: 'Start your free trial'
  },

  /* OAuth v2 authorize */
  {
    path: '/oauth/authorize',
    loginRequired: true,
    layout: AuthLayout,
    component: OauthAuthorization,
    title: 'Authorize'
  },

  /* Workspace */
  {
    path: '/workspace/:workspaceId',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Workspace
  },
  {
    path: '/workspace/:workspaceId/member',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Members
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
  },

  /* Join workspace with invite code */
  {
    path: '/workspace/:workspaceId/invitation/:inviteCode',
    loginRequired: true,
    layout: AuthLayout,
    component: JoinWorkspace,
    title: 'Form invitation'
  },

  // /* Audiences */
  // {
  //   path: '/workspace/:workspaceId/audience',
  //   loginRequired: true,
  //   layout: WorkspaceLayout,
  //   component: Contacts
  // },
  // {
  //   path: '/workspace/:workspaceId/audience/group',
  //   loginRequired: true,
  //   layout: WorkspaceLayout,
  //   component: Groups
  // },

  /* Project */
  {
    path: '/workspace/:workspaceId/project/:projectId',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Project
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/trash',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Trash
  },

  /* Form */
  // @Discard at Sep 8 2022
  // {
  //   path: '/workspace/:workspaceId/project/:projectId/form/create',
  //   layout: WorkspaceGuardLayout,
  //   component: CreateForm
  // },
  // {
  //   path: '/workspace/:workspaceId/project/:projectId/form/import',
  //   layout: WorkspaceGuardLayout,
  //   component: ImportForm
  // },
  // {
  //   path: '/workspace/:workspaceId/project/:projectId/templates',
  //   layout: WorkspaceGuardLayout,
  //   component: Templates,
  //   title: 'Templates'
  // },
  // {
  //   path: '/workspace/:workspaceId/project/:projectId/template/:templateId',
  //   layout: WorkspaceGuardLayout,
  //   component: TemplatePreview
  // },

  /* Compose */
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/create',
    layout: FormLayout,
    component: FormBuilder
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/connect',
    layout: FormLayout,
    component: Integration
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/analytics',
    layout: FormLayout,
    component: Analytics
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/submissions',
    layout: FormLayout,
    component: Submissions
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/submissions/:category',
    layout: FormLayout,
    component: Submissions
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/settings',
    layout: FormLayout,
    component: FormSettings
  }
]

export default config
