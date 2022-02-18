import { useStore } from '@/store'
import { Input } from '@heyforms/ui'
import type { InputValue } from '@heyforms/ui/lib/types/input/Input'
import { Modal } from '@heyforms/ui/src'
import { isEmpty } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export const DeleteProject: FC<IModalProps> = observer(({ visible, onClose }) => {
  const workspaceStore = useStore('workspaceStore')
  const [isDisabled, setIsDisabled] = useState(true)

  function handleChange(value?: InputValue) {
    setIsDisabled(isEmpty(value) || value !== workspaceStore.project?.name)
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
          <Input placeholder={`Please type New Project to confirm`} onChange={handleChange} />
        </div>
      }
      confirmLabel="I understand, delete the project anyway"
      confirmDisabled={isDisabled}
      onClose={onClose}
    />
  )
})
