import { FieldKindEnum } from '@/legacy_pages/models'
import { RateIconShapeEnum } from '@heyforms/form-component'
import { FormThemeV2 } from '@heyforms/shared-types-enums'
import { OptionType } from '@heyui/component'

export const SETTINGLESS_COMPONENT_KINDS = [
  FieldKindEnum.GROUP,
  FieldKindEnum.STATEMENT_LEGACY,
  FieldKindEnum.DIVIDER,
  FieldKindEnum.PAGE_BREAK
]

export const CHOICES_COMPONENT_KINDS = [FieldKindEnum.MULTIPLE_CHOICE, FieldKindEnum.PICTURE_CHOICE]

export const COMPONENT_KINDS: OptionType[] = [
  {
    id: FieldKindEnum.SHORT_TEXT,
    label: 'Short Text',
    description: 'Short answer input'
  },
  {
    id: FieldKindEnum.LONG_TEXT,
    label: 'Long Text',
    description: 'Multiline answer input'
  },
  {
    id: FieldKindEnum.SINGLE_CHOICE,
    label: 'Single Choice',
    description: 'Can only choose one choices'
  },
  {
    id: FieldKindEnum.MULTIPLE_CHOICE,
    label: 'Multiple Choice',
    description: 'Can choose multiple choices'
  },
  {
    id: FieldKindEnum.YES_NO,
    label: 'Yes or No',
    description: 'Select one from yes or no'
  },
  {
    id: FieldKindEnum.OPINION_SCALE,
    label: 'Opinion Scale',
    description: 'Rate through scale selection'
  },
  {
    id: FieldKindEnum.PICTURE_CHOICE,
    label: 'Picture Choice',
    description: 'Select choices with image'
  },
  {
    id: FieldKindEnum.RATING,
    label: 'Rating',
    description: 'Rate through star selection'
  },
  {
    id: FieldKindEnum.FILE_UPLOAD,
    label: 'File Upload',
    description: 'Suppliers can upload files'
  },
  {
    id: FieldKindEnum.NUMBER,
    label: 'Number',
    description: 'It only accept numbers'
  },
  {
    id: FieldKindEnum.DROPDOWN,
    label: 'Dropdown',
    description: 'Select from drop down options'
  },
  {
    id: FieldKindEnum.DATE,
    label: 'Date',
    description: 'Select date from a date picker'
  },
  {
    id: FieldKindEnum.STATEMENT_LEGACY,
    label: 'Statement',
    description: 'Describe your form in detail'
  },
  {
    id: FieldKindEnum.DIVIDER,
    label: 'Divider',
    description: 'Divides form contents'
  },
  {
    id: FieldKindEnum.PAGE_BREAK,
    label: 'Page Break',
    description: 'Split form into several pages'
  },
  {
    id: FieldKindEnum.FULL_NAME,
    label: 'Full Name',
    description: 'Suppliers can input full name'
  },
  {
    id: FieldKindEnum.EMAIL,
    label: 'Email',
    description: 'It only accept email address'
  },
  {
    id: FieldKindEnum.ADDRESS,
    label: 'Address',
    description: 'Suppliers can input full address'
  },
  {
    id: FieldKindEnum.PHONE_NUMBER,
    label: 'Phone Number',
    description: 'It only accept phone number'
  },
  {
    id: FieldKindEnum.SIGNATURE,
    label: 'Signature',
    description: 'Suppliers can create signature'
  },
  {
    id: FieldKindEnum.COUNTRY,
    label: 'Country Selector',
    description: 'Select one from countries'
  },
  {
    id: FieldKindEnum.CODE_BLOCK,
    label: 'Code Block',
    description: 'Source code input'
  },
  {
    id: FieldKindEnum.URL,
    label: 'URL Address',
    description: 'It only accept http or https URL'
  },
  {
    id: FieldKindEnum.LEGAL_TERMS,
    label: 'Legal Terms',
    description: 'Suppliers can accept your terms or not'
  }
]

export const RATING_SHAPES: OptionType[] = [
  {
    id: RateIconShapeEnum.STAR,
    label: 'Star'
  },
  {
    id: RateIconShapeEnum.HEART,
    label: 'Heart'
  },
  {
    id: RateIconShapeEnum.THUMB_UP,
    label: 'ThumbUp'
  },
  {
    id: RateIconShapeEnum.HAPPY,
    label: 'Happy'
  }
]

export const DATE_FORMATS: OptionType[] = [
  {
    id: 'YYYY-MM-DD',
    label: 'YYYY-MM-DD'
  },
  {
    id: 'MM-DD-YYYY',
    label: 'MM-DD-YYYY'
  },
  {
    id: 'DD-MM-YYYY',
    label: 'DD-MM-YYYY'
  },
  {
    id: 'YYYY/MM/DD',
    label: 'YYYY/MM/DD'
  },
  {
    id: 'MM/DD/YYYY',
    label: 'MM/DD/YYYY'
  },
  {
    id: 'DD/MM/YYYY',
    label: 'DD/MM/YYYY'
  },
  {
    id: 'YYYY.MM.DD',
    label: 'YYYY.MM.DD'
  },
  {
    id: 'MM.DD.YYYY',
    label: 'MM.DD.YYYY'
  },
  {
    id: 'DD.MM.YYYY',
    label: 'DD.MM.YYYY'
  }
]

export const TITLE_FONT_SIZES_OPTIONS: OptionType[] = [
  24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54
].map(row => ({
  id: `${row}px`,
  label: `${row}px`
}))

export const QUESTION_FONT_SIZES_OPTIONS: OptionType[] = [
  16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36
].map(row => ({
  id: `${row}px`,
  label: `${row}px`
}))

export const ANSWER_FONT_SIZES_OPTIONS: OptionType[] = [14, 16, 18, 20, 22, 24, 26, 28, 30].map(
  row => ({
    id: `${row}px`,
    label: `${row}px`
  })
)

export const GOOGLE_FONTS = [
  'Public Sans',
  'Inter',
  'Montserrat',
  'Alegreya',
  'B612',
  'Muli',
  'Titillium Web',
  'Varela',
  'Vollkorn',
  'IBM Plex Mono',
  'Crimson Text',
  'Cairo',
  'BioRhyme',
  'Karla',
  'Lora',
  'Frank Ruhl Libre',
  'Playfair Display',
  'Archivo',
  'Spectral',
  'Fjalla One',
  'Roboto',
  'Rubik',
  'Source Sans Pro',
  'Cardo',
  'Cormorant',
  'Work Sans',
  'Rakkas',
  'Concert One',
  'Yatra One',
  'Arvo',
  'Lato',
  'Abril Fatface',
  'Ubuntu',
  'PT Serif',
  'Old Standard TT',
  'Oswald',
  'Open Sans',
  'Courier Prime',
  'Poppins',
  'Josefin Sans',
  'Fira Sans',
  'Nunito',
  'Exo 2',
  'Merriweather',
  'Noto Sans'
]

export const FONT_FAMILY_OPTIONS: OptionType[] = [
  {
    id: '-apple-system, BlinkMacSystemFont, Helvetica, Roboto, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", STXihei, "Microsoft YaHei", SimHei, "WenQuanYi Micro Hei", serif',
    label: 'System font'
  },
  ...GOOGLE_FONTS.map(id => ({
    id,
    label: id
  }))
]

export const FORM_THEMES: FormThemeV2[] = [
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: '#FFF',
    title: '#000',
    titleFontSize: '32px',
    question: '#000',
    questionFontSize: '16px',
    answer: '#000',
    answerFontSize: '14px',
    button: 'rgb(17, 106, 242)',
    buttonText: '#fff'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(38, 49, 126)',
    title: '#FFF',
    titleFontSize: '32px',
    question: '#FFF',
    questionFontSize: '16px',
    answer: '#FFF',
    answerFontSize: '14px',
    button: '#FFF',
    buttonText: 'rgb(38, 49, 126)'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: '#FFF',
    title: 'rgb(55, 53, 47)',
    titleFontSize: '32px',
    question: '#000',
    questionFontSize: '16px',
    answer: 'rgb(134, 134, 134)',
    answerFontSize: '14px',
    button: '#000',
    buttonText: '#FFF'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(38, 38, 38)',
    title: '#FFF',
    titleFontSize: '32px',
    question: '#FFF',
    questionFontSize: '16px',
    answer: '#FFF',
    answerFontSize: '14px',
    button: '#FFF',
    buttonText: 'rgb(38, 38, 38)'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(64, 142, 145)',
    title: '#FFF',
    titleFontSize: '32px',
    question: '#FFF',
    questionFontSize: '16px',
    answer: '#FFF',
    answerFontSize: '14px',
    button: '#FFF',
    buttonText: 'rgb(64, 142, 145)'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(249, 205, 72)',
    title: '#000',
    titleFontSize: '32px',
    question: '#000',
    questionFontSize: '16px',
    answer: '#000',
    answerFontSize: '14px',
    button: '#000',
    buttonText: '#fff'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(254, 180, 148)',
    title: '#000',
    titleFontSize: '32px',
    question: '#000',
    questionFontSize: '16px',
    answer: '#000',
    answerFontSize: '14px',
    button: '#000',
    buttonText: '#fff'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(250, 250, 250)',
    title: 'rgba(56, 189, 207)',
    titleFontSize: '32px',
    question: 'rgba(56, 189, 207)',
    questionFontSize: '16px',
    answer: 'rgba(56, 189, 207, 0.7)',
    answerFontSize: '14px',
    button: 'rgba(56, 189, 207)',
    buttonText: '#fff'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(243, 249, 239)',
    title: 'rgb(108, 191, 44)',
    titleFontSize: '32px',
    question: 'rgb(108, 191, 44)',
    questionFontSize: '16px',
    answer: 'rgba(108, 191, 44, 0.7)',
    answerFontSize: '14px',
    button: 'rgb(108, 191, 44)',
    buttonText: '#fff'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(250, 238, 241)',
    title: 'rgb(191, 57, 93)',
    titleFontSize: '32px',
    question: 'rgb(191, 57, 93)',
    questionFontSize: '16px',
    answer: 'rgba(191, 57, 93, 0.7)',
    answerFontSize: '14px',
    button: 'rgb(191, 57, 93)',
    buttonText: '#fff'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(253, 248, 236)',
    title: 'rgb(230, 172, 0)',
    titleFontSize: '32px',
    question: 'rgb(230, 172, 0)',
    questionFontSize: '16px',
    answer: 'rgba(230, 172, 0, 0.7)',
    answerFontSize: '14px',
    button: 'rgb(230, 172, 0)',
    buttonText: '#fff'
  },
  {
    fontFamily: 'Public Sans',
    fontSize: '14px',
    lineHeight: '1.2857',
    background: 'rgb(131, 203, 204)',
    title: '#FFF',
    titleFontSize: '32px',
    question: '#FFF',
    questionFontSize: '16px',
    answer: '#FFF',
    answerFontSize: '14px',
    button: '#FFF',
    buttonText: 'rgb(131, 203, 204)'
  }
]
