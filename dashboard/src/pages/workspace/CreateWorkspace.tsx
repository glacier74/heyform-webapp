import { PhotoPickerField } from '@/components'
import { WorkspaceModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { Button, Form, Input, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

interface CreateWorkspaceProps {
  visible?: boolean
  onClose?: () => void
}

const CreateWorkspace: FC<CreateWorkspaceProps> = observer(({ visible, onClose }) => {
  const history = useHistory()
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
      history.replace(`/workspace/${result}`)
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
          <h1 className="text-lg leading-6 font-medium text-gray-900">Create a new workspace</h1>
          <p className="mt-1 mr-8 text-sm text-gray-500">
            Workspaces are shared environments where members can collaborate. After create a
            workspace, you can invite others to join.
          </p>
        </div>

        <Form onFinish={handleFinish}>
          <Form.Item name="name" label="Workspace name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="avatar"
            label={
              <>
                Workspace logo <span className="text-gray-500">(optional)</span>
              </>
            }
          >
            <PhotoPickerField onVisibilityChange={handleVisibilityChange} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>

          {error && <div className="form-item-error">{error.message}</div>}
        </Form>
      </div>
    </Modal>
  )
})

export default CreateWorkspace
