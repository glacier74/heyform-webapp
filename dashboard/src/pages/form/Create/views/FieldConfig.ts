import {
  ConcentricCirclesIcon,
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
  CalendarIcon,
  ChartBarIcon,
  CheckIcon,
  CreditCardIcon,
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
import {
  ActionEnum,
  CalculateEnum,
  ComparisonEnum,
  FieldKindEnum
} from '@heyforms/shared-types-enums'
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

export const CUSTOM_FIELDS_CONFIGS: FieldConfig[] = [
  {
    kind: 'contact' as FieldKindEnum,
    icon: MailIcon,
    label: 'formBuilder.contact',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: 'submit_date' as FieldKindEnum,
    icon: CalendarIcon,
    label: 'formBuilder.submitDate',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.CUSTOM_TEXT,
    icon: LongTextIcon,
    label: 'formBuilder.customText',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.CUSTOM_SINGLE,
    icon: ConcentricCirclesIcon,
    label: 'formBuilder.customSingle',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  },
  {
    kind: FieldKindEnum.CUSTOM_MULTIPLE,
    icon: CheckIcon,
    label: 'formBuilder.customMultiple',
    textColor: '#1d4ed8',
    backgroundColor: '#dbeafe'
  }
]

export const FIELD_CONFIGS: FieldConfig[] = [
  FIELD_WELCOME_CONFIG,
  FIELD_THANK_YOU_CONFIG,
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
    textColor: '#059669',
    backgroundColor: '#a7f3d0'
  },
  {
    kind: FieldKindEnum.DATE_RANGE,
    icon: DateRangeIcon,
    label: 'formBuilder.dateRange',
    textColor: '#059669',
    backgroundColor: '#a7f3d0'
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
  },
  {
    kind: FieldKindEnum.PAYMENT,
    icon: CreditCardIcon,
    label: 'formBuilder.payment',
    textColor: '#a16207',
    backgroundColor: '#fef9c3'
  }
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
    name: 'formBuilder.data',
    list: [FieldKindEnum.INPUT_TABLE]
  },
  {
    name: 'formBuilder.fileUpload',
    list: [FieldKindEnum.FILE_UPLOAD]
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
    name: 'formBuilder.legalConsent',
    list: [FieldKindEnum.LEGAL_TERMS, FieldKindEnum.SIGNATURE]
  },
  {
    name: 'formBuilder.date',
    list: [FieldKindEnum.DATE, FieldKindEnum.DATE_RANGE]
  },
  {
    name: 'formBuilder.payment',
    list: [FieldKindEnum.PAYMENT]
  }
]

export const UNSELECTABLE_FIELD_KINDS = [
  FieldKindEnum.WELCOME,
  FieldKindEnum.THANK_YOU,
  FieldKindEnum.GROUP,
  FieldKindEnum.STATEMENT
]

export const SINGLE_CHOICE_CONDITIONS = [ComparisonEnum.IS, ComparisonEnum.IS_NOT]

export const SINGLE_CHOICE_CONDITION_OPTIONS = [
  {
    value: ComparisonEnum.IS,
    label: 'Is equal to'
  },
  {
    value: ComparisonEnum.IS_NOT,
    label: 'Is not equal to'
  }
]

export const MULTIPLE_CHOICE_CONDITION_OPTIONS = [
  ...SINGLE_CHOICE_CONDITION_OPTIONS,
  {
    value: ComparisonEnum.CONTAINS,
    label: 'Contains'
  },
  {
    value: ComparisonEnum.DOES_NOT_CONTAIN,
    label: 'Does not contain'
  }
]

export const TEXT_CONDITION_OPTIONS = [
  ...MULTIPLE_CHOICE_CONDITION_OPTIONS,
  {
    value: ComparisonEnum.STARTS_WITH,
    label: 'Starts with'
  },
  {
    value: ComparisonEnum.ENDS_WITH,
    label: 'Ends with'
  }
]

export const DATE_CONDITION_OPTIONS = [
  ...SINGLE_CHOICE_CONDITION_OPTIONS,
  {
    value: ComparisonEnum.IS_BEFORE,
    label: 'Is before'
  },
  {
    value: ComparisonEnum.IS_AFTER,
    label: 'Is after'
  }
]

export const NUMBER_CONDITION_OPTIONS = [
  {
    value: ComparisonEnum.EQUAL,
    label: '='
  },
  {
    value: ComparisonEnum.NOT_EQUAL,
    label: '!='
  },
  {
    value: ComparisonEnum.GREATER_THAN,
    label: '>'
  },
  {
    value: ComparisonEnum.GREATER_OR_EQUAL_THAN,
    label: '>='
  },
  {
    value: ComparisonEnum.LESS_OR_EQUAL_THAN,
    label: '<='
  }
]

export const DEFAULT_CONDITION_OPTIONS = [
  {
    value: ComparisonEnum.IS_EMPTY,
    label: 'Is empty'
  },
  {
    value: ComparisonEnum.IS_NOT_EMPTY,
    label: 'Is not empty'
  }
]

export const KIND_OPTIONS = [
  {
    value: ActionEnum.NAVIGATE,
    label: 'Jump to'
  },
  {
    value: ActionEnum.CALCULATE,
    label: 'Calculate'
  }
]

export const OPERATOR_OPTIONS = [
  {
    value: CalculateEnum.ADDITION,
    label: 'Add +'
  },
  {
    value: CalculateEnum.SUBTRACTION,
    label: 'Subtract -'
  },
  {
    value: CalculateEnum.MULTIPLICATION,
    label: 'Multiply *'
  },
  {
    value: CalculateEnum.DIVISION,
    label: 'Divide /'
  },
  {
    value: CalculateEnum.ASSIGNMENT,
    label: 'Assign ='
  }
]
