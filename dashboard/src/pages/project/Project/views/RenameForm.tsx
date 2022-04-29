import { FormService } from '@/service'
import { useStore } from '@/store'
import { FormModel } from '@heyforms/shared-types-enums'
import { Form, Input, Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface RenameFormProps extends IModalProps {
  form?: FormModel | null
}

export const RenameForm: FC<RenameFormProps> = ({ visible, form, onClose }) => {
  const workspaceStore = useStore('workspaceStore')
  const { t } = useTranslation()

  async function handleUpdate(values: any) {
    await FormService.update(form!.id, values)
    workspaceStore.updateForm(form!.projectId, form!.id, values)
    onClose?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">{t('project.renameForm')}</h1>
        </div>

        <Form.Custom
          initialValues={{
            name: form?.name
          }}
          submitText={t('project.update')}
          submitOptions={{
            type: 'primary'
          }}
          onlySubmitOnValueChange={true}
          request={handleUpdate}
        >
          <Form.Item name="name" label={t('project.formName')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}
