import { useStore } from '@/store'
import { Button, Form, Input } from '@heyforms/ui'
import { Modal } from '@heyforms/ui/src'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

export const RenameProject: FC<IModalProps> = observer(({ visible, onClose }) => {
  const workspaceStore = useStore('workspaceStore')

  return (
    <Modal wrapperClassName="max-w-md" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Rename this project</h1>
        </div>

        <Form.Custom
          initialValues={{
            name: workspaceStore.project?.name
          }}
          submitText="Update"
          request={console.log as any}
        >
          <Form.Item name="name" label="Project name">
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
})
