import type { FormModel } from '@/legacy_pages/models'
import { getTheme } from '@heyforms/form-component'
import { makeAutoObservable } from 'mobx'

export class FormStore {
  activeFormId?: string

  current?: FormModel = {} as any

  constructor() {
    makeAutoObservable(this)
  }

  get theme() {
    return getTheme(this.current?.themeSettings?.theme)
  }

  updateTheme(updates: IMapType) {
    this.current!.themeSettings = {
      theme: {
        ...this.theme,
        ...updates
      }
    }
  }

  setCurrent(form?: FormModel) {
    this.current = form || ({} as any)
  }

  selectForm(formId?: string) {
    this.activeFormId = formId
  }

  update(values: IMapType) {
    this.current = {
      ...this.current!,
      ...values
    }
  }

  updateSettings(values: IMapType) {
    this.current!.settings = {
      ...this.current!.settings,
      ...values
    }
  }
}
