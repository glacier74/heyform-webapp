import { SwitchField } from '@/components'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Button, Form, Input } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export const Branding: FC = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<Error | null>(null)

  const [switchLoading, setSwitchLoading] = useState(false)
  const [switchError, setSwitchError] = useState<Error | null>(null)

  async function handleFinish(values: IMapType) {
    setFormLoading(true)
    setFormError(null)

    try {
      await WorkspaceService.update({
        teamId: workspaceId,
        name: values.name
      })

      workspaceStore.updateWorkspace(workspaceId, {
        name: values.name
      })
    } catch (err: any) {
      setFormError(err)
    }

    setFormLoading(false)
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
      <Form
        className="form-inline"
        initialValues={{
          name: workspaceStore.workspace?.name
        }}
        onFinish={handleFinish}
      >
        <Form.Item name="name" label="Workspace name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Button className="mt-6 ml-3" htmlType="submit" loading={formLoading}>
          Update
        </Button>

        {formError && <div className="form-item-error">{formError.message}</div>}
      </Form>

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

      {switchError && <div className="form-item-error">{switchError.message}</div>}
    </div>
  )
})
