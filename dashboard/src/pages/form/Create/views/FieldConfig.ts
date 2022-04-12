import {
  ImageIcon,
  LongTextIcon,
  ShortTextIcon,
  SignatureIcon,
  StatementIcon,
  ThankYouIcon,
  WebsiteIcon,
  WelcomeIcon,
  YesOrNoIcon
} from '@/components'
import {
  CalendarIcon,
  ChartBarIcon,
  CheckIcon,
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
  label: 'Welcome',
  textColor: '#334155',
  backgroundColor: '#e5e7eb'
}

export const FIELD_THANK_YOU_CONFIG = {
  kind: FieldKindEnum.THANK_YOU,
  icon: ThankYouIcon,
  label: 'Thank you',
  textColor: '#334155',
  backgroundColor: '#e5e7eb'
}

export const FIELD_QUESTION_CONFIGS = [
  {
    kind: FieldKindEnum.MULTIPLE_CHOICE,
    icon: CheckIcon,
    label: 'Multiple Choice',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.PHONE_NUMBER,
    icon: PhoneIcon,
    label: 'Phone Number',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.SHORT_TEXT,
    icon: ShortTextIcon,
    label: 'Short Text',
    textColor: '#15803d',
    backgroundColor: '#dcfce7'
  },
  {
    kind: FieldKindEnum.LONG_TEXT,
    icon: LongTextIcon,
    label: 'Long Text',
    textColor: '#15803d',
    backgroundColor: '#dcfce7'
  },
  {
    kind: FieldKindEnum.STATEMENT,
    icon: StatementIcon,
    label: 'Statement',
    textColor: '#334155',
    backgroundColor: '#e5e7eb'
  },
  {
    kind: FieldKindEnum.PICTURE_CHOICE,
    icon: ImageIcon,
    label: 'Picture Choice',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.YES_NO,
    icon: YesOrNoIcon,
    label: 'Yes/No',
    textColor: '#b91c1c',
    backgroundColor: '#fee2e2'
  },
  {
    kind: FieldKindEnum.EMAIL,
    icon: MailIcon,
    label: 'Email',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.FULL_NAME,
    icon: UserIcon,
    label: 'Full Name',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.RATING,
    icon: StarIcon,
    label: 'Rating',
    textColor: '#a21caf',
    backgroundColor: '#fae8ff'
  },
  {
    kind: FieldKindEnum.OPINION_SCALE,
    icon: ChartBarIcon,
    label: 'Opinion Scale',
    textColor: '#a21caf',
    backgroundColor: '#fae8ff'
  },
  {
    kind: FieldKindEnum.DATE,
    icon: CalendarIcon,
    label: 'Date',
    textColor: '#047857',
    backgroundColor: '#d1fae5'
  },
  {
    kind: FieldKindEnum.NUMBER,
    icon: HashtagIcon,
    label: 'Number',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.FILE_UPLOAD,
    icon: UploadIcon,
    label: 'File Upload',
    textColor: '#c2410c',
    backgroundColor: '#ffedd5'
  },
  {
    kind: FieldKindEnum.ADDRESS,
    icon: LocationMarkerIcon,
    label: 'Address',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.COUNTRY,
    icon: GlobeIcon,
    label: 'Country',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  },
  {
    kind: FieldKindEnum.LEGAL_TERMS,
    icon: LibraryIcon,
    label: 'Legal Terms',
    textColor: '#a16207',
    backgroundColor: '#fef9c3'
  },
  {
    kind: FieldKindEnum.SIGNATURE,
    icon: SignatureIcon,
    label: 'Signature',
    textColor: '#a16207',
    backgroundColor: '#fef9c3'
  },
  {
    kind: FieldKindEnum.URL,
    icon: WebsiteIcon,
    label: 'Website',
    textColor: '#0369a1',
    backgroundColor: '#e0f2fe'
  }
]

export const FIELD_CONFIGS: FieldConfig[] = [
  FIELD_WELCOME_CONFIG,
  FIELD_THANK_YOU_CONFIG,
  ...FIELD_QUESTION_CONFIGS
]

export const BLOCK_GROUPS: FieldGroup[] = [
  {
    name: 'Recommended',
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
    name: 'Contact info',
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
    name: 'Choices',
    list: [FieldKindEnum.MULTIPLE_CHOICE, FieldKindEnum.PICTURE_CHOICE, FieldKindEnum.YES_NO]
  },
  {
    name: 'Text',
    list: [FieldKindEnum.SHORT_TEXT, FieldKindEnum.LONG_TEXT]
  },
  {
    name: 'Number',
    list: [FieldKindEnum.NUMBER]
  },
  {
    name: 'Rating',
    list: [FieldKindEnum.RATING, FieldKindEnum.OPINION_SCALE]
  },
  {
    name: 'Legal & consent',
    list: [FieldKindEnum.LEGAL_TERMS, FieldKindEnum.SIGNATURE]
  },
  {
    name: 'Date',
    list: [FieldKindEnum.DATE]
  },
  {
    name: 'Form structure',
    list: [FieldKindEnum.WELCOME, FieldKindEnum.THANK_YOU, FieldKindEnum.STATEMENT]
  },
  {
    name: 'File upload',
    list: [FieldKindEnum.FILE_UPLOAD]
  }
]
