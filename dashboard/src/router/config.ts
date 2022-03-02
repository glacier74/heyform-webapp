import { AuthGuard, AuthLayout, WorkspaceLayout } from '@/components'
import { FormLayout, WorkspaceGuardLayout } from '@/legacy_pages/layouts'
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

/* Join workspace */
const JoinWorkspace = lazy(() => import('@/pages/workspace/JoinWorkspace'))

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

/* Form */
const CreateForm = lazy(() => import('@/legacy_pages/pages/CreateForm'))
const ImportForm = lazy(() => import('@/legacy_pages/pages/ImportForm'))
const Templates = lazy(() => import('@/legacy_pages/pages/Templates'))
const TemplatePreview = lazy(() => import('@/legacy_pages/pages/TemplatePreview'))
const FormBuilder = lazy(() => import('@/legacy_pages/pages/FormBuilder'))
const Integration = lazy(() => import('@/legacy_pages/pages/Integration'))
const Share = lazy(() => import('@/legacy_pages/pages/Share'))
const Analytics = lazy(() => import('@/legacy_pages/pages/Analytics'))
const Report = lazy(() => import('@/legacy_pages/pages/Report'))
const Submissions = lazy(() => import('@/legacy_pages/pages/Submissions'))

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
    component: VerifyEmail,
    title: 'Verify email address'
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

  /* Join workspace with invite code */
  {
    path: '/workspace/:workspaceId/invitation/:inviteCode',
    exact: true,
    loginRequired: true,
    layout: AuthLayout,
    component: JoinWorkspace
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
  },

  /* Form */
  {
    path: '/workspace/:workspaceId/project/:projectId/form/create',
    exact: true,
    layout: WorkspaceGuardLayout,
    component: CreateForm
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/import',
    exact: true,
    layout: WorkspaceGuardLayout,
    component: ImportForm
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/templates',
    exact: true,
    layout: WorkspaceGuardLayout,
    component: Templates,
    title: 'Templates'
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/template/:templateId',
    exact: true,
    layout: WorkspaceGuardLayout,
    component: TemplatePreview
  },

  /* Compose */
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/create',
    exact: true,
    layout: FormLayout,
    component: FormBuilder
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/connect',
    exact: true,
    layout: FormLayout,
    component: Integration
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/share',
    exact: true,
    layout: FormLayout,
    component: Share
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/results',
    exact: true,
    layout: FormLayout,
    component: Analytics
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/results/report',
    exact: true,
    layout: FormLayout,
    component: Report
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/results/submissions',
    exact: true,
    layout: FormLayout,
    component: Submissions
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/results/submissions/:category',
    exact: true,
    layout: FormLayout,
    component: Submissions
  }
]

export default config
