import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam, useVisible } from '@/utils'
import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const DeleteWorkspaceModal: FC<IModalProps> = observer(({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const navigate = useNavigate()
  const userStore = useStore('userStore')
  const workspaceStore = useStore('workspaceStore')
  const { t } = useTranslation()

  async function handleFinish(values: IMapType) {
    await WorkspaceService.dissolve(workspaceId, values.code)
    workspaceStore.deleteWorkspace(workspaceId)

    navigate('/', {
      replace: true
    })
  }

  useAsyncEffect(async () => {
    if (visible) {
      await WorkspaceService.dissolveCode(workspaceId)

      notification.success({
        title: `${t('workspace.settings.delWorkspace.sendEmail')} ${userStore.user.email}.`
      })
    }
  }, [visible])

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            {t('workspace.settings.delWorkspace.dissolve')}
          </h1>
          <div className="space-y-2">
            <p className="mt-1 text-sm text-gray-500">
              {t('workspace.settings.delWorkspace.warning')}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {t('workspace.settings.delWorkspace.warning2')}
            </p>
          </div>
        </div>

        <Form.Custom
          submitText={t('workspace.settings.delWorkspace.dissolve')}
          submitOptions={{
            type: 'danger'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="code"
            label={t('project.deleteProject.code')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
})

export const DeleteWorkspace: FC = () => {
  const [visible, handleOpen, handleClose] = useVisible()
  const { t } = useTranslation()

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">
        {t('workspace.settings.delWorkspace.dissolve')}
      </div>
      <p className="mt-1 text-sm text-gray-500">{t('workspace.settings.delWorkspace.warning3')}</p>
      <div className="mt-3">
        <Button type="danger" onClick={handleOpen}>
          {t('workspace.settings.delWorkspace.dissolve')}
        </Button>
      </div>

      <DeleteWorkspaceModal visible={visible} onClose={handleClose} />
    </div>
  )
}
