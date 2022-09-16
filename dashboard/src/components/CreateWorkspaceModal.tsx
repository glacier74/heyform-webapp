import { PhotoPickerField } from '@/components'
import { WorkspaceModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useRouter } from '@/utils'
import { Button, Form, Input, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CreateWorkspaceModal: FC<IModalProps> = observer(({ visible, onClose }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const workspaceStore = useStore('workspaceStore')

  const [maskClosable, setMaskClosable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleFinish(values: WorkspaceModel) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const result = await WorkspaceService.create(values.name, values.avatar)

      // Fetch the latest workspaces
      const workspaces = await WorkspaceService.workspaces()
      workspaceStore.setWorkspaces(workspaces)

      // Hide the modal
      onClose?.()

      // Navigate to new created workspace page
      router.replace(`/workspace/${result}/trial`)
    } catch (err: any) {
      setLoading(false)
      setError(err)
    }
  }

  function handleVisibilityChange(newVal: boolean) {
    setMaskClosable(!newVal)
  }

  return (
    <Modal visible={visible} maskClosable={maskClosable} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            {t('workspace.createWorkspace.newWorkspace')}
          </h1>
          <p className="mt-1 mr-8 text-sm text-gray-500">{t('workspace.createWorkspace.text')}</p>
        </div>

        <Form onFinish={handleFinish}>
          <Form.Item
            name="name"
            label={t('workspace.createWorkspace.name')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="avatar"
            label={
              <>
                {t('workspace.createWorkspace.logo')}{' '}
                <span className="text-gray-500">
                  ({t('audiences.contact.addContact.optional')})
                </span>
              </>
            }
          >
            <PhotoPickerField onVisibilityChange={handleVisibilityChange} />
          </Form.Item>

          <Button className="w-full md:w-auto" type="primary" htmlType="submit" loading={loading}>
            {t('workspace.createWorkspace.create')}
          </Button>

          {error && <div className="form-item-error">{error.message}</div>}
        </Form>
      </div>
    </Modal>
  )
})

export default CreateWorkspaceModal
