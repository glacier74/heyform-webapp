import { AuthGuard, AuthLayout, WorkspaceLayout } from '@/components'
import { FormLayout, WorkspaceGuardLayout } from '@/legacy_pages/layouts'
import { Locale } from '@/locales'
import { lazy } from 'react'
import localesConfig from './_locales'

export interface CustomRouteConfig {
  path: string
  title?: string
  loginRequired?: boolean
  layout: any
  component: any
}

/* Join workspace */
const JoinWorkspace = lazy(() => import('@/pages/workspace/JoinWorkspace'))

/* Workspace */
const Home = lazy(() => import('@/pages/home/Home'))
const Setup = lazy(() => import('@/pages/setup/Setup'))
const Workspace = lazy(() => import('@/pages/workspace/Workspace'))
const Members = lazy(() => import('@/pages/workspace/Members'))

/* Audiences */
const Contacts = lazy(() => import('@/pages/audiences/Contacts'))
const Groups = lazy(() => import('@/pages/audiences/Groups'))

/* Project */
const Project = lazy(() => import('@/pages/project/Project'))
const Trash = lazy(() => import('@/pages/project/Trash'))

/* Form */
const CreateForm = lazy(() => import('@/legacy_pages/pages/CreateForm'))
const FormBuilder = lazy(() => import('@/pages/form/Create'))
const ImportForm = lazy(() => import('@/legacy_pages/pages/ImportForm'))
const Templates = lazy(() => import('@/legacy_pages/pages/Templates'))
const TemplatePreview = lazy(() => import('@/legacy_pages/pages/TemplatePreview'))
const Integration = lazy(() => import('@/legacy_pages/pages/Integration'))
const Share = lazy(() => import('@/legacy_pages/pages/Share'))
const Analytics = lazy(() => import('@/legacy_pages/pages/Analytics'))
const Report = lazy(() => import('@/legacy_pages/pages/Report'))
const Submissions = lazy(() => import('@/legacy_pages/pages/Submissions'))
const FormSettings = lazy(() => import('@/legacy_pages/pages/FormSettings'))

const config: CustomRouteConfig[] = [
  ...localesConfig[Locale.lang],

  /* Home */
  {
    path: '/',
    loginRequired: true,
    layout: AuthGuard,
    component: Home
  },

  /* Setup workspace if there is no one exists */
  {
    path: '/workspace/setup',
    loginRequired: true,
    layout: AuthLayout,
    component: Setup,
    title: 'Setup'
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

  /* Join workspace with invite code */
  {
    path: '/workspace/:workspaceId/invitation/:inviteCode',
    loginRequired: true,
    layout: AuthLayout,
    component: JoinWorkspace,
    title: 'Form invitation'
  },

  /* Audiences */
  {
    path: '/workspace/:workspaceId/audience',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Contacts
  },
  {
    path: '/workspace/:workspaceId/audience/group',
    loginRequired: true,
    layout: WorkspaceLayout,
    component: Groups
  },

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
  {
    path: '/workspace/:workspaceId/project/:projectId/form/create',
    layout: WorkspaceGuardLayout,
    component: CreateForm
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/import',
    layout: WorkspaceGuardLayout,
    component: ImportForm
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/templates',
    layout: WorkspaceGuardLayout,
    component: Templates,
    title: 'Templates'
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/template/:templateId',
    layout: WorkspaceGuardLayout,
    component: TemplatePreview
  },

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
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/share',
    layout: FormLayout,
    component: Share
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/results',
    layout: FormLayout,
    component: Analytics
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/results/report',
    layout: FormLayout,
    component: Report
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/results/submissions',
    layout: FormLayout,
    component: Submissions
  },
  {
    path: '/workspace/:workspaceId/project/:projectId/form/:formId/results/submissions/:category',
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
