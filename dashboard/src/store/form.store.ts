import type { FormModel } from '@/legacy_pages/models'
import { getTheme } from '@heyforms/form-component'
import { FormThemeV3 } from '@heyforms/shared-types-enums'
import { makeAutoObservable } from 'mobx'

export class FormStore {
  activeFormId?: string

  current?: FormModel = {} as any

  customTheme?: FormThemeV3 = {} as any

  constructor() {
    makeAutoObservable(this)
  }

  get theme() {
    return getTheme(this.current?.themeSettings?.theme)
  }

  setCurrent(form?: FormModel) {
    this.current = form || ({} as any)
    this.customTheme = getTheme(form?.themeSettings?.theme)
  }

  updateCustomTheme(updates: IMapType) {
    this.customTheme = getTheme({
      ...this.customTheme,
      ...updates
    })
  }

  resetCustomTheme() {
    this.customTheme = this.theme
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
