import { useStoreContext } from '@/pages/form/Create/store'
import { UNSELECTABLE_FIELD_KINDS } from '@/pages/form/Create/views/FieldConfig'
import { FieldKindIcon } from '@/pages/form/Create/views/LeftSidebar/FieldKindIcon'
import { PayloadList } from '@/pages/form/Create/views/LogicPanel/PayloadForm'
import { XIcon } from '@heroicons/react/outline'
import { htmlUtils } from '@heyforms/answer-utils'
import { flattenFieldsWithGroups } from '@heyforms/form-component'
import { Logic, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { Button, Form, useForm } from '@heyforms/ui'
import { isValidArray } from '@hpnp/utils/helper'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const LogicBulkEditPanel = () => {
  const [form] = useForm()
  const { t } = useTranslation()
  const { state, dispatch } = useStoreContext()
  const { fields: rawFields, logics, variables } = state

  const fields = useMemo(
    () =>
      flattenFieldsWithGroups(rawFields).filter(
        f => QUESTION_FIELD_KINDS.includes(f.kind) && !UNSELECTABLE_FIELD_KINDS.includes(f.kind)
      ),
    [rawFields]
  )

  function handleClose() {
    dispatch({
      type: 'togglePanel',
      payload: {
        isBulkEditPanelOpen: false
      }
    })
  }

  function handleRemoveAll() {
    form.resetFields()
  }

  function handleSave() {
    form.submit()
  }

  function handleFinish(values: any) {
    const logics: Logic[] = []

    Object.keys(values).forEach(fieldId => {
      const payloads = values[fieldId]

      if (isValidArray(payloads)) {
        logics.push({
          fieldId,
          payloads
        })
      }
    })

    dispatch({
      type: 'setLogics',
      payload: logics
    })
    handleClose()
  }

  useEffect(() => {
    if (isValidArray(logics)) {
      const result: any = {}

      logics!.forEach(l => {
        const index = fields.findIndex(f => f.id === l.fieldId)

        if (index > -1) {
          result[l.fieldId] = l.payloads
        }
      })

      form.setFieldsValue(result)
    }
  }, [fields, logics])

  return (
    <div className="logic-bulk-edit-panel">
      <div className="flex justify-between px-4 py-6 bg-slate-50">
        <div className="flex-1">
          <h2 className="text-lg font-medium text-slate-900">{t('formBuilder.bulkEdit')}</h2>
          <p>{t('formBuilder.bulkEditDescription')}</p>
        </div>
        <Button.Link className="w-8 h-8" leading={<XIcon />} onClick={handleClose} />
      </div>

      <div className="flex-1 px-4 py-8 space-y-4 scrollbar">
        <Form className="divide-y divide-gray-100 space-y-6" form={form} onFinish={handleFinish}>
          {fields.map(field => (
            <PayloadList
              className="payload-list"
              key={field.id}
              name={field.id}
              fields={rawFields}
              selectedField={field}
              variables={variables}
            >
              <div className="flex items-center mb-4">
                <FieldKindIcon
                  kind={field.kind}
                  index={field.index}
                  parentIndex={field.parent?.index}
                />
                <div className="truncate">{htmlUtils.plain(field.title as string)}</div>
              </div>
            </PayloadList>
          ))}
        </Form>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <Button.Link type="danger" onClick={handleRemoveAll}>
          {t('formBuilder.removeAll')}
        </Button.Link>
        <div className="flex items-center">
          <Button onClick={handleClose}>{t('formBuilder.cancel')}</Button>
          <Button className="ml-4" type="primary" onClick={handleSave}>
            {t('formBuilder.saveChanges')}
          </Button>
        </div>
      </div>
    </div>
  )
}
