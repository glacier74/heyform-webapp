import { ProjectService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Form, Input, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

export const RenameProject: FC<IModalProps> = observer(({ visible, onClose }) => {
  const { workspaceId, projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  async function handleUpdate(values: any) {
    await ProjectService.rename(projectId, values.name)
    workspaceStore.updateProject(workspaceId, projectId, values)

    onClose?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Rename this project</h1>
        </div>

        <Form.Custom
          initialValues={{
            name: workspaceStore.project?.name
          }}
          submitText="Update"
          submitOptions={{
            type: 'primary'
          }}
          onlySubmitOnValueChange={true}
          request={handleUpdate}
        >
          <Form.Item name="name" label="Project name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
})
