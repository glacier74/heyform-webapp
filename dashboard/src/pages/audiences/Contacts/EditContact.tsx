import type { ContactModel, GroupModel } from '@/models'
import { AudienceService } from '@/service'
import { useAsyncEffect, useParam } from '@/utils'
import { Form, Input, Modal, notification, Select, useForm } from '@heyforms/ui'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface EditContactProps extends IModalProps {
  contact?: ContactModel | null
}

const EditContact: FC<EditContactProps> = ({ visible, contact, onClose }) => {
  const { workspaceId } = useParam()
  const [form] = useForm()
  const [groups, setGroups] = useState<GroupModel[]>([])
  const { t } = useTranslation()


  async function handleFinish(values: any) {
    await AudienceService.updateContact({
      teamId: workspaceId,
      contactId: contact!.id,
      ...values
    })

    notification.success({
      title: 'Contact has been updated'
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

  useEffect(() => {
    if (contact) {
      form.setFieldsValue({
        ...contact,
        groupIds: contact.groups?.map(g => g.id)
      })
      form.resetFields()
    }
  }, [contact])

  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">{t('audiences.contact.editContact.detail')}</h1>
        </div>

        <Form.Custom
          form={form}
          initialValues={{
            ...contact,
            groupIds: contact?.groups?.map(g => g.id)
          }}
          submitText={t('update')}
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
                message: t('audiences.contact.editContact.selectGroup')
              }
            ]}
          >
            <Select.Multiple
              options={groups as any}
              labelKey="name"
              valueKey="id"
              createOptionLeading={t('audiences.contact.addContact.createGroup')}
              createRequest={handleCreateGroup}
            />
          </Form.Item>
          <Form.Item
            name="fullName"
            label={t('audiences.contact.editContact.name')}
            rules={[
              {
                required: true,
                message: t('audiences.contact.editContact.nameNotempty')
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="email"
            label={t('auto.signup.Email')}
            rules={[
              {
                required: true,
                type: 'email',
                message: t('auto.signup.invalidEmail')
              }
            ]}
          >
            <Input type="email"/>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={
              <>
                {t('audiences.contact.addContact.phnoeNumber')}<span
                className="text-gray-500 text-sm">({t('audiences.contact.addContact.optional')})</span>
              </>
            }
            rules={[
              {
                required: false,
                message: t('audiences.contact.editContact.phoneNottempty')
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="jobTitle"
            label={
              <>
                {t('audiences.contact.addContact.jobTitle')} <span
                className="text-gray-500 text-sm">({t('audiences.contact.addContact.optional')})</span>
              </>
            }
            rules={[
              {
                required: false,
                message: t('audiences.contact.addContact.jobNotempty')
              }
            ]}
          >
            <Input/>
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export default EditContact
