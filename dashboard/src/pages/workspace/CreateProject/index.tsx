import type { ProjectModel } from '@/models'
import { ProjectService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Button, Form, Input, Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AssignMember } from './AssignMember'

const CreateProject: FC<IModalProps> = ({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const history = useHistory()
  const workspaceStore = useStore('workspaceStore')
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleFinish(values: ProjectModel) {
    if (loading) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await ProjectService.create(workspaceId, values.name, values.members)

      workspaceStore.addProject(workspaceId, {
        ...values,
        id: result
      })

      history.push(`/workspace/${workspaceId}/project/${result}`)
    } catch (err: any) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Create a new project</h1>
          <p className="mt-1 text-sm text-gray-500">
            Projects are sub groups in a workspace, where you can add your workspace members to work
            collaboratively on forms, audiences and integrations.
          </p>
        </div>

        <Form onFinish={handleFinish}>
          <Form.Item name="name" label="Project name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="members" label="Assign members">
            <AssignMember />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
          {error && <div className="form-item-error">{error.message}</div>}
        </Form>
      </div>
    </Modal>
  )
}

export default CreateProject
