import { SwitchField } from '@/components'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam, useVisible } from '@/utils'
import type { CF_DnsRecord } from '@heyforms/shared-types-enums'
import { Badge, Button, Form, Input, Modal, notification, Table } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/lib/types/table'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useRef, useState } from 'react'
import isFQDN from 'validator/lib/isFQDN'

interface CustomDomainDnsRecord extends CF_DnsRecord {
  isActive?: boolean
}

interface CustomDomainModalProps extends IModalProps {
  hostname?: string
  dnsRecords?: CustomDomainDnsRecord[]
}

const CustomDomainModal: FC<CustomDomainModalProps> = ({
  visible,
  hostname,
  dnsRecords: rawDnsRecords = [],
  onClose
}) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const [dnsRecords, setDnsRecords] = useState<CustomDomainDnsRecord[]>([])
  const isFirstRender = useRef(true)

  async function checkDnsRecords() {
    if (!hostname) {
      return
    }

    try {
      const result = await WorkspaceService.checkCustomHostname(workspaceId, hostname!)

      if (result.active) {
        workspaceStore.updateWorkspace(workspaceId, {
          customHostnames: [
            {
              hostname: hostname!
            } as any
          ]
        })

        // Close modal
        onClose?.()

        return notification.success({
          title: 'Custom domain has been updated'
        })
      }

      const newDnsRecords = dnsRecords.map(record => {
        switch (record.type) {
          case 'CNAME':
            record.isActive = result.ownership
            break

          case 'TXT':
            record.isActive = result.ssl
            break
        }

        return record
      })

      setDnsRecords(newDnsRecords)
    } catch (err: any) {
      console.error(err)
    }

    setTimeout(() => {
      checkDnsRecords()
    }, 2_000)
  }

  useEffect(() => {
    setDnsRecords((rawDnsRecords as any) || [])
  }, [rawDnsRecords])

  useEffect(() => {
    if (dnsRecords.length > 0 && isFirstRender.current) {
      checkDnsRecords()
    }
    isFirstRender.current = false
  }, [dnsRecords, hostname])

  // Table columns
  const columns: TableColumn<CustomDomainDnsRecord>[] = [
    {
      key: 'type',
      name: 'Type'
    },
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'value',
      name: 'Content'
    },
    {
      key: 'active',
      name: 'Status',
      render(record) {
        return record.isActive ? (
          <Badge type="green" text="Active" dot />
        ) : (
          <Badge type="red" text="Pending" dot />
        )
      }
    }
  ]

  return (
    <Modal contentClassName="max-w-4xl" visible={visible} onClose={onClose} showCloseIcon>
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
          <Table<CF_DnsRecord> className="mt-8" columns={columns} data={dnsRecords} />

          <Button className="mt-4" block={true} loading={true} disabled={true}>
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
  const [hostname, setHostname] = useState<string>()
  const [dnsRecords, setDnsRecords] = useState<CustomDomainDnsRecord[]>([])

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
    const result = await WorkspaceService.addCustomHostname(workspaceId, values.hostname)

    if (result.status === 'active') {
      return notification.success({
        title: 'Custom domain has been updated'
      })
    }

    setHostname(values.hostname)
    setDnsRecords(result.dnsRecords)
    handleOpen()
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

      <CustomDomainModal
        visible={visible}
        hostname={hostname}
        dnsRecords={dnsRecords}
        onClose={handleClose}
      />
    </div>
  )
})
