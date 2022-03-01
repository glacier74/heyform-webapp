import {
  AddressIcon,
  CodeIcon,
  ContactIcon,
  CountryIcon,
  DateIcon,
  DividingLineIcon,
  EmailAtIcon,
  EmbedIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  LegalTermsIcon,
  LinkIcon,
  LongTextIcon,
  MultipleChoiceIcon,
  NumberIcon,
  OpinionScaleIcon,
  PageBreakIcon,
  PictureIcon,
  ShortTextIcon,
  SignatureIcon,
  SingleChoiceIcon,
  StarIcon,
  TextIcon,
  ThankIcon,
  UploadIcon,
  WelcomeIcon,
  YesNoIcon
} from '@/legacy_pages/components/Icons'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { OptionType } from '@heyui/component'
import { PhoneIcon } from '@heyui/icon'

export interface BlockOption {
  name: string
  children: OptionType[]
}

export const BLOCK_OPTIONS: BlockOption[] = [
  {
    name: 'Basic',
    children: [
      {
        id: FieldKindEnum.SHORT_TEXT,
        icon: <ShortTextIcon />,
        text: 'Short Text'
      },
      {
        id: FieldKindEnum.LONG_TEXT,
        icon: <LongTextIcon />,
        text: 'Long Text'
      },
      {
        id: FieldKindEnum.SINGLE_CHOICE,
        icon: <SingleChoiceIcon />,
        text: 'Single Choice'
      },
      {
        id: FieldKindEnum.MULTIPLE_CHOICE,
        icon: <MultipleChoiceIcon />,
        text: 'Multiple Choice'
      },
      {
        id: FieldKindEnum.YES_NO,
        icon: <YesNoIcon />,
        text: 'Yes or No'
      },
      {
        id: FieldKindEnum.RATING,
        icon: <StarIcon />,
        text: 'Rating'
      },
      {
        id: FieldKindEnum.OPINION_SCALE,
        icon: <OpinionScaleIcon />,
        text: 'Opinion Scale'
      },
      {
        id: FieldKindEnum.PICTURE_CHOICE,
        icon: <PictureIcon />,
        text: 'Picture Choice'
      },
      {
        id: FieldKindEnum.FILE_UPLOAD,
        icon: <UploadIcon />,
        text: 'File Upload'
      },
      {
        id: FieldKindEnum.NUMBER,
        icon: <NumberIcon />,
        text: 'Number'
      },
      {
        id: FieldKindEnum.DATE,
        icon: <DateIcon />,
        text: 'Date'
      }
    ]
  },
  {
    name: 'Statement',
    children: [
      {
        id: FieldKindEnum.HEADING_1,
        text: 'Heading 1',
        icon: <Heading1Icon />
      },
      {
        id: FieldKindEnum.HEADING_2,
        text: 'Heading 2',
        icon: <Heading2Icon />
      },
      {
        id: FieldKindEnum.HEADING_3,
        text: 'Heading 3',
        icon: <Heading3Icon />
      },
      {
        id: FieldKindEnum.TEXT,
        text: 'Text',
        icon: <TextIcon />
      },
      {
        id: FieldKindEnum.IMAGE,
        text: 'Image',
        icon: <ImageIcon />
      },
      {
        id: FieldKindEnum.EMBED,
        text: 'Embed',
        icon: <EmbedIcon />
      },
      {
        id: FieldKindEnum.DIVIDER,
        icon: <DividingLineIcon />,
        text: 'Divider'
      },
      {
        id: FieldKindEnum.PAGE_BREAK,
        icon: <PageBreakIcon />,
        text: 'Page Break'
      },
      {
        id: FieldKindEnum.WELCOME,
        icon: <WelcomeIcon />,
        text: 'Welcome Page'
      },
      {
        id: FieldKindEnum.THANK_YOU,
        icon: <ThankIcon />,
        text: 'Thank You Page'
      }
    ]
  },
  {
    name: 'Fieldset',
    children: [
      {
        id: FieldKindEnum.FULL_NAME,
        icon: <ContactIcon />,
        text: 'Full Name'
      },
      {
        id: FieldKindEnum.EMAIL,
        icon: <EmailAtIcon />,
        text: 'Email'
      },
      {
        id: FieldKindEnum.ADDRESS,
        icon: <AddressIcon />,
        text: 'Address'
      },
      {
        id: FieldKindEnum.PHONE_NUMBER,
        icon: <PhoneIcon />,
        text: 'Phone Number'
      },
      {
        id: FieldKindEnum.SIGNATURE,
        icon: <SignatureIcon />,
        text: 'Signature'
      },
      {
        id: FieldKindEnum.COUNTRY,
        icon: <CountryIcon />,
        text: 'Country Selector'
      },
      {
        id: FieldKindEnum.CODE_BLOCK,
        icon: <CodeIcon />,
        text: 'Code Block'
      },
      {
        id: FieldKindEnum.URL,
        icon: <LinkIcon />,
        text: 'URL Address'
      },
      {
        id: FieldKindEnum.LEGAL_TERMS,
        icon: <LegalTermsIcon />,
        text: 'Legal Terms'
      }
    ]
  }
]

export const DATE_FORMATS = [
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

export const RATING_SHAPES = [
  {
    id: 'star',
    label: 'Star'
  },
  {
    id: 'heart',
    label: 'Heart'
  },
  {
    id: 'thumbup',
    label: 'ThumbUp'
  },
  {
    id: 'happy',
    label: 'Happy'
  }
]

export const STYLE_OPTIONS: OptionType[] = [
  {
    id: 'list',
    label: 'List'
  },
  {
    id: 'dropdown',
    label: 'Dropdown'
  }
]

export const EMOJI_NAMES = [
  'grinning',
  'blush',
  'heart-eyes',
  'hugging-face',
  'kissing-heart',
  'joy',
  'rolling-on-the-floor-laughing',
  'ok-hand',
  'plus1',
  'point-up',
  'point-down',
  'point-left',
  'point-right',
  'v',
  'handshake',
  'clap',
  'pray',
  'heart',
  'gift',
  'jack-o-lantern',
  'christmas-tree',
  'tada',
  'bouquet',
  'rose',
  'cherry-blossom',
  'birthday',
  'postbox',
  'books',
  'school-satchel',
  'dart',
  'art',
  'moneybag',
  'telescope',
  'rainbow',
  'white-check-mark',
  'balloon',
  'warning',
  'bangbang',
  'package',
  'recycle',
  'video-game',
  'zap',
  'fire',
  'trophy',
  'sports-medal',
  'female-technologist',
  'briefcase',
  '100',
  'alarm-clock',
  'robot-face',
  'rocket',
  'airplane',
  'bullettrain-front',
  'ambulance',
  'fire-engine',
  'blue-car',
  'ship',
  'boat',
  'beach-with-umbrella',
  'unicorn-face',
  'cat',
  'dog',
  'dragon-face',
  'chicken',
  'hamster',
  'pig',
  'monkey-face',
  'snake',
  'ram',
  'tiger',
  'rabbit',
  'water-buffalo',
  'horse',
  'snowflake',
  'santa-claus-light-skin-tone',
  'snowboarder',
  'football',
  'basketball',
  'soccer',
  'pill',
  'lollipop',
  'sunflower',
  'hot-beverage',
  'leafy-green',
  'hot-pepper',
  'hamburger-1f354',
  'poultry-leg',
  'sushi',
  'popcorn',
  'takeout-box'
]
