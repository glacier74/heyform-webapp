import { PhotoPickerField } from '@/components'
import { WorkspaceModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { Button, Form, Input, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CreateWorkspace: FC<IModalProps> = observer(({ visible, onClose }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
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
      navigate(`/workspace/${result}`, {
        replace: true
      })
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
      <div className="space-y-6 p-4">
        <div>
          <h1 className="text-2xl leading-6 font-medium text-gray-900 mb-4">
            {t('workspace.createWorkspace.newWorkspace')}
          </h1>
          <p className="mr-8 text-base text-gray-500">{t('workspace.createWorkspace.text')}</p>
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

          <Button type="primary" htmlType="submit" loading={loading}>
            {t('workspace.createWorkspace.create')}
          </Button>

          {error && <div className="form-item-error">{error.message}</div>}
        </Form>
      </div>
    </Modal>
  )
})

export default CreateWorkspace
