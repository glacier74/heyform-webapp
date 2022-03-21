import type { ProjectModel } from '@/models'
import { ProjectService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Form, Input, Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { AssignMember } from './AssignMember'

const CreateProject: FC<IModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation()
  const { workspaceId } = useParam()
  const history = useHistory()
  const workspaceStore = useStore('workspaceStore')

  async function handleFinish(values: ProjectModel) {
    const result = await ProjectService.create(workspaceId, values.name, values.members)

    workspaceStore.addProject(workspaceId, {
      ...values,
      id: result
    })

    history.push(`/workspace/${workspaceId}/project/${result}`)
  }

  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">{t('workspace.workSpace.createP')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('workspace.workSpace.workExplain')}
          </p>
        </div>

        <Form.Custom
          submitText={t('workspace.workSpace.createBottom')}
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item name="name" label={t('project.projectName')} rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Form.Item name="members" label={t('workspace.workSpace.assign')}>
            <AssignMember/>
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export default CreateProject
