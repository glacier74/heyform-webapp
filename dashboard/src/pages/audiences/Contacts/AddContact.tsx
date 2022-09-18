import type { GroupModel } from '@/models'
import { AudienceService } from '@/service'
import { useAsyncEffect, useParam } from '@/utils'
import { Form, Input, Modal, notification, Select } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AddContact: FC<IModalProps> = ({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const [groups, setGroups] = useState<GroupModel[]>([])
  const { t } = useTranslation()

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
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {t('audiences.contact.addContact.add')}
          </h1>
          <p className="mt-1 mr-8 text-sm text-slate-500">
            {t('audiences.contact.addContact.addPeople')}
          </p>
        </div>

        <Form.Custom
          submitText={t('audiences.contact.addContact.add')}
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="groupIds"
            label={t('audiences.contact.addContact.groups')}
            rules={[
              {
                required: true,
                type: 'array',
                message: t('audiences.contact.addContact.selectGroup')
              }
            ]}
          >
            <Select.Multiple
              options={groups as any}
              labelKey="name"
              valueKey="id"
              searchPlaceholder={t('audiences.contact.addContact.findGroup')}
              createOptionLeading={t('audiences.contact.addContact.createGroup')}
              createRequest={handleCreateGroup}
            />
          </Form.Item>
          <Form.Item
            name="fullName"
            label={t('audiences.contact.addContact.fullName')}
            rules={[
              {
                required: true,
                message: t('audiences.contact.addContact.notEmpty')
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('login.Email')}
            rules={[
              {
                required: true,
                type: 'email',
                message: t('audiences.contact.addContact.invalidEmail')
              }
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={
              <>
                {t('audiences.contact.addContact.phoneNumber')}{' '}
                <span className="text-slate-500 text-sm">
                  ({t('audiences.contact.addContact.optional')})
                </span>
              </>
            }
            rules={[
              {
                required: false,
                message: t('audiences.contact.addContact.phoneNotEmpty')
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="jobTitle"
            label={
              <>
                {t('audiences.contact.addContact.jobTitle')}{' '}
                <span className="text-slate-500 text-sm">
                  ({t('audiences.contact.addContact.optional')})
                </span>
              </>
            }
            rules={[
              {
                required: false,
                message: t('audiences.contact.addContact.jobNotEmpty')
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
