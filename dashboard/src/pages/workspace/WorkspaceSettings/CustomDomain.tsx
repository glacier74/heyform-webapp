import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import isFQDN from 'validator/lib/isFQDN'

import { PlanCheck, SwitchField } from '@/components'
import { PlanGradeEnum } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam, useVisible } from '@/utils'

interface CustomDomainModalProps extends IModalProps {
  domain?: string
}

const CustomDomainModal: FC<CustomDomainModalProps> = ({ visible, domain, onClose }) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const timerRef = useRef<any>()
  const { t } = useTranslation()

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
          title: t('workspace.settings.domainUp')
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
          <h1 className="text-lg font-medium leading-6 text-slate-900">
            {t('workspace.settings.customDomain')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {t('workspace.settings.domainExplain')}{' '}
            <a href="https://heyform.net/help" className="text-slate-900 hover:underline">
              {t('workspace.settings.domainLink')}
            </a>
            .
          </p>
        </div>

        <div>
          <table className="mt-8 table">
            <thead className="table-head">
              <tr>
                <th>{t('workspace.settings.type')}</th>
                <th>{t('workspace.settings.domainName')}</th>
                <th>{t('workspace.settings.content')}</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <td>{t('workspace.settings.cname')}</td>
                <td>{domain}</td>
                <td>{import.meta.env.VITE_CUSTOM_DOMAIN_CNAME_PROXY}</td>
              </tr>
            </tbody>
          </table>

          <Button className="mt-4" type="primary" loading={true} disabled={true}>
            {t('workspace.settings.domainChecking')}...
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
  const { t } = useTranslation()

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
        title: t('workspace.settings.domainUp')
      })
    }

    setDomain(values.domain)
    handleOpen()
  }

  return (
    <div>
      <PlanCheck permission={PlanGradeEnum.PREMIUM}>
        <SwitchField
          label={t('workspace.settings.customDomain')}
          description={
            <>
              {t('workspace.settings.domainExplain2')}{' '}
              <a href="https://heyform.net/help" className="text-slate-900 hover:underline">
                {t('workspace.settings.domainLink')}
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
            submitText={t('workspace.settings.up')}
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
                  message: t('workspace.settings.invalid')
                }
              ]}
            >
              <Input placeholder={t('workspace.settings.domain')} />
            </Form.Item>
          </Form.Custom>
        )}
      </div>

      <CustomDomainModal visible={visible} domain={domain} onClose={handleClose} />
    </div>
  )
})
