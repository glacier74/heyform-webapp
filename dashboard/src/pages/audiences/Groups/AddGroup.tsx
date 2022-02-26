import { AudienceService } from '@/service'
import { useParam } from '@/utils'
import { Form, Input, Modal, notification } from '@heyforms/ui'
import type { FC } from 'react'

const AddGroup: FC<IModalProps> = ({ visible, onClose }) => {
  const { workspaceId } = useParam()

  async function handleFinish(values: any) {
    await AudienceService.createGroup({
      teamId: workspaceId,
      ...values
    })

    notification.success({
      title: 'Group has been created'
    })

    onClose?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Add group</h1>
          <p className="mt-1 mr-8 text-sm text-gray-500">
            You can organize your contacts into groups to work with them more easily.
          </p>
          <p className="mt-1 mr-8 text-sm text-gray-500">
            For example, if you regularly email people in a school group or on your cycling team,
            you can create a group and address your email to the group instead of each person.
          </p>
        </div>

        <Form.Custom
          submitText="Add group"
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="name"
            label="Group name"
            rules={[
              {
                required: true,
                message: "Group name can't be empty"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export default AddGroup
