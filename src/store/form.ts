import { htmlUtils } from '@heyform-inc/answer-utils'
import { getTheme } from '@heyform-inc/form-renderer'
import { FormSettings, FormTheme } from '@heyform-inc/shared-types-enums'
import { helper } from '@heyform-inc/utils'
import { type Dayjs } from 'dayjs'
import { create } from 'zustand'
import computed from 'zustand-computed'
import { immer } from 'zustand/middleware/immer'

import { TypeNumberValue } from '@/components'
import { APP_STATUS_ENUM, DEFAULT_EMBED_CONFIGS } from '@/consts'
import { DEFAULT_LNG } from '@/i18n'
import { AppType, FormType, IntegratedAppType, IntegrationType } from '@/types'
import { getTimeZone, parseDuration, unixToDayjs } from '@/utils'

interface TempSettings extends FormSettings {
  closeForm?: boolean
  startDate?: Dayjs
  endDate?: Dayjs
  _timeLimit?: TypeNumberValue
  _ipLimitTime?: TypeNumberValue
  captcha?: string
  enableRespondentNotification?: boolean
}

type EmbedConfigs = typeof DEFAULT_EMBED_CONFIGS
export type EmbedType = keyof EmbedConfigs

interface FormStoreType {
  form?: FormType
  tempSettings?: TempSettings
  isFormLoaded?: boolean
  embedConfigs: EmbedConfigs
  embedType: EmbedType
  tempTheme?: FormTheme

  // Integrations
  apps: AppType[]
  integrations: IntegrationType[]

  // Form preview
  previewMode?: 'desktop' | 'mobile'

  setForm: (form?: FormType) => void
  updateForm: (updates: Partial<FormType>) => void
  updateSettings: (settings: Partial<FormSettings>) => void
  setTempSettings: (tempSettings?: TempSettings) => void
  updateTempSettings: (updates: Partial<TempSettings>) => void
  setTempTheme: (tempTheme?: FormTheme) => void
  updateTempTheme: (updates: Partial<FormTheme>) => void
  revertTempTheme: () => void
  selectEmbedType: (embedType: string) => void
  updateEmbedConfig: (updates: Any) => void
  resetEmbedConfigs: () => void
  setApps: (apps: AppType[]) => void
  setIntegrations: (integrations: IntegrationType[]) => void
  updateIntegration: (appId: string, updates: Partial<IntegrationType>) => void
  deleteIntegration: (appId: string) => void
  setPreviewMode: (mode: 'desktop' | 'mobile') => void
}

interface ComputedStoreType {
  formFields: Any[]
  embedConfig?: Any
  integratedApps: IntegratedAppType[]
}

const computeState = (state: FormStoreType): ComputedStoreType => {
  const embedConfig = state.embedConfigs[state.embedType]
  const integratedApps = state.apps.map(app => {
    const integration = state.integrations.find(row => row.appId === app.id)

    let status = APP_STATUS_ENUM.PENDING

    if (helper.isValid(integration?.attributes)) {
      status = APP_STATUS_ENUM.ACTIVE
    } else if (app.internalType === 3) {
      status = APP_STATUS_ENUM.REDIRECT_TO_EXTERNAL
    }

    return {
      ...app,
      integration,
      status
    }
  })

  return {
    embedConfig,
    integratedApps: integratedApps as IntegratedAppType[],
    formFields: (state.form?.drafts || []).map(field => ({
      id: field.id,
      title: helper.isArray(field.title)
        ? htmlUtils.plain(htmlUtils.serialize(field.title as Any))
        : field.title
    }))
  }
}

export const useFormStore = create<FormStoreType>()(
  computed(
    immer(set => ({
      isFormLoaded: false,
      embedConfigs: DEFAULT_EMBED_CONFIGS,
      embedType: 'standard',
      apps: [],
      integrations: [],

      setForm: form => {
        set(state => {
          state.form = form
          state.isFormLoaded = true

          if (form?.settings) {
            const tempSettings = form.settings as TempSettings

            // Form status
            tempSettings.closeForm = !tempSettings.active

            if (!tempSettings.expirationTimeZone) {
              tempSettings.expirationTimeZone = getTimeZone()
            }

            if (tempSettings.enabledAt && tempSettings.enabledAt > 0) {
              tempSettings.startDate = unixToDayjs(
                tempSettings.enabledAt,
                tempSettings.expirationTimeZone
              )
            }

            if (tempSettings.closedAt && tempSettings.closedAt > 0) {
              tempSettings.endDate = unixToDayjs(
                tempSettings.closedAt,
                tempSettings.expirationTimeZone
              )
            }

            if (!tempSettings.locale) {
              tempSettings.locale = DEFAULT_LNG
            }

            if (tempSettings.timeLimit) {
              tempSettings._timeLimit = parseDuration(tempSettings.timeLimit)
            }

            if (tempSettings.ipLimitTime) {
              tempSettings._ipLimitTime = parseDuration(tempSettings.ipLimitTime)
            }

            state.tempSettings = tempSettings
          }

          state.tempTheme = getTheme(form?.themeSettings?.theme)
        })
      },

      updateForm: updates => {
        set(state => {
          state.form = {
            ...state.form,
            ...(updates as FormType)
          }
        })
      },

      updateSettings: settings => {
        set(state => {
          state.form = {
            ...state.form,
            settings: {
              ...state.form?.settings,
              ...settings
            }
          } as FormType
        })
      },

      setTempSettings: tempSettings => {
        set(state => {
          state.tempSettings = tempSettings
        })
      },

      updateTempSettings: updates => {
        set(state => {
          state.tempSettings = {
            ...state.tempSettings,
            ...(updates as TempSettings)
          }
        })
      },

      setTempTheme: tempTheme => {
        set(state => {
          state.tempTheme = tempTheme
        })
      },

      updateTempTheme: updates => {
        set(state => {
          state.tempTheme = {
            ...state.tempTheme,
            ...(updates as FormTheme)
          }
        })
      },

      revertTempTheme: () => {
        set(state => {
          state.tempTheme = getTheme(state.form?.themeSettings?.theme)
        })
      },

      selectEmbedType: embedType => {
        set(state => {
          state.embedType = embedType as EmbedType
        })
      },

      updateEmbedConfig: updates => {
        set(state => {
          state.embedConfigs[state.embedType] = {
            ...state.embedConfigs[state.embedType],
            ...updates
          }
        })
      },

      resetEmbedConfigs: () => {
        set(state => {
          state.embedConfigs = DEFAULT_EMBED_CONFIGS
        })
      },

      setApps: apps => {
        set(state => {
          state.apps = apps
        })
      },

      setIntegrations: integrations => {
        set(state => {
          state.integrations = integrations
        })
      },

      updateIntegration: (appId, updates) => {
        set(state => {
          const index = state.integrations.findIndex(row => row.appId === appId)

          if (index > -1) {
            state.integrations[index] = {
              ...state.integrations[index],
              ...updates
            }
          }
        })
      },

      deleteIntegration: appId => {
        set(state => {
          state.integrations = state.integrations.filter(row => row.appId !== appId)
        })
      },

      setPreviewMode: mode => {
        set(state => {
          state.previewMode = mode
        })
      }
    })),
    computeState
  )
)
