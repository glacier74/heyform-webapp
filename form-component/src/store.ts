import { parsePlainAnswer } from "@heyforms/answer-utils";
import type { FormField, FormSettings } from "@heyforms/shared-types-enums";
import { createStoreContext, createStoreReducer } from "@heyforms/ui";
import { useContext } from "react";
import store2 from "store2";
import { LRU } from "./utils";

// LRU cache for form fields
let LRU_CACHE: LRU

export function getLRU(): LRU {
  if (!LRU_CACHE) {
    LRU_CACHE = new LRU({
      bucket: 'HEYFORM_DATA',
      store: {
        getItem: store2.get.bind(store2),
        setItem: store2.set.bind(store2),
        removeItem: store2.remove.bind(store2)
      }
    })
  }
  return LRU_CACHE
}

export function getFormValues(formId: string, autoSave?: boolean) {
  let values: any = {}

  if (autoSave) {
    values = getLRU().get(formId) || {}
  }

  return values
}

export interface IState {
  formId: string
  welcomeField?: FormField
  thankYouField?: FormField
  fields: FormField[]
  values: IMapType
  // Form settings
  autoSave?: boolean
  settings?: FormSettings
  // Scroll params
  scrollIndex?: number
  scrollTo?: 'next' | 'previous'
  errorFieldId?: string
  // Start after welcome page
  isStarted?: boolean
  isSubmitted?: boolean
  isCountdownEnd?: boolean
  // Callback functions
  onSubmit?: (value: Record<string, any>) => Promise<void>
  onCountdownEnd?: () => void
}

const actions: any = {
  setValues: (state: IState, { values }: any) => {
    let { fields, thankYouField } = state

    const fieldId = Object.keys(values)[0]
    const value = values[fieldId]

    const field = fields.find(f => f.id === fieldId)
    const text = parsePlainAnswer(
      {
        ...field,
        value
      } as any,
      true
    )

    const regex = new RegExp(`<span[^>]+data-mention="${fieldId}">[^<]+<\\/span>`, 'gi')
    const mention = `<span class="mention" data-mention="${fieldId}">${text}</span>`

    // Update all mention text
    fields = fields.map(f => {
      return {
        ...f,
        title: (f.title as string)?.replace(regex, mention),
        description: (f.description as string)?.replace(regex, mention)
      }
    })

    // Update thank you page mention text
    if (thankYouField) {
      thankYouField = {
        ...thankYouField,
        title: (thankYouField.title as string)?.replace(regex, mention),
        description: (thankYouField.description as string)?.replace(regex, mention)
      }
    }

    const newValues = {
      ...state.values,
      ...values
    }

    if (state.autoSave) {
      getLRU().put(state.formId, newValues)
    }

    return {
      ...state,
      thankYouField,
      fields,
      values: newValues
    }
  },

  setIsStarted: (state: IState, { isStarted }: any) => {
    return {
      ...state,
      isStarted,
      isSubmitted: state.fields.length < 1
    }
  },

  setIsSubmitted: (state: IState, { isSubmitted }: any) => ({ ...state, isSubmitted }),

  setIsCountdownEnd: (state: IState, { isCountdownEnd }: any) => ({ ...state, isCountdownEnd }),

  resetErrorField: (state: IState) => ({ ...state, errorFieldId: undefined }),

  scrollPrevious: (state: IState) => {
    if (state.scrollIndex! < 1) {
      return state
    }

    return {
      ...state,
      scrollIndex: state.scrollIndex! - 1,
      scrollTo: 'previous'
    }
  },

  scrollNext: (state: IState) => {
    if (state.scrollIndex! >= state.fields.length - 1) {
      return state
    }

    return {
      ...state,
      scrollIndex: state.scrollIndex! + 1,
      scrollTo: 'next'
    }
  },

  scrollTo(state: IState, { fieldId }: any) {
    const index = state.fields.findIndex(f => f.id === fieldId)

    if (index < 0) {
      return state
    }

    return {
      ...state,
      scrollIndex: index,
      scrollTo: 'previous',
      errorFieldId: fieldId
    }
  }
}

export const StoreContext = createStoreContext<IState>({
  formId: '',
  fields: [],
  values: {}
})

export const StoreReducer = createStoreReducer<IState>(actions, (_, newState) => newState)

export function useStore() {
  return useContext(StoreContext)
}
