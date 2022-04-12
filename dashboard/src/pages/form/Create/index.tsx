import { parseFields } from '@/pages/form/Create/utils'
import { FormService } from '@/service'
import { useAsyncEffect, useParam } from '@/utils'
import type { FormModel } from '@heyforms/shared-types-enums'
import { useMemo, useReducer } from 'react'
import type { IState } from './store'
import { StoreContext, storeReducer } from './store'
import './style.scss'
import { Compose } from './views/Compose'
import { LeftSidebar } from './views/LeftSidebar'
import { RightSidebar } from './views/RightSidebar'

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
    const result: FormModel = await FormService.detail(formId)
    const fields = parseFields(result.fields)

    dispatch({
      type: 'setFields',
      payload: fields
    })
    dispatch({
      type: 'selectField',
      payload: fields[0]?.id
    })
  }, [formId])

  return (
    <StoreContext.Provider value={store}>
      <FormBuilder />
    </StoreContext.Provider>
  )
}

export default FormCreate
