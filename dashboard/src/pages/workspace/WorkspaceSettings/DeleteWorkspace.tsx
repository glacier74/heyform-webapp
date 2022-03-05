import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam, useVisible } from '@/utils'
import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useHistory } from 'react-router-dom'

const DeleteWorkspaceModal: FC<IModalProps> = observer(({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const history = useHistory()
  const userStore = useStore('userStore')
  const workspaceStore = useStore('workspaceStore')

  async function handleFinish(values: IMapType) {
    await WorkspaceService.dissolve(workspaceId, values.code)
    workspaceStore.deleteWorkspace(workspaceId)

    history.replace('/')
  }

  useAsyncEffect(async () => {
    if (visible) {
      await WorkspaceService.dissolveCode(workspaceId)

      notification.success({
        title: `An email containing a verification code was sent to ${userStore.user.email}.`
      })
    }
  }, [visible])

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Dissolve workspace</h1>
          <div className="space-y-2">
            <p className="mt-1 text-sm text-gray-500">
              Keep in mind this operation is irreversible and will permanently delete all the data
              associated with this workspace.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Once you confirm to dissolve the workspace, you will no longer have access to the
              workspace data.
            </p>
          </div>
        </div>

        <Form.Custom
          submitText="Dissolve workspace"
          submitOptions={{
            type: 'danger'
          }}
          request={handleFinish}
        >
          <Form.Item name="code" label="Verification code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
})

export const DeleteWorkspace: FC = () => {
  const [visible, handleOpen, handleClose] = useVisible()

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Dissolve workspace</div>
      <p className="mt-1 text-sm text-gray-500">
        By dissolving the team, all the forms and data will be erased and cannot be restored! Be
        cautious!
      </p>
      <div className="mt-3">
        <Button type="danger" onClick={handleOpen}>
          Dissolve workspace
        </Button>
      </div>

      <DeleteWorkspaceModal visible={visible} onClose={handleClose} />
    </div>
  )
}
