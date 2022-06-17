import { useStoreContext } from '@/pages/form/Create/store'
import { FieldKindIcon } from '@/pages/form/Create/views/LeftSidebar/FieldKindIcon'
import { PayloadForm } from '@/pages/form/Create/views/LogicPanel/PayloadForm'
import { XIcon } from '@heroicons/react/outline'
import { htmlUtils } from '@heyforms/answer-utils'
import { Button, useForm } from '@heyforms/ui'
import { useMemo } from 'react'

export const LogicPanel = () => {
  const [form] = useForm()
  const { state, dispatch } = useStoreContext()
  const { fields, selectedField, logics } = state
  const payloads = useMemo(() => {
    return logics?.find(l => l.fieldId === selectedField?.id)?.payloads || []
  }, [selectedField, logics])

  function handleClose() {
    dispatch({
      type: 'togglePanel',
      payload: {
        isLogicPanelOpen: false
      }
    })
  }

  function handleRemoveAll() {
    dispatch({
      type: 'deleteLogic',
      payload: {
        fieldId: state.selectedField!.id
      }
    })
  }

  function handleSave() {
    form.submit()
  }

  function handleFinish({ payloads }: any) {
    handleClose()
    dispatch({
      type: 'setLogic',
      payload: {
        fieldId: state.selectedField!.id,
        payloads
      }
    })
  }

  return (
    <div className="logic-panel">
      <div className="flex justify-between px-4 py-6 bg-gray-50">
        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-900">Rules</h2>
          {selectedField && (
            <div className="flex flex-1 mt-2 items-center justify-between">
              <FieldKindIcon
                kind={selectedField.kind}
                index={selectedField.index}
                parentIndex={selectedField.parent?.index}
              />
              <div className="flex-1 truncate">
                {htmlUtils.plain(selectedField.title as string)}
              </div>
            </div>
          )}
        </div>
        <Button.Link className="w-8 h-8" leading={<XIcon />} onClick={handleClose} />
      </div>

      <div className="flex-1 px-4 py-8 space-y-4 scrollbar">
        <PayloadForm
          form={form}
          fields={fields}
          selectedField={selectedField!}
          payloads={payloads}
          variables={state.variables}
          onFinish={handleFinish}
        />
      </div>

      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <Button.Link type="danger" onClick={handleRemoveAll}>
          Remove all
        </Button.Link>
        <div className="flex items-center">
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="ml-4" type="primary" onClick={handleSave}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  )
}
