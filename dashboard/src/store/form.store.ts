import type { FormModel } from '@/legacy_pages/models'
import { htmlUtils } from '@heyforms/answer-utils'
import { getTheme } from '@heyforms/form-component'
import { FormThemeV3 } from '@heyforms/shared-types-enums'
import { isArray, isValidArray } from '@hpnp/utils/helper'
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

  get fields() {
    if (isValidArray(this.current?.fields)) {
      return this.current!.fields!.map(f => {
        f.title = isArray(f.title) ? htmlUtils.plain(htmlUtils.serialize(f.title as any)) : f.title
        return f
      })
    }
    return []
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
