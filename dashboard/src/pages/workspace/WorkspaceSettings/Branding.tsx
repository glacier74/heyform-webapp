import { CopyButton, PlanCheck, SwitchField } from '@/components'
import { PlanGradeEnum } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Form, Input } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Branding: FC = observer(() => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')

  const [switchLoading, setSwitchLoading] = useState(false)
  const [switchError, setSwitchError] = useState<Error | null>(null)

  async function handleFinish(values: IMapType) {
    await WorkspaceService.update({
      teamId: workspaceId,
      name: values.name
    })

    workspaceStore.updateWorkspace(workspaceId, {
      name: values.name
    })
  }

  async function handleChange(removeBranding: boolean) {
    setSwitchLoading(true)
    setSwitchError(null)

    try {
      await WorkspaceService.update({
        teamId: workspaceId,
        removeBranding
      })

      workspaceStore.updateWorkspace(workspaceId, {
        removeBranding
      })
    } catch (err: any) {
      setSwitchError(err)
    }

    setSwitchLoading(false)
  }

  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 block text-sm font-medium text-gray-700">
          {t('workspace.settings.id')}
        </div>
        <div className="flex items-center">
          <span className="text-sm">{workspaceStore.workspace?.id}</span>
          <CopyButton className="ml-2 text-blue-700" text={workspaceStore.workspace?.id} />
        </div>
      </div>

      <Form.Custom
        inline
        initialValues={{
          name: workspaceStore.workspace?.name
        }}
        submitText={t('workspace.settings.up')}
        submitOptions={{
          className: 'mt-6 ml-3'
        }}
        onlySubmitOnValueChange={true}
        request={handleFinish}
      >
        <Form.Item name="name" label={t('workspace.settings.nameW')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form.Custom>

      <PlanCheck permission={PlanGradeEnum.PREMIUM}>
        <SwitchField
          className="mt-6"
          label={t('workspace.settings.removeBranding')}
          description={
            <>
              {t('workspace.settings.brandingExplain')}{' '}
              <a href="https://help.heyform.net" className="text-gray-900 hover:underline">
                {t('workspace.settings.learnMore')}
              </a>
              .
            </>
          }
          loading={switchLoading}
          value={workspaceStore.workspace?.removeBranding}
          onChange={handleChange}
        />
      </PlanCheck>

      {switchError && <div className="form-item-error">{switchError.message}</div>}
    </div>
  )
})
