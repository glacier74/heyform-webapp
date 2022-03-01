import type { GroupModel } from '@/models'
import { AudienceService } from '@/service'
import { useAsyncEffect, useParam } from '@/utils'
import { Form, Input, Modal, notification, Select } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'

const AddContact: FC<IModalProps> = ({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const [groups, setGroups] = useState<GroupModel[]>([])

  async function handleFinish(values: any) {
    await AudienceService.createContact({
      teamId: workspaceId,
      ...values
    })

    notification.success({
      title: 'Contact has been created'
    })

    onClose?.()
  }

  async function handleCreateGroup(name: string) {
    const result = await AudienceService.createGroup({
      teamId: workspaceId,
      name
    })

    setGroups([
      ...groups,
      {
        id: result,
        name
      }
    ])

    return result
  }

  useAsyncEffect(async () => {
    const result = await AudienceService.groups({
      teamId: workspaceId,
      page: 1,
      limit: 0
    })
    setGroups(result.groups)
  }, [workspaceId])

  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Add contact</h1>
          <p className="mt-1 mr-8 text-sm text-gray-500">
            Add people who needs to take part in the survey or data collection.
          </p>
        </div>

        <Form.Custom
          submitText="Add contact"
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="groupIds"
            label="Groups"
            rules={[
              {
                required: true,
                type: 'array',
                message: 'Select at least one group or create a new one'
              }
            ]}
          >
            <Select.Multiple
              options={groups as any}
              labelKey="name"
              valueKey="id"
              createOptionLeading="Create new group"
              createRequest={handleCreateGroup}
            />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Full name"
            rules={[
              {
                required: true,
                message: "Full name can't be empty"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Invalid email address'
              }
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={
              <>
                Phone number <span className="text-gray-500 text-sm">(optional)</span>
              </>
            }
            rules={[
              {
                required: false,
                message: "Phone number can't be empty"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="jobTitle"
            label={
              <>
                Job title <span className="text-gray-500 text-sm">(optional)</span>
              </>
            }
            rules={[
              {
                required: false,
                message: "Job title can't be empty"
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

export default AddContact