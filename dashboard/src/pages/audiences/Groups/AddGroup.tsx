import { AudienceService } from '@/service'
import { useParam } from '@/utils'
import { Form, Input, Modal, notification } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

const AddGroup: FC<IModalProps> = ({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()

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
          <h1 className="text-lg leading-6 font-medium text-gray-900">{t('audiences.groups.addGroup.add')}</h1>
          <p className="mt-1 mr-8 text-sm text-gray-500">
           {t('audiences.groups.addGroup.explain')}
          </p>
        </div>

        <Form.Custom
          submitText={t('audiences.groups.addGroup.add')}
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="name"
            label= {t('audiences.groups.addGroup.Gname')}
            rules={[
              {
                required: true,
                message: t('audiences.groups.addGroup.groupNottempty')
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
