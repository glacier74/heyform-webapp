import { PlanCheck, SwitchField } from '@/components'
import { PlanGradeEnum } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam, useVisible } from '@/utils'
import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import isFQDN from 'validator/lib/isFQDN'

interface CustomDomainModalProps extends IModalProps {
  domain?: string
}

const CustomDomainModal: FC<CustomDomainModalProps> = ({ visible, domain, onClose }) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const timerRef = useRef<any>()

  async function handleAddDomain() {
    if (!domain) {
      return
    }

    try {
      const result = await WorkspaceService.addCustomDomain(workspaceId, domain!)

      if (result) {
        workspaceStore.updateWorkspace(workspaceId, {
          customDomain: domain
        })

        // Close modal
        onClose?.()

        return notification.success({
          title: 'Custom domain has been updated'
        })
      }
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }
  }

  useEffect(() => {
    if (visible && domain) {
      timerRef.current = setInterval(handleAddDomain, 2_000)
    }

    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
  }, [visible])

  return (
    <Modal contentClassName="max-w-2xl" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Custom domain</h1>
          <p className="mt-1 text-sm text-gray-500">
            Custom domains allow you to make form accessible at your own, non-HeyForm domain names
            (for example, yourcustomdomain.com). HeyForm supports all top-level domains in custom
            domains.{' '}
            <a href="https://help.heyform.net" className="text-gray-900 hover:underline">
              Learn more about custom domains
            </a>
            .
          </p>
        </div>

        <div>
          <table className="table mt-8">
            <thead className="table-head">
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <td>CNAME</td>
                <td>{domain}</td>
                <td>{import.meta.env.VITE_CUSTOM_DOMAIN_CNAME_PROXY}</td>
              </tr>
            </tbody>
          </table>

          <Button className="mt-4" type="primary" loading={true} disabled={true}>
            Checking...
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const CustomDomain: FC = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [switchLoading, setSwitchLoading] = useState(false)
  const [switchError, setSwitchError] = useState<Error | null>(null)

  const [visible, handleOpen, handleClose] = useVisible()
  const [domain, setDomain] = useState<string>()

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
    const result = await WorkspaceService.addCustomDomain(workspaceId, values.domain)

    if (result) {
      workspaceStore.updateWorkspace(workspaceId, {
        customDomain: values.domain
      })

      return notification.success({
        title: 'Custom domain has been updated'
      })
    }

    setDomain(values.domain)
    handleOpen()
  }

  return (
    <div>
      <PlanCheck permission={PlanGradeEnum.PRO}>
        <SwitchField
          label="Custom domain"
          description={
            <>
              Custom domains allow you to make form accessible at your own, non-HeyForm domain
              names.{' '}
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
      </PlanCheck>
      {switchError && <div className="form-item-error">{switchError.message}</div>}

      <div>
        {workspaceStore.workspace?.enableCustomDomain && (
          <Form.Custom
            inline
            initialValues={{
              domain: workspaceStore.workspace?.customDomain
            }}
            submitText="Update"
            submitOptions={{
              className: 'mt-1 ml-3'
            }}
            onlySubmitOnValueChange={true}
            request={handleFinish}
          >
            <Form.Item
              name="domain"
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
              <Input placeholder="eg: yourcustomdomain.com" />
            </Form.Item>
          </Form.Custom>
        )}
      </div>

      <CustomDomainModal visible={visible} domain={domain} onClose={handleClose} />
    </div>
  )
})
