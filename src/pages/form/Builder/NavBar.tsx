import {
  IconChevronLeft,
  IconChevronRight,
  IconListDetails,
  IconPlayerPlay,
  IconSend2,
  IconSettings,
  IconShare
} from '@tabler/icons-react'
import { useRequest } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button, Tooltip, useToast } from '@/components'
import { FormService } from '@/services'
import { useAppStore, useFormStore, useWorkspaceStore } from '@/store'
import { useParam, useRouter } from '@/utils'

import WorkspaceAccount from '../../../layouts/Workspace/WorkspaceAccount'
import { useStoreContext } from './store'
import { getFilteredFields } from './utils'

export default function BuilderNavBar() {
  const { t } = useTranslation()

  const router = useRouter()
  const toast = useToast()

  const { workspaceId, projectId, formId } = useParam()
  const { openModal } = useAppStore()
  const { state } = useStoreContext()
  const { workspace, project } = useWorkspaceStore()
  const { form, updateForm } = useFormStore()

  const { loading, run } = useRequest(
    async () => {
      if (form?.version && form.version > 0) {
        await FormService.publishForm({
          formId,
          version: form.version as number,
          ...getFilteredFields(state.fields)
        })

        updateForm({
          canPublish: false
        })
      }
    },
    {
      manual: true,
      refreshDeps: [formId, state.fields, form?.version],
      onError: (err: Any) => {
        toast({
          title: t('components.error.title'),
          message: err.message
        })
      }
    }
  )

  function handlePreview() {
    openModal('PreviewModal')
  }

  function handleShare() {
    router.push(`/workspace/${workspaceId}/project/${projectId}/form/${formId}/share`)
  }

  function handleSettings() {
    router.push(`/workspace/${workspaceId}/project/${projectId}/form/${formId}/settings`)
  }

  return (
    <div className="flex h-14 items-center justify-between px-2">
      <nav aria-label="breadcrumb" className="flex">
        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-secondary">
          {window.heyform.device.mobile ? (
            <li className="text-primary">
              <Link
                role="link"
                aria-disabled="true"
                aria-current="page"
                className="flex items-center gap-x-2"
                to={`/workspace/${workspaceId}/project/${projectId}/`}
              >
                <IconChevronLeft className="h-5 w-5" />
                {form?.name}
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  to={`/workspace/${workspaceId}/`}
                >
                  {workspace?.name}
                </Link>
              </li>

              <li role="presentation" aria-hidden="true">
                <IconChevronRight className="h-3.5 w-3.5" />
              </li>

              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  to={`/workspace/${workspaceId}/project/${projectId}/`}
                >
                  {project?.name}
                </Link>
              </li>

              <li role="presentation" aria-hidden="true">
                <IconChevronRight className="h-3.5 w-3.5" />
              </li>

              <li className="text-primary">
                <span role="link" aria-disabled="true" aria-current="page" className="font-normal">
                  {form?.name}
                </span>
              </li>
            </>
          )}
        </ol>
      </nav>

      <div className="flex h-9 items-center gap-4">
        <div className="flex items-center gap-1">
          <Tooltip label={t('form.builder.preview.title')}>
            <Button.Link size="md" iconOnly onClick={handlePreview}>
              <IconPlayerPlay className="h-5 w-5" />
            </Button.Link>
          </Tooltip>

          <Button.Link
            className="block sm:hidden"
            size="md"
            iconOnly
            onClick={() => openModal('BuilderLeftSidebarModal')}
          >
            <IconListDetails className="h-5 w-5" />
          </Button.Link>

          <Tooltip label={t('form.share.title')}>
            <Button.Link className="hidden sm:block" size="md" iconOnly onClick={handleShare}>
              <IconShare className="h-5 w-5" />
            </Button.Link>
          </Tooltip>

          <Tooltip label={t('form.settings.title')}>
            <Button.Link className="hidden sm:block" size="md" iconOnly onClick={handleSettings}>
              <IconSettings className="h-5 w-5" />
            </Button.Link>
          </Tooltip>
        </div>

        <Button size="md" disabled={!form?.canPublish} loading={loading} onClick={run}>
          <IconSend2 className="h-5 w-5" />
          {t('components.publish')}
        </Button>

        <div className="hidden items-center gap-4 sm:flex">
          <div className="h-6 w-px bg-accent-light"></div>

          <WorkspaceAccount
            className="!p-0 hover:!bg-transparent hover:!outline-none [&_[data-slot=avatar]]:h-9 [&_[data-slot=avatar]]:w-9"
            containerClassName="!p-0 border-none flex items-center"
            isNameVisible={false}
          />
        </div>
      </div>
    </div>
  )
}
