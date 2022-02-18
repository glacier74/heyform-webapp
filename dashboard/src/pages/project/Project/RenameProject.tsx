import { useStore } from '@/store'
import { Button, Form, Input } from '@heyforms/ui'
import { Modal } from '@heyforms/ui/src'
import { isEmpty } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export const RenameProject: FC<IModalProps> = observer(({ visible, onClose }) => {
  const workspaceStore = useStore('workspaceStore')
  const [isDisabled, setIsDisabled] = useState(true)

  function handleValuesChange(values: IMapType) {
    setIsDisabled(isEmpty(values.name) || values.name === workspaceStore.project?.name)
  }

  return (
    <Modal wrapperClassName="max-w-md" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Rename this project</h1>
        </div>

        <Form
          initialValues={{
            name: workspaceStore.project?.name
          }}
          onValuesChange={handleValuesChange}
        >
          <Form.Item name="name" label="Project name">
            <Input />
          </Form.Item>
          <Button disabled={isDisabled}>Update</Button>
        </Form>
      </div>
    </Modal>
  )
})
