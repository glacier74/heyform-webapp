import { PlanCheck, SwitchField } from '@/components'
import { PlanGradeEnum } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Form, Input } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export const Branding: FC = observer(() => {
  const { workspaceId } = useParam()
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
      <Form.Custom
        inline
        initialValues={{
          name: workspaceStore.workspace?.name
        }}
        submitText="Update"
        submitOptions={{
          className: 'mt-6 ml-3'
        }}
        onlySubmitOnValueChange={true}
        request={handleFinish}
      >
        <Form.Item name="name" label="Workspace name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form.Custom>

      <PlanCheck permission={PlanGradeEnum.BUSINESS}>
        <SwitchField
          className="mt-6"
          label="Remove HeyForm branding"
          description={
            <>
              To make HeyForm feel like it's completely owned by your brand, remove the HeyForm Logo
              in the form footer.{' '}
              <a href="https://help.heyform.net" className="text-gray-900 hover:underline">
                Learn more about remove branding in docs
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
