import {
  AddressIcon,
  AudienceIcon,
  CodeIcon,
  ContactIcon,
  CountryIcon,
  DateIcon,
  DividingLineIcon,
  DownCircleIcon,
  EmailAtIcon,
  LinkIcon,
  LongTextIcon,
  MultipleChoiceIcon,
  NumberIcon,
  OpinionScaleIcon,
  PageBreakIcon,
  PhoneIcon,
  PictureIcon,
  QuoteIcon,
  ShortTextIcon,
  SignatureIcon,
  SingleChoiceIcon,
  StarIcon,
  UploadIcon,
  YesNoIcon
} from '@/legacy_pages/components/Icons'
import { InternalColumnKindEnum } from '@/legacy_pages/constants'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { FC } from 'react'
import { SheetKindIconProps } from './types'

export const SheetKindIcon: FC<SheetKindIconProps> = ({ kind }) => {
  switch (kind) {
    case FieldKindEnum.LONG_TEXT:
    case FieldKindEnum.CUSTOM_TEXT:
      return <LongTextIcon />

    case FieldKindEnum.SINGLE_CHOICE:
    case FieldKindEnum.CUSTOM_SINGLE:
      return <SingleChoiceIcon />

    case FieldKindEnum.MULTIPLE_CHOICE:
    case FieldKindEnum.CUSTOM_MULTIPLE:
      return <MultipleChoiceIcon />

    case FieldKindEnum.YES_NO:
      return <YesNoIcon />

    case FieldKindEnum.RATING:
      return <StarIcon />

    case FieldKindEnum.OPINION_SCALE:
      return <OpinionScaleIcon />

    case FieldKindEnum.PICTURE_CHOICE:
      return <PictureIcon />

    case FieldKindEnum.FILE_UPLOAD:
      return <UploadIcon />

    case FieldKindEnum.NUMBER:
    case FieldKindEnum.CUSTOM_NUMBER:
      return <NumberIcon />

    case FieldKindEnum.DROPDOWN:
      return <DownCircleIcon />

    case FieldKindEnum.DATE:
    case FieldKindEnum.CUSTOM_DATE:
      return <DateIcon />

    case FieldKindEnum.EMAIL:
      return <EmailAtIcon />

    case FieldKindEnum.STATEMENT_LEGACY:
      return <QuoteIcon />

    case FieldKindEnum.DIVIDER:
      return <DividingLineIcon />

    case FieldKindEnum.PAGE_BREAK:
      return <PageBreakIcon />

    case FieldKindEnum.FULL_NAME:
      return <ContactIcon />

    case FieldKindEnum.ADDRESS:
      return <AddressIcon />

    case FieldKindEnum.PHONE_NUMBER:
      return <PhoneIcon />

    case FieldKindEnum.COUNTRY:
      return <CountryIcon />

    case FieldKindEnum.CODE_BLOCK:
      return <CodeIcon />

    case FieldKindEnum.URL:
      return <LinkIcon />

    case FieldKindEnum.SIGNATURE:
      return <SignatureIcon />

    case InternalColumnKindEnum.CONTACT:
      return <AudienceIcon />

    case InternalColumnKindEnum.SUBMIT_DATE:
      return <DateIcon />

    default:
      return <ShortTextIcon />
  }
}
