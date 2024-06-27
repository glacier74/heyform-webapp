import { helper, timestamp, unixDate } from '@heyform-inc/utils'
import { LayoutProps } from '@heyooo-inc/react-router'
import { IconChevronLeft, IconDiamond, IconMenu } from '@tabler/icons-react'
import { useAsyncEffect } from 'ahooks'
import dayjs from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { Button, useAlert } from '@/components'
import { AuthLayout } from '@/layouts'
import { UserService, WorkspaceService } from '@/services'
import { useAppStore, useUserStore, useWorkspaceStore } from '@/store'
import { cn, useParam, useQuery, useRouter } from '@/utils'

import ChangePasswordModal from './ChangePasswordModal'
import CreateProjectModal from './CreateProjectModal'
import CreateWorkspaceModal from './CreateWorkspaceModal'
import DeleteProjectModal from './DeleteProjectModal'
import PaymentModal from './PaymentModal'
import UpgradeModal from './UpgradeModal'
import UserAccountModal from './UserAccountModal'
import UserDeletionModal from './UserDeletionModal'
import WorkspaceAccount from './WorkspaceAccount'
import WorkspaceSidebar, { WorkspaceSidebarModal } from './WorkspaceSidebar'

export const LoginGuard: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()

  const alert = useAlert()
  const router = useRouter()
  const { user, setUser, updateUser } = useUserStore()

  useAsyncEffect(async () => {
    const user = await UserService.userDetail()
    setUser(user)

    if (!user.isEmailVerified) {
      router.replace('/verify-email')
    }
  }, [])

  useEffect(() => {
    if (user.isDeletionScheduled) {
      alert({
        title: t('user.deletion.scheduled.title'),
        description: t('user.deletion.scheduled.description', {
          remainingTime: Math.ceil(((user.deletionScheduledAt || 0) - timestamp()) / 3600)
        }),
        cancelProps: {
          label: t('components.cancel')
        },
        confirmProps: {
          label: t('user.deletion.scheduled.cancel'),
          className: 'bg-error hover:bg-error'
        },
        fetch: async () => {
          await UserService.cancelDeletion()

          updateUser({
            isDeletionScheduled: false,
            deletionScheduledAt: 0
          })
        }
      })
    }
  }, [user.deletionScheduledAt, user.isDeletionScheduled])

  return <>{children}</>
}

const INVITATION_URL_REGEX = /\/workspace\/[^\/]+\/invitation\/[^\/]+/i

export const WorkspaceGuard: FC<LayoutProps> = ({ options, children }) => {
  const { t } = useTranslation()

  const router = useRouter()
  const location = useLocation()
  const { redirect_uri } = useQuery()
  const { workspaceId, projectId } = useParam()

  const {
    workspaces: wsCache,
    workspace,
    project,
    currentWorkspaceId,
    setWorkspaces,
    selectWorkspace,
    selectProject
  } = useWorkspaceStore()

  const [isMounted, setMounted] = useState(false)

  async function fetch() {
    const result = await WorkspaceService.workspaces()

    setWorkspaces(result)

    // If users enter from the invitation link, they will be redirected to the invitation page
    // even if they don't have any workspaces.
    if (INVITATION_URL_REGEX.test(redirect_uri)) {
      return router.redirect(redirect_uri)
    }

    if (helper.isEmpty(result)) {
      return router.redirect('/workspace/create')
    }

    return result
  }

  useAsyncEffect(async () => {
    let workspaces = wsCache

    if (helper.isEmpty(wsCache)) {
      workspaces = await fetch()
    } else {
      fetch()
    }

    setMounted(true)

    if (options?.isHomePage) {
      if (helper.isValid(redirect_uri)) {
        return router.redirect(redirect_uri, {
          extend: false
        })
      }

      let workspaceId = workspaces[0].id

      if (helper.isValid(currentWorkspaceId)) {
        const index = workspaces.findIndex(w => w.id === currentWorkspaceId)

        if (index > -1) {
          workspaceId = currentWorkspaceId!
        }
      }

      // Navigate to last visited workspace
      router.replace(`/workspace/${workspaceId}/`)
    }
  }, [location])

  useEffect(() => {
    selectWorkspace(workspaceId)

    if (workspaceId) {
      let title = `${workspace?.name} - HeyForm`

      if (helper.isValid(options?.title)) {
        title = `${t(options!.title)} · ` + title
      }

      document.title = title
    }
  }, [options, selectWorkspace, t, workspace?.name, workspaceId])

  useEffect(() => {
    selectProject(projectId)

    if (projectId) {
      let title = `${workspace?.name}/${project?.name} - HeyForm`

      if (helper.isValid(options?.title)) {
        title = `${t(options!.title)} · ` + title
      }

      document.title = title
    }
  }, [options, project?.name, projectId, selectProject, t, workspace?.name])

  return (
    <LoginGuard>
      {isMounted && children}

      <UserAccountModal />
      <UserDeletionModal />
      <ChangePasswordModal />
      <UpgradeModal />
    </LoginGuard>
  )
}

const LayoutComponent: FC<LayoutProps> = ({ options, children }) => {
  const { t } = useTranslation()

  const { workspaceId } = useParam()
  const { openModal } = useAppStore()
  const { workspace, workspaces } = useWorkspaceStore()

  if (!workspaces.find(w => w.id === workspaceId)) {
    return (
      <AuthLayout>
        <div className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-semibold">{t('workspace.notExist')}</h1>
            <p className="flex items-center justify-center">
              <Link to="/" className="flex items-center gap-1 text-sm/6 hover:underline">
                <IconChevronLeft className="h-5 w-5" />
                <span>{t('workspace.backHome')}</span>
              </Link>
            </p>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <>
      <div
        className={cn(
          'relative isolate flex min-h-svh w-full bg-foreground max-lg:flex-col lg:bg-background',
          {
            '[&_[data-slot=layout-main]]:pt-16 [&_[data-slot=layout-main]]:lg:pt-16 [&_[data-slot=layout-sidebar]]:top-16':
              workspace?.subscription?.trialing
          },
          options?.className
        )}
      >
        {workspace?.subscription?.trialing && (
          <div className="fixed left-0 right-0 top-0 flex h-[3.875rem] items-center justify-center p-2">
            <div className="flex h-full w-full items-center justify-center gap-x-2 rounded-lg bg-yellow-100 py-1 text-sm/6">
              <IconDiamond className="h-5 w-5 text-yellow-700" />
              <span>
                {t('billing.upgrade.trialTip', {
                  name: workspace.plan?.name,
                  count: unixDate(workspace.trialEndAt).diff(dayjs(), 'day')
                })}
              </span>
              <Button size="sm" className="ml-3" onClick={() => openModal('UpgradeModal')}>
                {t('billing.payment.confirm')}
              </Button>
            </div>
          </div>
        )}

        <WorkspaceSidebar />

        <main
          className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pl-64 lg:pr-2 lg:pt-2"
          data-slot="layout-main"
        >
          <div
            className="grow p-6 lg:rounded-lg lg:bg-foreground lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-accent-light dark:lg:ring-input"
            data-slot="layout-container"
          >
            <div className="mx-auto flex min-h-full max-w-6xl flex-col" data-slot="layout-inner">
              <div className="mb-6 flex items-center justify-between lg:hidden">
                <Button.Link
                  size="md"
                  className="-ml-2"
                  iconOnly
                  onClick={() => openModal('WorkspaceSidebarModal')}
                >
                  <IconMenu />
                </Button.Link>

                <WorkspaceAccount
                  className="!p-0 hover:!bg-transparent hover:!outline-none [&_[data-slot=avatar]]:h-9 [&_[data-slot=avatar]]:w-9"
                  containerClassName="!p-0 border-none flex items-center"
                  isNameVisible={false}
                />
              </div>

              {children}
            </div>
          </div>
        </main>
      </div>

      {window.heyform.device.mobile && <WorkspaceSidebarModal />}
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <DeleteProjectModal />
      <PaymentModal />
    </>
  )
}

export const WorkspaceLayout: FC<LayoutProps> = ({ options, children }) => (
  <WorkspaceGuard options={options}>
    <LayoutComponent options={options}>{children}</LayoutComponent>
  </WorkspaceGuard>
)
