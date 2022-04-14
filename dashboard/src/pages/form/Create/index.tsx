import { Async } from '@/components'
import { Queue } from '@/legacy_pages/utils/queue'
import { initFields } from '@/pages/form/Create/utils'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { htmlUtils } from '@heyforms/answer-utils'
import type { FormModel } from '@heyforms/shared-types-enums'
import { notification, Spin } from '@heyforms/ui'
import { FC, useEffect, useMemo, useReducer, useState } from 'react'
import type { IState } from './store'
import { StoreContext, storeReducer } from './store'
import { Compose } from './views/Compose'
import { LeftSidebar } from './views/LeftSidebar'
import { RightSidebar } from './views/RightSidebar'
import './style.scss'

const FormBuilder: FC<{ form: FormModel }> = ({ form }) => {
  const formStore = useStore('formStore')
  const initialState: IState = {
    version: 0,
    references: [],
    ...initFields(form.fields)
  }
  const [state, dispatch] = useReducer(storeReducer, initialState)
  const store = useMemo(() => ({ state, dispatch }), [state])

  const queue = useMemo(() => {
    return new Queue({
      concurrency: 1,
      scheduleInterval: 1_000,
      taskIntervalTime: 10_000
    })
  }, [form.id])

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
      await FormService.updateFormSchemas(form.id, getUpdates())
    } catch (err: any) {
      notification.error({
        message: 'Error',
        title: err.message
      })
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
    if (state.version > 0) {
      queue.add(async () => {
        await syncForm()
      })
    }

    document.addEventListener('visibilitychange', visibilityListener)

    return () => {
      document.removeEventListener('visibilitychange', visibilityListener)
    }
  }, [state.version])

  return (
    <StoreContext.Provider value={store}>
      <div className="form-builder flex flex-1">
        <LeftSidebar />
        <Compose />
        <RightSidebar />
      </div>
    </StoreContext.Provider>
  )
}

const FormCreate = () => {
  const { formId } = useParam()
  const [form, setForm] = useState<FormModel>()

  async function request() {
    const result: FormModel = await FormService.detail(formId)
    setForm(result)
    return true
  }

  const Skeleton = (
    <div className="h-full flex items-center justify-center text-blue-600">
      <Spin />
    </div>
  )

  return (
    <Async className="h-full" request={request} skeleton={Skeleton} deps={[formId]}>
      {form && <FormBuilder form={form!} />}
    </Async>
  )
}

export default FormCreate
