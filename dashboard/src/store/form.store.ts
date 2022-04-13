import type { FormModel } from '@/legacy_pages/models'
import { makeAutoObservable } from 'mobx'

const allowedBlockTags = ['div', 'p', 'br']

export class FormStore {
  activeFormId?: string

  current?: FormModel = {} as any

  constructor() {
    makeAutoObservable(this)
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
    if (this.current?.settings) {
      this.current!.settings = {
        ...this.current!.settings,
        ...values
      }
    }
  }
}
