import { Button, Form, Input, Modal, Tooltip, notification } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import isFQDN from 'validator/lib/isFQDN'

import {PlanBadge, PlanCheck, SwitchField} from '@/components'
import { PlanGradeEnum } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { getDomainName, isRootDomain, useParam, useVisible } from '@/utils'

interface CustomDomainModalProps extends IModalProps {
  domain?: string
}

const CustomDomainModal: FC<CustomDomainModalProps> = ({ visible, domain, onClose }) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleAddDomain() {
    if (!domain) {
      return
    }

    setError(null)
    setLoading(true)

    try {
      const result = await WorkspaceService.addCustomDomain(workspaceId, domain!)

      if (result) {
        workspaceStore.updateWorkspace(workspaceId, {
          customDomain: domain
        })

        // Close modal
        onClose?.()

        setLoading(false)

        return notification.success({
          title: t('workspace.settings.domainUp')
        })
      } else {
        setError(new Error(t('workspace.settings.dnsError')))
      }
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal contentClassName="max-w-3xl" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg font-medium leading-6 text-slate-900">
            {t('workspace.settings.customDomain')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {t('workspace.settings.domainExplain')}{' '}
            <a href="https://docs.heyform.net" className="text-slate-900 hover:underline">
              {t('workspace.settings.domainLink')}
            </a>
            .
          </p>
        </div>

        <div className="text-sm text-slate-500">
          <Trans
            i18nKey="workspace.settings.dnsTip2"
            t={t}
            components={{
              a: (
                <a
                  href="https://dnschecker.org/all-dns-records-of-domain.php"
                  className="text-slate-900 underline"
                  target="_blank"
                />
              )
            }}
          />
        </div>

        <div>
          <table className="mt-8 table">
            <thead className="table-head">
              <tr>
                <th>{t('workspace.settings.type')}</th>
                <th>{t('workspace.settings.domainName')}</th>
                <th>{t('workspace.settings.content')}</th>
                <th>{t('workspace.settings.ttl')}</th>
                <th>{t('workspace.settings.proxyStatus')}</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <td>
                  {isRootDomain(domain as string)
                    ? t('workspace.settings.aname')
                    : t('workspace.settings.cname')}
                </td>
                <td>{getDomainName(domain as string)}</td>
                <td>
                  {isRootDomain(domain as string)
                    ? import.meta.env.VITE_CUSTOM_DOMAIN_ANAME_PROXY
                    : import.meta.env.VITE_CUSTOM_DOMAIN_CNAME_PROXY}
                </td>
                <td>{t('workspace.settings.ttlAuto')}</td>
                <td>
                  <Tooltip
                    ariaLabel={
                      <div className="h-auto w-56 whitespace-pre-line p-1 text-left">
                        {t('workspace.settings.dnsTip')}
                      </div>
                    }
                  >
                    <span className="underline">{t('workspace.settings.dnsOnly')}</span>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </table>

          <Button className="mt-4" type="primary" loading={loading} onClick={handleAddDomain}>
            {t('workspace.settings.save')}
          </Button>

          {error && <div className="form-item-error">{error.message}</div>}
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
    setDomain(values.domain)
    handleOpen()
  }

  return (
    <div>
      <PlanCheck permission={PlanGradeEnum.PREMIUM} isBadgeShow={false}>
        <SwitchField
          label={
            <div className="flex items-center gap-2">
              <span>{t('workspace.settings.customDomain')}</span>
              <PlanBadge permission={PlanGradeEnum.PREMIUM} />
            </div>
          }
          description={
            <>
              {t('workspace.settings.domainExplain2')}{' '}
              <a href="https://docs.heyform.net" className="text-slate-900 hover:underline">
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
