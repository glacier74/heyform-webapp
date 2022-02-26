import type { GroupModel } from '@/models'
import { AudienceService } from '@/service'
import { useParam } from '@/utils'
import { Form, Input, Modal, notification } from '@heyforms/ui'
import type { FC } from 'react'

interface RenameGroupProps extends IModalProps {
  group?: GroupModel | null
}

const RenameGroup: FC<RenameGroupProps> = ({ visible, group, onClose }) => {
  const { workspaceId } = useParam()

  async function handleFinish(values: any) {
    await AudienceService.updateGroup({
      teamId: workspaceId,
      groupId: group!.id,
      ...values
    })

    notification.success({
      title: 'Group has been updated'
    })

    onClose?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Rename group</h1>
        </div>

        <Form.Custom
          initialValues={group as any}
          submitText="Update"
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

export default RenameGroup
