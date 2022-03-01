import { ComposeTabKeyEnum, FormModel, FormThemeV2 } from '@/legacy_pages/models'
import { customTheme } from '@heyforms/form-component'
import { isEmpty } from '@hpnp/utils/helper'
import { makeAutoObservable } from 'mobx'

export class ComposeStore {
  activeTab = ''

  form: FormModel = {} as any

  constructor() {
    makeAutoObservable(this)
  }

  get theme(): FormThemeV2 {
    const theme = this.form.themeSettings?.theme
    return customTheme(theme)
  }

  setForm(form: FormModel) {
    this.form = form
  }

  updateForm(updates: Record<string, any>) {
    this.form = {
      ...this.form,
      ...updates
    }
  }

  setTheme(theme: FormThemeV2) {
    if (isEmpty(this.form.themeSettings)) {
      this.form.themeSettings = {}
    }

    this.form.themeSettings!.theme = {
      ...this.form.themeSettings!.theme,
      ...theme
    }
  }

  setTabKey(activeTab: ComposeTabKeyEnum) {
    this.activeTab = activeTab
  }

  clearTabKey() {
    this.activeTab = ''
  }
}
