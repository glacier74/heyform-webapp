import { EXPIRATION_DATE_FORMAT } from '@/consts'
import type { FormModel } from '@/legacy_pages/models'
import { htmlUtils } from '@heyforms/answer-utils'
import { getTheme } from '@heyforms/form-component'
import { FormSettings, FormThemeV3 } from '@heyforms/shared-types-enums'
import { isArray, isValidArray } from '@hpnp/utils/helper'
import dayjs, { Dayjs, unix } from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { makeAutoObservable } from 'mobx'

interface TempFormSettings extends FormSettings {
  closeForm?: boolean
  startDate?: Dayjs
  endDate?: Dayjs
}

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(dayOfYear)

export class FormStore {
  activeFormId?: string

  current?: FormModel = {} as any

  customTheme?: FormThemeV3 = {} as any

  tempSettings: Partial<TempFormSettings> = {}

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

    if (form?.settings) {
      const tempSettings: TempFormSettings = {
        closeForm: !form.settings.active,
        ...form.settings
      }

      if (!form.settings.expirationTimeZone) {
        tempSettings.expirationTimeZone = dayjs.tz.guess()
      }

      if (form.settings.enabledAt && form.settings.enabledAt > 0) {
        tempSettings.startDate = dayjs(
          dayjs
            .tz(unix(form.settings.enabledAt), tempSettings.expirationTimeZone)
            .format(EXPIRATION_DATE_FORMAT),
          EXPIRATION_DATE_FORMAT
        )
      }

      if (form.settings.closedAt && form.settings.closedAt > 0) {
        tempSettings.endDate = dayjs(
          dayjs
            .tz(unix(form.settings.closedAt), tempSettings.expirationTimeZone)
            .format(EXPIRATION_DATE_FORMAT),
          EXPIRATION_DATE_FORMAT
        )
      }

      this.tempSettings = tempSettings
    }
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

  updateTempSettings(updates: IMapType) {
    this.tempSettings = {
      ...this.tempSettings,
      ...updates
    }
  }
}
