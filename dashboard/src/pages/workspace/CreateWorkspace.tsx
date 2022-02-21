import { Avatar as UIAvatar, Avatar, Button, Form, Input, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

interface CreateWorkspaceProps {
  visible?: boolean
  onClose?: () => void
}

const CreateWorkspace: FC<CreateWorkspaceProps> = observer(({ visible, onClose }) => {
  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Create a new workspace</h1>
          <p className="mt-1 mr-8 text-sm text-gray-500">
            Workspaces are shared environments where members can collaborate. After create a
            workspace, you can invite others to join.
          </p>
        </div>

        <Form>
          <Form.Item name="name" label="Workspace name">
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
            <div className="flex items-center">
              <UIAvatar src="" size={48} circular rounded />
              <div className="ml-4 flex flex-auto items-center">
                <Button>Change</Button>
                <Button.Link className="ml-3 px-4 py-2">Remove</Button.Link>
              </div>
            </div>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    </Modal>
  )
})

export default CreateWorkspace
