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
    id: 7,
    label: 'Last week'
  },
  {
    id: 30,
    label: 'Last month'
  },
  {
    id: 90,
    label: 'Last 3 months'
  },
  {
    id: 365,
    label: 'Last year'
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
