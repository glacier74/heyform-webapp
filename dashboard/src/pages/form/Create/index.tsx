import { Queue } from '@/legacy_pages/utils/queue'
import { parseFields } from '@/pages/form/Create/utils'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'
import { htmlUtils } from '@heyforms/answer-utils'
import type { FormModel } from '@heyforms/shared-types-enums'
import { message } from '@heyui/component'
import { useEffect, useMemo, useReducer } from 'react'
import type { IState } from './store'
import { StoreContext, storeReducer } from './store'
import './style.scss'
import { Compose } from './views/Compose'
import { LeftSidebar } from './views/LeftSidebar'
import { RightSidebar } from './views/RightSidebar'

const FormBuilder = () => (
  <div className="form-builder flex flex-1">
    <LeftSidebar />
    <Compose />
    <RightSidebar />
  </div>
)

const FormCreate = () => {
  const { formId } = useParam()
  const formStore = useStore('formStore')

  const initialState: IState = {
    version: 0,
    fields: [],
    references: [],
    questions: []
  }
  const [state, dispatch] = useReducer(storeReducer, initialState)
  const store = useMemo(() => ({ state, dispatch }), [state])

  const queue = useMemo(() => {
    return new Queue({
      concurrency: 1,
      scheduleInterval: 1_000,
      taskIntervalTime: 10_000
    })
  }, [formId])

  function getUpdates() {
    return {
      fields: state.fields!.map(row => ({
        id: row.id,
        kind: row.kind,
        title: htmlUtils.parse(row.title! as string),
        description: htmlUtils.parse(row.description! as string),
        validations: row.validations,
        properties: row.properties,
        layout: row.layout
      }))
    }
  }

  async function syncForm() {
    try {
      await FormService.updateFormSchemas(formId, getUpdates())
    } catch (err: any) {
      message.error(err.message)
    }
  }

  function visibilityListener() {
    if (document.visibilityState === 'hidden') {
      syncForm()
    }
  }

  useEffect(() => {
    formStore.update(getUpdates())

    // Add to queue
    queue.add(async () => {
      await syncForm()
    })

    document.addEventListener('visibilitychange', visibilityListener)

    return () => {
      document.removeEventListener('visibilitychange', visibilityListener)
    }
  }, [state.version])

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
