import { FormService } from '@/service'
import { useAsyncEffect, useParam } from '@/utils'
import { FORM_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { useMemo, useReducer } from 'react'
import type { IState } from './store'
import { StoreContext, storeReducer } from './store'
import { Compose } from './views/Compose'
import { LeftSidebar } from './views/LeftSidebar'
import { RightSidebar } from './views/RightSidebar'
import './style.scss'

const FormBuilder = () => (
  <div className="flex flex-1">
    <LeftSidebar />
    <Compose />
    <RightSidebar />
  </div>
)

const FormCreate = () => {
  const { formId } = useParam()
  const initialState: IState = {
    version: 0,
    fields: [],
    references: [],
    questions: []
  }
  const [state, dispatch] = useReducer(storeReducer, initialState)
  const store = useMemo(() => ({ state, dispatch }), [state])

  useAsyncEffect(async () => {
    const result = await FormService.detail(formId)

    dispatch({
      type: 'setFields',
      payload: result.fields.filter(f => FORM_FIELD_KINDS.includes(f.kind))
    })
  }, [formId])

  return (
    <StoreContext.Provider value={store}>
      <FormBuilder />
    </StoreContext.Provider>
  )
}

export default FormCreate
