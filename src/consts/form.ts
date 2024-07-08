import { FieldKindEnum, FieldLayoutAlignEnum } from '@heyform-inc/shared-types-enums'
import { IconCalendar, IconEyeOff, IconVariable } from '@tabler/icons-react'

import IconAddress from '@/assets/address.svg?react'
import IconCountry from '@/assets/country.svg?react'
import IconDateRange from '@/assets/date-range.svg?react'
import IconDateTime from '@/assets/date-time.svg?react'
import IconEmail from '@/assets/email.svg?react'
import IconFullPage from '@/assets/embed-fullpage.svg?react'
import IconModal from '@/assets/embed-modal.svg?react'
import IconPopup from '@/assets/embed-popup.svg?react'
import IconStandard from '@/assets/embed-standard.svg?react'
import IconFileUpload from '@/assets/file-upload.svg?react'
import IconFullName from '@/assets/full-name.svg?react'
import IconInputTable from '@/assets/input-table.svg?react'
import IconLayoutCover from '@/assets/layout-cover.svg?react'
import IconLayoutFloatLeft from '@/assets/layout-float-left.svg?react'
import IconLayoutFloatRight from '@/assets/layout-float-right.svg?react'
import IconLayoutInline from '@/assets/layout-inline.svg?react'
import IconLayoutSplitLeft from '@/assets/layout-split-left.svg?react'
import IconLayoutSplitRight from '@/assets/layout-split-right.svg?react'
import IconLegalTerms from '@/assets/legal-terms.svg?react'
import IconLongText from '@/assets/long-text.svg?react'
import IconMultipleIcon from '@/assets/multiple-choice.svg?react'
import IconNumber from '@/assets/number.svg?react'
import IconOpinionScale from '@/assets/opinion-scale.svg?react'
import IconPayment from '@/assets/payment.svg?react'
import IconPhoneNumber from '@/assets/phone-number.svg?react'
import IconPictureChoice from '@/assets/picture-choice.svg?react'
import IconQuestionGroup from '@/assets/question-group.svg?react'
import IconRating from '@/assets/rating.svg?react'
import IconShortText from '@/assets/short-text.svg?react'
import IconSignature from '@/assets/signature.svg?react'
import IconStatement from '@/assets/statement.svg?react'
import IconThankYou from '@/assets/thank-you.svg?react'
import IconVariableNumber from '@/assets/variable-number.svg?react'
import IconVariableString from '@/assets/variable-string.svg?react'
import IconWebsite from '@/assets/website.svg?react'
import IconWelcome from '@/assets/welcome.svg?react'
import IconYesNo from '@/assets/yes-no.svg?react'

export const FIELD_WELCOME_CONFIG = {
  kind: FieldKindEnum.WELCOME,
  icon: IconWelcome,
  label: 'form.builder.question.welcome',
  textColor: '#334155',
  backgroundColor: '#e5e7eb'
}

export const FIELD_THANK_YOU_CONFIG = {
  kind: FieldKindEnum.THANK_YOU,
  icon: IconThankYou,
  label: 'form.builder.question.thankYou',
  textColor: '#334155',
  backgroundColor: '#e5e7eb'
}

export const STANDARD_FIELD_CONFIGS = [
  {
    kind: FieldKindEnum.MULTIPLE_CHOICE,
    icon: IconMultipleIcon,
    label: 'form.builder.question.multipleChoice',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.PHONE_NUMBER,
    icon: IconPhoneNumber,
    label: 'form.builder.question.phoneNumber',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.SHORT_TEXT,
    icon: IconShortText,
    label: 'form.builder.question.shortText',
    textColor: '#15803d',
    backgroundColor: '#dcfce7'
  },
  {
    kind: FieldKindEnum.LONG_TEXT,
    icon: IconLongText,
    label: 'form.builder.question.longText',
    textColor: '#15803d',
    backgroundColor: '#dcfce7'
  },
  {
    kind: FieldKindEnum.PAYMENT,
    icon: IconPayment,
    label: 'form.builder.question.payment',
    textColor: '#a16207',
    backgroundColor: '#fef9c3'
  },
  {
    kind: FieldKindEnum.GROUP,
    icon: IconQuestionGroup,
    label: 'form.builder.question.questionGroup',
    textColor: '#334155',
    backgroundColor: '#e5e7eb'
  },
  {
    kind: FieldKindEnum.STATEMENT,
    icon: IconStatement,
    label: 'form.builder.question.statement',
    textColor: '#334155',
    backgroundColor: '#e5e7eb'
  },
  {
    kind: FieldKindEnum.PICTURE_CHOICE,
    icon: IconPictureChoice,
    label: 'form.builder.question.pictureChoice',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.YES_NO,
    icon: IconYesNo,
    label: 'form.builder.question.yesNo',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.EMAIL,
    icon: IconEmail,
    label: 'form.builder.question.email',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.FULL_NAME,
    icon: IconFullName,
    label: 'form.builder.question.fullName',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.RATING,
    icon: IconRating,
    label: 'form.builder.question.rating',
    textColor: '#a21caf',
    backgroundColor: '#fae8ff'
  },
  {
    kind: FieldKindEnum.OPINION_SCALE,
    icon: IconOpinionScale,
    label: 'form.builder.question.opinionScale',
    textColor: '#a21caf',
    backgroundColor: '#fae8ff'
  },
  {
    kind: FieldKindEnum.DATE,
    icon: IconDateTime,
    label: 'form.builder.question.dateTime',
    textColor: '#059669',
    backgroundColor: '#a7f3d0'
  },
  {
    kind: FieldKindEnum.DATE_RANGE,
    icon: IconDateRange,
    label: 'form.builder.question.dateRange',
    textColor: '#059669',
    backgroundColor: '#a7f3d0'
  },
  {
    kind: FieldKindEnum.NUMBER,
    icon: IconNumber,
    label: 'form.builder.question.number',
    textColor: '#0f766e',
    backgroundColor: '#ccfbf1'
  },
  {
    kind: FieldKindEnum.FILE_UPLOAD,
    icon: IconFileUpload,
    label: 'form.builder.question.fileUpload',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.ADDRESS,
    icon: IconAddress,
    label: 'form.builder.question.address',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.COUNTRY,
    icon: IconCountry,
    label: 'form.builder.question.country',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.LEGAL_TERMS,
    icon: IconLegalTerms,
    label: 'form.builder.question.legalTerms',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.SIGNATURE,
    icon: IconSignature,
    label: 'form.builder.question.signature',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.URL,
    icon: IconWebsite,
    label: 'form.builder.question.website',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.INPUT_TABLE,
    icon: IconInputTable,
    label: 'form.builder.question.inputTable',
    textColor: '#c2410c',
    backgroundColor: '#ffedd5'
  }
]

export const ALL_FIELD_CONFIGS = [
  FIELD_WELCOME_CONFIG,
  FIELD_THANK_YOU_CONFIG,
  ...STANDARD_FIELD_CONFIGS
]

export const CUSTOM_FIELDS_CONFIGS = [
  {
    kind: FieldKindEnum.SUBMIT_DATE,
    icon: IconCalendar,
    label: 'form.builder.question.submitDate',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.HIDDEN_FIELDS,
    icon: IconEyeOff,
    label: 'form.builder.question.hiddenFields',
    textColor: '#334155',
    backgroundColor: '#e5e7eb'
  },
  {
    kind: FieldKindEnum.VARIABLE,
    icon: IconVariable,
    label: 'form.builder.question.variable',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  }
]

export const BLOCK_GROUPS = [
  [
    {
      name: 'form.builder.question.recommended',
      list: [
        FieldKindEnum.SHORT_TEXT,
        FieldKindEnum.MULTIPLE_CHOICE,
        FieldKindEnum.STATEMENT,
        FieldKindEnum.OPINION_SCALE,
        FieldKindEnum.EMAIL,
        FieldKindEnum.FULL_NAME
      ]
    }
  ],
  [
    {
      name: 'form.builder.question.contactInfo',
      list: [
        FieldKindEnum.PHONE_NUMBER,
        FieldKindEnum.EMAIL,
        FieldKindEnum.FULL_NAME,
        FieldKindEnum.ADDRESS,
        FieldKindEnum.COUNTRY,
        FieldKindEnum.URL
      ]
    },
    {
      name: 'form.builder.question.text',
      list: [FieldKindEnum.SHORT_TEXT, FieldKindEnum.LONG_TEXT]
    },

    {
      name: 'form.builder.question.fileUpload',
      list: [FieldKindEnum.FILE_UPLOAD]
    }
  ],
  [
    {
      name: 'form.builder.question.choices',
      list: [FieldKindEnum.MULTIPLE_CHOICE, FieldKindEnum.PICTURE_CHOICE, FieldKindEnum.YES_NO]
    },
    {
      name: 'form.builder.question.rating',
      list: [FieldKindEnum.RATING, FieldKindEnum.OPINION_SCALE]
    },
    {
      name: 'form.builder.question.date',
      list: [FieldKindEnum.DATE, FieldKindEnum.DATE_RANGE]
    },
    {
      name: 'form.builder.question.payment',
      list: [FieldKindEnum.PAYMENT]
    }
  ],
  [
    {
      name: 'form.builder.question.formStructure',
      list: [
        FieldKindEnum.GROUP,
        FieldKindEnum.STATEMENT,
        FieldKindEnum.WELCOME,
        FieldKindEnum.THANK_YOU
      ]
    },
    {
      name: 'form.builder.question.number',
      list: [FieldKindEnum.NUMBER]
    },
    {
      name: 'form.builder.question.data',
      list: [FieldKindEnum.INPUT_TABLE]
    },
    {
      name: 'form.builder.question.legalConsent',
      list: [FieldKindEnum.LEGAL_TERMS, FieldKindEnum.SIGNATURE]
    }
  ]
]

export const LAYOUT_OPTIONS = [
  {
    value: FieldLayoutAlignEnum.INLINE,
    icon: IconLayoutInline
  },
  {
    value: FieldLayoutAlignEnum.FLOAT_LEFT,
    icon: IconLayoutFloatLeft
  },
  {
    value: FieldLayoutAlignEnum.FLOAT_RIGHT,
    icon: IconLayoutFloatRight
  },
  {
    value: FieldLayoutAlignEnum.SPLIT_LEFT,
    icon: IconLayoutSplitLeft
  },
  {
    value: FieldLayoutAlignEnum.SPLIT_RIGHT,
    icon: IconLayoutSplitRight
  },
  {
    value: FieldLayoutAlignEnum.COVER,
    icon: IconLayoutCover
  }
]

export const DATE_FORMAT_OPTIONS = [
  {
    label: 'MM/DD/YYYY',
    value: 'MM/DD/YYYY'
  },
  {
    label: 'DD/MM/YYYY',
    value: 'DD/MM/YYYY'
  },
  {
    label: 'YYYY/MM/DD',
    value: 'YYYY/MM/DD'
  },
  {
    label: 'MM-DD-YYYY',
    value: 'MM-DD-YYYY'
  },
  {
    label: 'DD-MM-YYYY',
    value: 'DD-MM-YYYY'
  },
  {
    label: 'YYYY-MM-DD',
    value: 'YYYY-MM-DD'
  },
  {
    label: 'MM.DD.YYYY',
    value: 'MM.DD.YYYY'
  },
  {
    label: 'DD.MM.YYYY',
    value: 'DD.MM.YYYY'
  },
  {
    label: 'YYYY.MM.DD',
    value: 'YYYY.MM.DD'
  }
]

export const DATE_FORMAT_MAPS: AnyMap = {
  'MM/DD/YYYY': ['MM', 'DD', 'YYYY', '/'],
  'DD/MM/YYYY': ['DD', 'MM', 'YYYY', '/'],
  'YYYY/MM/DD': ['YYYY', 'MM', 'DD', '/'],
  'MM-DD-YYYY': ['MM', 'DD', 'YYYY', '-'],
  'DD-MM-YYYY': ['DD', 'MM', 'YYYY', '-'],
  'YYYY-MM-DD': ['YYYY', 'MM', 'DD', '-'],
  'MM.DD.YYYY': ['MM', 'DD', 'YYYY', '.'],
  'DD.MM.YYYY': ['DD', 'MM', 'YYYY', '.'],
  'YYYY.MM.DD': ['YYYY', 'MM', 'DD', '.'],
  'HH:mm': ['HH', 'mm', ':']
}

export const DATE_FORMAT_NAMES: AnyMap = {
  YYYY: {
    id: 'year',
    label: 'Year'
  },
  MM: {
    id: 'month',
    label: 'Month'
  },
  DD: {
    id: 'day',
    label: 'Day'
  },
  HH: {
    id: 'hour',
    label: 'Hour'
  },
  mm: {
    id: 'minute',
    label: 'Minute'
  }
}

export const FORM_EMBED_OPTIONS = [
  {
    value: 'standard',
    label: 'form.share.embed.standard',
    icon: IconStandard
  },
  {
    value: 'modal',
    label: 'form.share.embed.modal',
    icon: IconModal
  },
  {
    value: 'popup',
    label: 'form.share.embed.popup',
    icon: IconPopup
  },
  {
    value: 'fullpage',
    label: 'form.share.embed.fullpage',
    icon: IconFullPage
  }
]

export const DEFAULT_EMBED_CONFIGS = {
  standard: {
    widthType: '%',
    width: 100,
    heightType: 'px',
    height: 500,
    autoResizeHeight: true
  },
  modal: {
    size: 'large',
    openTrigger: 'click',
    openDelay: 5,
    openScrollPercent: 30,
    triggerBackground: '#1d4ed8',
    triggerText: 'Open Form',
    hideAfterSubmit: false,
    autoClose: 5
  },
  popup: {
    position: 'bottom-right',
    width: 420,
    height: 540,
    openTrigger: 'click',
    openDelay: 5,
    openScrollPercent: 30,
    triggerBackground: '#1d4ed8',
    hideAfterSubmit: false,
    autoClose: 5
  },
  fullpage: {
    transparentBackground: false
  }
}

export const INTEGRATION_CATEGORIES = [
  { value: 'Reporting', label: 'form.integrations.reporting' },
  { value: 'Analytics', label: 'form.integrations.analytics' },
  { value: 'Marketing', label: 'form.integrations.marketing' },
  { value: 'Automation', label: 'form.integrations.automation' },
  { value: 'Customer Support', label: 'form.integrations.customerSupport' },
  { value: 'Productivity', label: 'form.integrations.productivity' },
  { value: 'IT & Engineering', label: 'form.integrations.itEngineering' },
  { value: 'File Management', label: 'form.integrations.fileManagement' }
]

export enum APP_STATUS_ENUM {
  PENDING = 0,
  ACTIVE = 1,
  REDIRECT_TO_EXTERNAL = 2
}

export enum INTEGRATION_STATUS_ENUM {
  PERMITTED = 0,
  ACTIVE = 1,
  DISABLED
}

export const FORM_THEMES = [
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#000',
    answerTextColor: '#0445AF',
    buttonBackground: '#0445AF',
    buttonTextColor: '#fff',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#3D3D3D',
    answerTextColor: '#4FB0AE',
    buttonBackground: '#4FB0AE',
    buttonTextColor: '#fff',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#37404a',
    answerTextColor: '#5c5c5c',
    buttonBackground: '#37404a',
    buttonTextColor: '#fff',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#ecddc2',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-01.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#FBC4AD',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-02.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#b1cbc0',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-03.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#9f5318',
    answerTextColor: '#cb732b',
    buttonBackground: '#cb732b',
    buttonTextColor: '#fff',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#b89837',
    answerTextColor: '#e4ba3f',
    buttonBackground: '#e4ba3f',
    buttonTextColor: '#000',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#5b9d6f',
    answerTextColor: '#7dbb91',
    buttonBackground: '#7dbb91',
    buttonTextColor: '#000',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Lato',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#F9F9F9',
    buttonTextColor: '#7A7A7A',
    backgroundColor: '#83cbcc',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-04.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#3D3D3D',
    answerTextColor: '#6E5C31',
    buttonBackground: '#8A763F',
    buttonTextColor: '#fff',
    backgroundColor: '#d5cdbb',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-05.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Lato',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#F9ADA8',
    buttonTextColor: '#98130B',
    backgroundColor: '#26317e',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-06.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Georgia',
    questionTextColor: '#2A3146',
    answerTextColor: '#C44665',
    buttonBackground: '#2A3146',
    buttonTextColor: '#F5F6F9',
    backgroundColor: '#e5e1da',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-07.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Sniglet',
    questionTextColor: '#3D3D3D',
    answerTextColor: '#437E93',
    buttonBackground: '#97D5E2',
    buttonTextColor: '#1B535F',
    backgroundColor: '#f2eee9',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-08.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Raleway',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#FBFBFB',
    buttonTextColor: '#7C7C7C',
    backgroundColor: '#0b0b0b',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-09.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Heebo',
    questionTextColor: '#262627',
    answerTextColor: '#000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#fabf7a',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-10.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Heebo',
    questionTextColor: '#262627',
    answerTextColor: '#000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#6FD3B7',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-11.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Heebo',
    questionTextColor: '#262627',
    answerTextColor: '#000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#71a8ca',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-12.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#262626',
    answerTextColor: '#262626',
    buttonBackground: '#262626',
    buttonTextColor: '#E5E5E5',
    backgroundColor: '#F1ECE2',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Montserrat',
    questionTextColor: '#262626',
    answerTextColor: '#262626',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#e3d8df',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-13.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#F1ECE2',
    answerTextColor: '#F1ECE2',
    buttonBackground: '#F1ECE2',
    buttonTextColor: '#F1ECE2',
    backgroundColor: '#262626',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#000000',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#9BD7CF',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-14.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#000000',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#F1ECE3',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-15.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#000000',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#FEB494',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-16.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Oswald',
    questionTextColor: '#040404',
    answerTextColor: '#000000',
    buttonBackground: '#252525',
    buttonTextColor: '#E4E4E4',
    backgroundColor: '#F9CD48',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Lekton',
    questionTextColor: '#040404',
    answerTextColor: '#7E7E7E',
    buttonBackground: '#5182E0',
    buttonTextColor: '#08142A',
    backgroundColor: '#F3F3F3',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Arvo',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#407FD4',
    buttonBackground: '#4DC950',
    buttonTextColor: '#1e1e45',
    backgroundColor: '#1e1e45',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-17.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#8ed2c8',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-18.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#1f575e',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-19.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#EEC395',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-20.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#8b3249',
    answerTextColor: '#c75875',
    buttonBackground: '#c75875',
    buttonTextColor: '#18080C',
    backgroundColor: '#FFFFFF',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#7a3d7c',
    answerTextColor: '#c384c5',
    buttonBackground: '#c384c5',
    buttonTextColor: '#321832',
    backgroundColor: '#FFFFFF',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Arimo',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#2B6F75',
    buttonTextColor: '#fff',
    backgroundColor: '#1c4b51',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-21.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Arimo',
    questionTextColor: '#262627',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#F6A42B',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-22.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Arimo',
    questionTextColor: '#262627',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#cbcbcb',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-23.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#408e91',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#4fb0ae',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#cb732b',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#7dbb91',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#c384c5',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#535353',
    answerTextColor: '#1A91A2',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#d8ebeb',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-24.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Source Sans Pro',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#358BF3',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#B8CBE2',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-25.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#DAB1AD',
    buttonTextColor: '#5E2F2A',
    backgroundColor: '#7B6771',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-26.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#E0FBFF',
    buttonBackground: '#D25476',
    buttonTextColor: '#1F080E',
    backgroundColor: '#2c2c2c',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-27.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Source Sans Pro',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#141518',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-28.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Work Sans',
    questionTextColor: '#272727',
    answerTextColor: '#272727',
    buttonBackground: '#272727',
    buttonTextColor: '#E6E6E6',
    backgroundColor: '#74dba6',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-29.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#5DD2F1',
    buttonTextColor: '#063B49',
    backgroundColor: '#7159bc',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-30.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#0C0C0C',
    answerTextColor: '#0C0C0C',
    buttonBackground: '#E26D5A',
    buttonTextColor: '#340F09',
    backgroundColor: '#acb0b0',
    backgroundImage: 'https://forms.b-cdn.net/themev3/theme-background-31.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#6cbf2c',
    answerTextColor: '#89bc62',
    buttonBackground: '#c6dfb2',
    buttonTextColor: '#46672B',
    backgroundColor: '#f3f9ef',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#e66902',
    answerTextColor: '#cb732b',
    buttonBackground: '#e6bb98',
    buttonTextColor: '#663C19',
    backgroundColor: '#faf1ea',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#e6ac00',
    answerTextColor: '#e4ba3f',
    buttonBackground: '#EDD59A',
    buttonTextColor: '#735815',
    backgroundColor: '#fdf8ec',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#bf395d',
    answerTextColor: '#c75875',
    buttonBackground: '#e4adbc',
    buttonTextColor: '#6E2438',
    backgroundColor: '#faeef1',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#c968cc',
    answerTextColor: '#c384c5',
    buttonBackground: '#e2c3e3',
    buttonTextColor: '#703572',
    backgroundColor: '#f9f3fa',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#38bdcf',
    answerTextColor: '#73bec8',
    buttonBackground: '#bbe0e5',
    buttonTextColor: '#2D6C75',
    backgroundColor: '#f1f9fa',
    backgroundImage: undefined,
    backgroundBrightness: 0
  }
]

export const VARIABLE_KIND_CONFIGS = [
  {
    kind: 'number' as FieldKindEnum,
    icon: IconVariableNumber,
    label: 'form.builder.question.number',
    textColor: '#fff',
    backgroundColor: '#09090B'
  },
  {
    kind: 'string' as FieldKindEnum,
    icon: IconVariableString,
    label: 'form.builder.question.string',
    textColor: '#fff',
    backgroundColor: '#09090B'
  }
]

export const VARIABLE_INPUT_TYPES: AnyMap = {
  number: 'number',
  string: 'text'
}

export const SINGLE_CHOICE_CONDITIONS = [
  {
    value: 'is',
    label: 'form.builder.logic.rule.is'
  },
  {
    value: 'is_not',
    label: 'form.builder.logic.rule.isNot'
  }
]

export const TRUE_FALSE_CONDITIONS = [
  {
    value: true,
    label: 'form.builder.logic.rule.true'
  },
  {
    value: false,
    label: 'form.builder.logic.rule.false'
  }
]

export const MULTIPLE_CHOICE_CONDITIONS = [
  ...SINGLE_CHOICE_CONDITIONS,
  {
    value: 'contains',
    label: 'form.builder.logic.rule.contains'
  },
  {
    value: 'does_not_contain',
    label: 'form.builder.logic.rule.doesNotContain'
  }
]

export const TEXT_CONDITIONS = [
  ...MULTIPLE_CHOICE_CONDITIONS,
  {
    value: 'starts_with',
    label: 'form.builder.logic.rule.startsWith'
  },
  {
    value: 'ends_with',
    label: 'form.builder.logic.rule.endsWith'
  }
]

export const DATE_CONDITIONS = [
  ...SINGLE_CHOICE_CONDITIONS,
  {
    value: 'is_before',
    label: 'form.builder.logic.rule.isBefore'
  },
  {
    value: 'is_after',
    label: 'form.builder.logic.rule.isAfter'
  }
]

export const NUMBER_CONDITIONS = [
  {
    value: 'equal',
    label: 'form.builder.logic.rule.equal'
  },
  {
    value: 'not_equal',
    label: 'form.builder.logic.rule.notEqual'
  },
  {
    value: 'greater_than',
    label: 'form.builder.logic.rule.greaterThan'
  },
  {
    value: 'greater_or_equal_than',
    label: 'form.builder.logic.rule.greaterOrEqualThan'
  },
  {
    value: 'less_or_equal_than',
    label: 'form.builder.logic.rule.lessOrEqualThan'
  }
]

export const DEFAULT_COMPARISONS = [
  {
    value: 'is_empty',
    label: 'form.builder.logic.rule.isEmpty'
  },
  {
    value: 'is_not_empty',
    label: 'form.builder.logic.rule.isNotEmpty'
  }
]

export const ACTIONS = [
  {
    value: 'navigate',
    label: 'form.builder.logic.rule.navigate'
  },
  {
    value: 'calculate',
    label: 'form.builder.logic.rule.calculate'
  }
]

export const OPERATORS = [
  {
    value: 'addition',
    label: 'form.builder.logic.rule.addition'
  },
  {
    value: 'subtraction',
    label: 'form.builder.logic.rule.subtraction'
  },
  {
    value: 'multiplication',
    label: 'form.builder.logic.rule.multiplication'
  },
  {
    value: 'division',
    label: 'form.builder.logic.rule.division'
  },
  {
    value: 'assignment',
    label: 'form.builder.logic.rule.assignment'
  }
]

export const ADD_QUESTION_STORAGE_NAME = 'ADD_QUESTION'
export const ADD_QUESTION2_STORAGE_NAME = 'ADD_QUESTION2'
export const PUBLISH_FORM_STORAGE_NAME = 'PUBLISH_FORM'
