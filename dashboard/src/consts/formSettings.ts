import { CaptchaKindEnum } from '@heyforms/shared-types-enums'

export const CAPTCHA_KIND_OPTIONS = [
  {
    label: 'Disable',
    value: CaptchaKindEnum.NONE
  },
  { label: 'Google reCaptcha', value: CaptchaKindEnum.GOOGLE_RECAPTCHA },
  { label: 'GeeTest CAPTCHA', value: CaptchaKindEnum.GEETEST_CAPTCHA }
]

export const LOCALES_OPTIONS = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'Deutsch',
    value: 'de'
  },
  {
    label: 'Français',
    value: 'fr'
  },
  {
    label: 'Polski',
    value: 'pl'
  },
  {
    label: '日本語',
    value: 'ja'
  },
  {
    label: '简体中文',
    value: 'zh-cn'
  },
  {
    label: '繁体中文',
    value: 'zh-tw'
  }
]

export const FORM_LOCALES_OPTIONS = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'German',
    value: 'de'
  },
  {
    label: 'French',
    value: 'fr'
  },
  {
    label: 'Polish',
    value: 'pl'
  },
  {
    label: 'Chinese (simplified)',
    value: 'zh-cn'
  },
  {
    label: 'Chinese (traditional)',
    value: 'zh-tw'
  }
]

export const TIME_LIMIT_OPTIONS = [
  {
    label: 'Hour',
    value: 'h'
  },
  {
    label: 'Minute',
    value: 'm'
  },
  {
    label: 'Second',
    value: 's'
  }
]

export const IP_LIMIT_OPTIONS = [
  {
    label: 'Day',
    value: 'd'
  },
  {
    label: 'Hour',
    value: 'h'
  },
  {
    label: 'Minute',
    value: 'm'
  }
]

export const EXPIRATION_DATE_FORMAT = 'MMM DD, YYYY hh:mm A'
