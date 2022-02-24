import type { ProjectModel } from '@/models'
import { ProjectService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Input, Modal } from '@heyforms/ui'
import type { InputValue } from '@heyforms/ui/lib/types/input/Input'
import { isEmpty } from '@hpnp/utils/helper'
import type { FC } from 'react'
import { useState } from 'react'

interface DeleteProjectProps extends IModalProps {
  project?: ProjectModel | null
  onComplete?: () => void
}

export const DeleteProject: FC<DeleteProjectProps> = ({
  visible,
  project,
  onComplete,
  onClose
}) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  function handleChange(value?: InputValue) {
    setIsDisabled(isEmpty(value) || value !== project?.name)
  }

  async function handleConfirm() {
    setLoading(true)

    try {
      await ProjectService.delete(project!.id)
      workspaceStore.deleteProject(workspaceId, project!.id)

      onComplete?.()
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title="Are you sure you want to delete this project?"
      description={
        <div className="space-y-2">
          <p>
            Keep in mind this operation is irreversible and will permanently delete all the data
            associated with this project.
          </p>
          <p>
            Once you confirm to delete the project, you will no longer have access to the project
            data.
          </p>

          <Input placeholder={`Please type ${project?.name} to confirm`} onChange={handleChange} />

          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      confirmLabel="I understand, delete the project anyway"
      confirmDisabled={loading || isDisabled}
      confirmLoading={loading}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}
