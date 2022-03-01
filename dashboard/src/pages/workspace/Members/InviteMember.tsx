import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Button, Form, Input, Modal, notification, useForm } from '@heyforms/ui'
import { unixDate } from '@hpnp/utils'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export const InviteMember: FC<IModalProps> = observer(({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const [form] = useForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleFinish(values: any) {
    const emails = values.emails.filter((e: string) => isValid(e))

    if (isEmpty(emails)) {
      setError(new Error('Please enter at least one valid email address'))
      return
    }

    setLoading(true)

    try {
      await WorkspaceService.sendInvites(workspaceId, emails)
      form.resetFields()

      notification.success({
        title: 'Invitations have been sent'
      })
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            Invite members to <span>{workspaceStore.project?.name}</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            You can invite members to join the workspace by sending emails below. The invitation
            expires on{' '}
            <span className="text-gray-700">
              {unixDate(workspaceStore.workspace.inviteCodeExpireAt || 0).format('MMMM DD, YYYY')}
            </span>
            .
          </p>
        </div>

        <Form
          initialValues={{
            emails: ['', '', '']
          }}
          form={form}
          onFinish={handleFinish}
        >
          <Form.List name="emails">
            {(fields, { add }) => {
              function handleAdd() {
                add('')
              }

              return (
                <div>
                  {fields.map(field => (
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          type: 'email',
                          required: false,
                          message: 'Invalid email address'
                        }
                      ]}
                    >
                      <Input placeholder="name@example.com" />
                    </Form.Item>
                  ))}

                  <div className="flex items-center justify-between">
                    <Button.Link onClick={handleAdd}>Add more</Button.Link>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Send Invitations
                    </Button>
                  </div>

                  {error && <div className="form-item-error">{error.message}</div>}
                </div>
              )
            }}
          </Form.List>
        </Form>
      </div>
    </Modal>
  )
})
