import type { GroupModel } from '@/models'
import { AudienceService } from '@/service'
import { useParam } from '@/utils'
import { Form, Input, Modal, notification } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface RenameGroupProps extends IModalProps {
  group?: GroupModel | null
}

const RenameGroup: FC<RenameGroupProps> = ({ visible, group, onClose }) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()

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
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {t('audiences.groups.renameGroup.rename')}
          </h1>
        </div>

        <Form.Custom
          initialValues={group as any}
          submitText={t('audiences.groups.renameGroup.up')}
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="name"
            label={t('audiences.groups.addGroup.GroupName')}
            rules={[
              {
                required: true,
                message: t('audiences.groups.addGroup.groupNotEmpty')
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
