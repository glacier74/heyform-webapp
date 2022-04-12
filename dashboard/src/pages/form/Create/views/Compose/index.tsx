import { useStoreContext } from '@/pages/form/Create/store'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import type { FC } from 'react'
import {
  Address,
  Country,
  Date,
  Email,
  FileUpload,
  FullName,
  LegalTerms,
  LongText,
  MultipleChoice,
  Number,
  OpinionScale,
  PhoneNumber,
  PictureChoice,
  Rating,
  ShortText,
  Signature,
  Statement,
  ThankYou,
  Website,
  Welcome,
  YesNo
} from './Blocks'

const Fields: FC = () => {
  const { state } = useStoreContext()
  const field = state.selectedField

  if (!field) {
    return null
  }

  switch (field.kind) {
    case FieldKindEnum.ADDRESS:
      return <Address key={field.id} field={field} />

    case FieldKindEnum.COUNTRY:
      return <Country key={field.id} field={field} />

    case FieldKindEnum.DATE:
      return <Date key={field.id} field={field} />

    case FieldKindEnum.EMAIL:
      return <Email key={field.id} field={field} />

    case FieldKindEnum.FILE_UPLOAD:
      return <FileUpload key={field.id} field={field} />

    case FieldKindEnum.FULL_NAME:
      return <FullName key={field.id} field={field} />

    case FieldKindEnum.LEGAL_TERMS:
      return <LegalTerms key={field.id} field={field} />

    case FieldKindEnum.LONG_TEXT:
      return <LongText key={field.id} field={field} />

    case FieldKindEnum.MULTIPLE_CHOICE:
      return <MultipleChoice key={field.id} field={field} />

    case FieldKindEnum.NUMBER:
      return <Number key={field.id} field={field} />

    case FieldKindEnum.OPINION_SCALE:
      return <OpinionScale key={field.id} field={field} />

    case FieldKindEnum.PHONE_NUMBER:
      return <PhoneNumber key={field.id} field={field} />

    case FieldKindEnum.PICTURE_CHOICE:
      return <PictureChoice key={field.id} field={field} />

    case FieldKindEnum.RATING:
      return <Rating key={field.id} field={field} />

    case FieldKindEnum.SHORT_TEXT:
      return <ShortText key={field.id} field={field} />

    case FieldKindEnum.SIGNATURE:
      return <Signature key={field.id} field={field} />

    case FieldKindEnum.URL:
      return <Website key={field.id} field={field} />

    case FieldKindEnum.YES_NO:
      return <YesNo key={field.id} field={field} />

    case FieldKindEnum.WELCOME:
      return <Welcome key={field.id} field={field} />

    case FieldKindEnum.THANK_YOU:
      return <ThankYou key={field.id} field={field} />

    default:
      return <Statement key={field.id} field={field} />
  }
}

export const Compose = () => {
  return (
    <div className="compose">
      <div className="compose-container">
        <Fields />
      </div>
    </div>
  )
}
