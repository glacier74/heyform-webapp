import {
  DateRangeIcon,
  DateTimeIcon,
  ImageIcon,
  LongTextIcon,
  ShortTextIcon,
  SignatureIcon,
  StatementIcon,
  TableIcon,
  ThankYouIcon,
  WebsiteIcon,
  WelcomeIcon,
  YesOrNoIcon
} from '@/components'
import {
  ChartBarIcon,
  CheckIcon,
  FolderIcon,
  GlobeIcon,
  HashtagIcon,
  LibraryIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  StarIcon,
  UploadIcon,
  UserIcon
} from '@heroicons/react/outline'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import type { FC } from 'react'

export interface FieldConfig {
  kind: FieldKindEnum
  textColor: string
  backgroundColor: string
  icon: FC<any>
  label: string
}

export interface FieldGroup {
  name: string
  list: FieldKindEnum[]
  configs?: FieldConfig[]
}

export const FIELD_WELCOME_CONFIG = {
  kind: FieldKindEnum.WELCOME,
  icon: WelcomeIcon,
  label: 'formBuilder.welcome',
  textColor: '#334155',
  backgroundColor: '#e5e7eb'
}

export const FIELD_THANK_YOU_CONFIG = {
  kind: FieldKindEnum.THANK_YOU,
  icon: ThankYouIcon,
  label: 'formBuilder.thankYou',
  textColor: '#334155',
  backgroundColor: '#e5e7eb'
}

export const FIELD_QUESTION_CONFIGS = [
  {
    kind: FieldKindEnum.MULTIPLE_CHOICE,
    icon: CheckIcon,
    label: 'formBuilder.multipleChoice',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.PHONE_NUMBER,
    icon: PhoneIcon,
    label: 'formBuilder.phoneNumber',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.SHORT_TEXT,
    icon: ShortTextIcon,
    label: 'formBuilder.shortText',
    textColor: '#15803d',
    backgroundColor: '#dcfce7'
  },
  {
    kind: FieldKindEnum.LONG_TEXT,
    icon: LongTextIcon,
    label: 'formBuilder.longText',
    textColor: '#15803d',
    backgroundColor: '#dcfce7'
  },
  {
    kind: FieldKindEnum.GROUP,
    icon: FolderIcon,
    label: 'formBuilder.questionGroup',
    textColor: '#334155',
    backgroundColor: '#e5e7eb'
  },
  {
    kind: FieldKindEnum.STATEMENT,
    icon: StatementIcon,
    label: 'formBuilder.statement',
    textColor: '#334155',
    backgroundColor: '#e5e7eb'
  },
  {
    kind: FieldKindEnum.PICTURE_CHOICE,
    icon: ImageIcon,
    label: 'formBuilder.pictureChoice',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.YES_NO,
    icon: YesOrNoIcon,
    label: 'formBuilder.yesNo',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.EMAIL,
    icon: MailIcon,
    label: 'formBuilder.email',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.FULL_NAME,
    icon: UserIcon,
    label: 'formBuilder.fullName',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.RATING,
    icon: StarIcon,
    label: 'formBuilder.rating',
    textColor: '#a21caf',
    backgroundColor: '#fae8ff'
  },
  {
    kind: FieldKindEnum.OPINION_SCALE,
    icon: ChartBarIcon,
    label: 'formBuilder.opinionScale',
    textColor: '#a21caf',
    backgroundColor: '#fae8ff'
  },
  {
    kind: FieldKindEnum.DATE,
    icon: DateTimeIcon,
    label: 'formBuilder.dateTime',
    textColor: '#047857',
    backgroundColor: '#d1fae5'
  },
  {
    kind: FieldKindEnum.DATE_RANGE,
    icon: DateRangeIcon,
    label: 'formBuilder.dateRange',
    textColor: '#047857',
    backgroundColor: '#d1fae5'
  },
  {
    kind: FieldKindEnum.NUMBER,
    icon: HashtagIcon,
    label: 'formBuilder.number',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.FILE_UPLOAD,
    icon: UploadIcon,
    label: 'formBuilder.fileUpload',
    textColor: '#0f766e',
    backgroundColor: '#ccfbf1'
  },
  {
    kind: FieldKindEnum.ADDRESS,
    icon: LocationMarkerIcon,
    label: 'formBuilder.address',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.COUNTRY,
    icon: GlobeIcon,
    label: 'formBuilder.country',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.LEGAL_TERMS,
    icon: LibraryIcon,
    label: 'formBuilder.legalTerms',
    textColor: '#a16207',
    backgroundColor: '#fef9c3'
  },
  {
    kind: FieldKindEnum.SIGNATURE,
    icon: SignatureIcon,
    label: 'formBuilder.signature',
    textColor: '#a16207',
    backgroundColor: '#fef9c3'
  },
  {
    kind: FieldKindEnum.URL,
    icon: WebsiteIcon,
    label: 'formBuilder.website',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.INPUT_TABLE,
    icon: TableIcon,
    label: 'formBuilder.inputTable',
    textColor: '#c2410c',
    backgroundColor: '#ffedd5'
  }
]

export const FIELD_CONFIGS: FieldConfig[] = [
  ...FIELD_QUESTION_CONFIGS,
  FIELD_WELCOME_CONFIG,
  FIELD_THANK_YOU_CONFIG
]

export const BLOCK_GROUPS: FieldGroup[] = [
  {
    name: 'formBuilder.recommended',
    list: [
      FieldKindEnum.SHORT_TEXT,
      FieldKindEnum.MULTIPLE_CHOICE,
      FieldKindEnum.STATEMENT,
      FieldKindEnum.OPINION_SCALE,
      FieldKindEnum.EMAIL,
      FieldKindEnum.FULL_NAME
    ]
  },
  {
    name: 'formBuilder.contactInfo',
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
    name: 'formBuilder.choices',
    list: [FieldKindEnum.MULTIPLE_CHOICE, FieldKindEnum.PICTURE_CHOICE, FieldKindEnum.YES_NO]
  },
  {
    name: 'formBuilder.text',
    list: [FieldKindEnum.SHORT_TEXT, FieldKindEnum.LONG_TEXT]
  },
  {
    name: 'formBuilder.number',
    list: [FieldKindEnum.NUMBER]
  },
  {
    name: 'formBuilder.rating',
    list: [FieldKindEnum.RATING, FieldKindEnum.OPINION_SCALE]
  },
  {
    name: 'formBuilder.legalConsent',
    list: [FieldKindEnum.LEGAL_TERMS, FieldKindEnum.SIGNATURE]
  },
  {
    name: 'formBuilder.date',
    list: [FieldKindEnum.DATE, FieldKindEnum.DATE_RANGE]
  },
  {
    name: 'formBuilder.formStructure',
    list: [
      FieldKindEnum.GROUP,
      FieldKindEnum.STATEMENT,
      FieldKindEnum.WELCOME,
      FieldKindEnum.THANK_YOU
    ]
  },
  {
    name: 'formBuilder.data',
    list: [FieldKindEnum.INPUT_TABLE]
  },
  {
    name: 'formBuilder.fileUpload',
    list: [FieldKindEnum.FILE_UPLOAD]
  }
]
