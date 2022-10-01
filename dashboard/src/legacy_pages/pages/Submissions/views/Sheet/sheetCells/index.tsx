import {InternalColumnKindEnum} from '@/legacy_pages/constants'
import {SheetCellProps} from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import {FieldKindEnum} from '@heyforms/shared-types-enums'
import {FC} from 'react'
import {AddressCell} from './AddressCell'
import {ContactCell} from './ContactCell'
import {CustomMultipleCell} from './CustomMultipleCell'
import {CustomTextCell} from './CustomTextCell'
import {DateRangeCell} from './DateRangeCell'
import {DropPickerCell} from './DropPickerCell'
import {FileUploadCell} from './FileUploadCell'
import {FullNameCell} from './FullNameCell'
import {InputTableCell} from './InputTableCell'
import {MultipleChoiceCell} from './MultipleChoiceCell'
import {OpinionScaleCell} from './OpinionScaleCell'
import {PictureChoiceCell} from './PictureChoiceCell'
import {SignatureCell} from './SignatureCell'
import {SubmitDateCell} from './SubmitDateCell'
import {TextCell} from './TextCell'
import {UrlCell} from './UrlCell'
import {PaymentCell} from './PaymentCell'

export const SheetCell: FC<SheetCellProps> = props => {
  switch (props.column.kind) {
    case InternalColumnKindEnum.CONTACT:
      return <ContactCell {...props} />

    case InternalColumnKindEnum.SUBMIT_DATE:
      return <SubmitDateCell {...props} />

    case FieldKindEnum.DROPDOWN:
    case FieldKindEnum.YES_NO:
      return <DropPickerCell {...props} />

    case FieldKindEnum.URL:
      return <UrlCell {...props} />

    case FieldKindEnum.MULTIPLE_CHOICE:
    case FieldKindEnum.SINGLE_CHOICE:
      return <MultipleChoiceCell {...props} />

    case FieldKindEnum.PICTURE_CHOICE:
      return <PictureChoiceCell {...props} />

    case FieldKindEnum.RATING:
    case FieldKindEnum.OPINION_SCALE:
      return <OpinionScaleCell {...props} />

    case FieldKindEnum.FILE_UPLOAD:
      return <FileUploadCell {...props} />

    case FieldKindEnum.SIGNATURE:
      return <SignatureCell {...props} />

    case FieldKindEnum.ADDRESS:
      return <AddressCell {...props} />

    case FieldKindEnum.FULL_NAME:
      return <FullNameCell {...props} />

    case FieldKindEnum.DATE_RANGE:
      return <DateRangeCell {...props} />

    case FieldKindEnum.INPUT_TABLE:
      return <InputTableCell {...props} />

    case FieldKindEnum.PAYMENT:
      return <PaymentCell {...props} />

    case FieldKindEnum.CUSTOM_MULTIPLE:
    case FieldKindEnum.CUSTOM_SINGLE:
      return <CustomMultipleCell {...props} />

    case FieldKindEnum.CUSTOM_TEXT:
      return <CustomTextCell {...props} />

    default:
      return <TextCell {...props} />
  }
}
