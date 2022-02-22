import { SwitchField } from '@/components'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Form, Input } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import isFQDN from 'validator/lib/isFQDN'

export const CustomDomain: FC = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [switchLoading, setSwitchLoading] = useState(false)
  const [switchError, setSwitchError] = useState<Error | null>(null)

  async function handleChange(enableCustomDomain: boolean) {
    setSwitchLoading(true)
    setSwitchError(null)

    try {
      await WorkspaceService.update({
        teamId: workspaceId,
        enableCustomDomain
      })

      workspaceStore.updateWorkspace(workspaceId, {
        enableCustomDomain
      })
    } catch (err: any) {
      setSwitchError(err)
    }

    setSwitchLoading(false)
  }

  async function handleFinish(values: IMapType) {
    console.log(values)
  }

  return (
    <div>
      <SwitchField
        label="Custom domain"
        description={
          <>
            Custom domains allow you to make form accessible at your own, non-HeyForm domain names.{' '}
            <a href="https://help.heyform.net" className="text-gray-900 hover:underline">
              Learn more about custom domain in docs
            </a>
            .
          </>
        }
        loading={switchLoading}
        value={workspaceStore.workspace?.enableCustomDomain}
        onChange={handleChange}
      />
      {switchError && <div className="form-item-error">{switchError.message}</div>}

      <div>
        {workspaceStore.workspace?.enableCustomDomain && (
          <Form.Custom
            inline
            initialValues={{
              hostname: workspaceStore.workspace?.customHostnames?.[0]?.hostname
            }}
            submitText="Update"
            submitOptions={{
              className: 'mt-1 ml-3'
            }}
            onlySubmitOnValueChange={true}
            request={handleFinish}
          >
            <Form.Item
              name="hostname"
              rules={[
                {
                  validator: async (rule, value) => {
                    if (!isFQDN(value)) {
                      throw new Error(rule.message as string)
                    }
                  },
                  message: 'Invalid domain name'
                }
              ]}
            >
              <Input placeholder="eg: example.com" />
            </Form.Item>
          </Form.Custom>
        )}
      </div>
    </div>
  )
})
