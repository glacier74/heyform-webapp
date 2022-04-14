import { CaptchaKindEnum } from '@/legacy_pages/models'
import { OptionType } from '@heyui/component'

export const CAPTCHA_KIND_OPTIONS: OptionType[] = [
  {
    id: CaptchaKindEnum.NONE,
    label: 'Disable'
  },
  { id: CaptchaKindEnum.GOOGLE_RECAPTCHA, label: 'Google reCaptcha' },
  { id: CaptchaKindEnum.GEETEST_CAPTCHA, label: 'GeeTest CAPTCHA' }
]

export const FORM_ANALYTICS_OPTIONS: OptionType[] = [
  {
    value: 7,
    label: 'analytics.time.0'
  },
  {
    value: 30,
    label: 'analytics.time.1'
  },
  {
    value: 90,
    label: 'analytics.time.2'
  },
  {
    value: 365,
    label: 'analytics.time.3'
  }
]

export const DEFAULT_SUMMARY_DATA = {
  totalVisits: 0,
  submissionCount: 0,
  completeRate: 0,
  averageDuration: '-'
}

export enum EmbedModeEnums {
  STANDARD = 0,
  POPUP,
  POPUP_OVER,
  SIDE_TAB
}

export enum InternalColumnKindEnum {
  CONTACT = 'contact',
  SUBMIT_DATE = 'submit_date'
}

export const INTERNAL_COLUMN_KINDS = [
  InternalColumnKindEnum.CONTACT,
  InternalColumnKindEnum.SUBMIT_DATE
]
