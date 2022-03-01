import { FormModel } from '@/legacy_pages/models'
import { htmlUtils } from '@heyforms/answer-utils'
import { isValidArray } from '@hpnp/utils/helper'
import { makeAutoObservable } from 'mobx'

export class FormStore {
  activeFormId?: string

  current?: FormModel = {} as any

  constructor() {
    makeAutoObservable(this)
  }

  setCurrent(form?: FormModel) {
    if (form) {
      form.fields = form.fields?.map(row => {
        if (isValidArray(row.titleSchema)) {
          row.title = htmlUtils.serialize(row.titleSchema!, {
            plain: true
          })
        }
        return row
      })
    }

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
