import { LayoutProps } from '@heyooo-inc/react-router'
import { IconChevronLeft } from '@tabler/icons-react'
import { useRequest } from 'ahooks'
import { FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import IconLink from '@/assets/link.svg?react'
import { Button, Skeleton, useAlert } from '@/components'
import { FormService } from '@/services'
import { useFormStore, useWorkspaceStore } from '@/store'
import { cn, timeFromNow, useParam, useRouter } from '@/utils'

import { WorkspaceLayout } from '../Workspace'

export const FormLayout: FC<LayoutProps> = ({ options, children }) => {
  const { t, i18n } = useTranslation()

  const alert = useAlert()
  const router = useRouter()
  const { workspaceId, projectId, formId } = useParam()
  const { project, sharingURLPrefix } = useWorkspaceStore()
  const { form, setForm } = useFormStore()

  const navigations = useMemo(
    () => [
      {
        value: 'analytics',
        label: t('form.analytics.title'),
        to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/analytics`
      },
      {
        value: 'submissions',
        label: t('form.submissions.title'),
        to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/submissions`
      },
      {
        value: 'integrations',
        label: t('form.integrations.title'),
        to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/integrations`
      },
      {
        value: 'share',
        label: t('form.share.title'),
        to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/share`
      },
      {
        value: 'settings',
        label: t('form.settings.title'),
        to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/settings`
      }
    ],
    [formId, projectId, workspaceId, t]
  )

  const { loading } = useRequest(
    async () => {
      setForm(await FormService.detail(formId))
    },
    {
      refreshDeps: [formId]
    }
  )

  function handleEdit() {
    router.push(`/workspace/${workspaceId}/project/${projectId}/form/${formId}/create`)
  }

  useEffect(() => {
    if (form?.suspended) {
      alert({
        title: t('form.suspend.headline'),
        description: t('form.suspend.subHeadline'),
        contentProps: {
          onPointerDownOutside: e => e.preventDefault(),
          onEscapeKeyDown: e => e.preventDefault(),
          onInteractOutside: e => e.preventDefault()
        },
        confirmProps: {
          label: t('form.suspend.contactUs')
        },
        onConfirm() {
          window.location.href = 'https://heyform.net/f/E4MKK2hx'
        }
      })
    }
  }, [form?.suspended])

  return (
    <WorkspaceLayout options={options}>
      {/* Back to project */}
      <div className="max-lg:hidden">
        <Link
          className="-ml-[0.15rem] inline-flex items-center gap-2 text-sm/6 text-secondary hover:text-primary"
          to={`/workspace/${workspaceId}/project/${projectId}/`}
        >
          <IconChevronLeft className="h-4 w-4" />
          <span>{project?.name}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:flex-1">
          <Skeleton
            className="h-8 [&_[data-slot=skeleton]]:h-5 [&_[data-slot=skeleton]]:w-44 [&_[data-slot=skeleton]]:sm:h-6"
            loading={loading}
          >
            <h1 className="text-2xl/8 font-semibold sm:text-xl/8">{form?.name}</h1>
          </Skeleton>

          <Skeleton className="[&_[data-slot=skeleton]]:w-64" loading={loading}>
            <div className="text-sm/6 text-secondary">
              {t('form.metadata', {
                count: form?.submissionCount || 0,
                date: timeFromNow(form?.updatedAt || 0, i18n.language)
              })}
            </div>
          </Skeleton>
        </div>

        <div className="flex items-center gap-2 sm:flex-row">
          <Button.Copy
            size="md"
            className="order-last sm:order-first"
            text={`${sharingURLPrefix}/f/${formId}`}
            label={t('form.copyLinkToShare')}
            icon={<IconLink className="h-5 w-5" />}
          />

          {/* Go to form edit page */}
          <Button size="md" onClick={handleEdit}>
            {t('form.editForm')}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-5 overflow-x-auto">
        <div className="border-b border-accent-light">
          <nav className="flex items-center gap-6 text-sm font-medium text-secondary">
            {navigations.map(n => (
              <NavLink
                key={n.value}
                className={({ isActive }) =>
                  cn('text-nowrap py-3 hover:text-primary', {
                    'relative text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary':
                      isActive
                  })
                }
                to={n.to}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {children}
    </WorkspaceLayout>
  )
}
