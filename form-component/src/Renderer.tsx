import type { FormModel } from '@heyforms/shared-types-enums'
import { FieldKindEnum, OTHER_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { isValidArray } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC } from 'react'
import { useEffect, useMemo, useReducer } from 'react'
import { BlockWrapper, ThankYou } from './blocks'
import { getFormValues, IState, StoreContext, StoreReducer } from './store'
import { parseFields } from './utils'

export interface RendererProps {
  className?: string
  form: FormModel
  autoSave?: boolean
  onSubmit?: (value: Record<string, any>) => Promise<void>
  onCountdownEnd?: () => void
}

export const Renderer: FC<RendererProps> = ({
  className,
  form,
  autoSave = true,
  onSubmit,
  onCountdownEnd
}) => {
  const list = parseFields(form.fields)

  const welcomeField = list.find(f => f.kind === FieldKindEnum.WELCOME)
  const thankYouField = list.find(f => f.kind === FieldKindEnum.THANK_YOU)
  const fields = list.filter(f => !OTHER_FIELD_KINDS.includes(f.kind))

  const memoState: IState = useMemo(
    () => ({
      formId: form.id,
      welcomeField,
      thankYouField,
      fields,
      values: {},
      scrollIndex: 0,
      scrollTo: 'next',
      autoSave,
      settings: form.settings,
      onSubmit,
      onCountdownEnd
    }),
    []
  )
  const [state, dispatch] = useReducer(StoreReducer, memoState)

  useEffect(() => {
    dispatch({
      type: 'setValues',
      payload: {
        values: getFormValues(form.id, autoSave)
      }
    })
  }, [])

  if (!isValidArray(form.fields)) {
    const field: any = {
      title: 'Form unavailable',
      description: "The form can't receive new submissions now.",
      properties: {
        buttonText: 'Create a heyform'
      }
    }

    return <ThankYou field={field} />
  }

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className={clsx('heyform-root', className)}>
        <BlockWrapper />
      </div>
    </StoreContext.Provider>
  )
}
