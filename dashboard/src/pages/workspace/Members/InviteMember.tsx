import { useStore } from '@/store'
import { Button, Form, Input } from '@heyforms/ui'
import { Modal } from '@heyforms/ui/src'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

export const InviteMember: FC<IModalProps> = observer(({ visible, onClose }) => {
  const workspaceStore = useStore('workspaceStore')

  return (
    <Modal wrapperClassName="max-w-md" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            Invite members to <span>{workspaceStore.project?.name}</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            You can invite members to join the workspace by sending emails below. The invitation
            expires on <span className="text-gray-700">2022-02-22 17:00</span>.
          </p>
        </div>

        <Form
          initialValues={{
            emails: ['', '', '']
          }}
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
                    <Button type="primary" htmlType="submit">
                      Send Invitations
                    </Button>
                  </div>
                </div>
              )
            }}
          </Form.List>
        </Form>
      </div>
    </Modal>
  )
})
