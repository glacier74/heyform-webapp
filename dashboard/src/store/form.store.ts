import type { FormModel } from '@/legacy_pages/models'
import { getTheme } from '@heyforms/form-component'
import { FormThemeV3 } from '@heyforms/shared-types-enums'
import { makeAutoObservable } from 'mobx'

export class FormStore {
  activeFormId?: string

  current?: FormModel = {} as any

  customTheme?: FormThemeV3

  constructor() {
    makeAutoObservable(this)
  }

  get theme() {
    return getTheme(this.customTheme || this.current?.themeSettings?.theme)
  }

  updateTheme(updates: IMapType) {
    this.customTheme = {
      ...this.customTheme,
      ...updates
    }
  }

  clearCustomTheme() {
    this.customTheme = undefined
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
