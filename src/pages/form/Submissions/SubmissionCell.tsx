import { CURRENCY_SYMBOLS, htmlUtils } from '@heyform-inc/answer-utils'
import { Answer, Choice, Column, FieldKindEnum } from '@heyform-inc/shared-types-enums'
import { helper, unixDate } from '@heyform-inc/utils'
import { IconArrowUpRight, IconCheck, IconClock, IconFile } from '@tabler/icons-react'
import Big from 'big.js'
import { FC, Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Badge, Checkbox, Image } from '@/components'
import { ALL_FIELD_CONFIGS, CUSTOM_FIELDS_CONFIGS } from '@/consts'
import { FormFieldType, SubmissionType } from '@/types'
import { cn, formatDay } from '@/utils'

import { QuestionIcon } from '../Builder/LeftSidebar/QuestionList'

interface SubmissionHeaderCellProps {
  field: FormFieldType
}

interface SubmissionCellProps extends SubmissionHeaderCellProps {
  submission: SubmissionType
  answer: Answer
  isTableCell?: boolean
}

const ICON_CONFIGS = [...ALL_FIELD_CONFIGS, ...CUSTOM_FIELDS_CONFIGS]

const AddressItem: FC<SubmissionCellProps> = ({ answer, field, isTableCell }) => {
  const { t } = useTranslation()

  if (answer.kind !== field.kind || !helper.isObject(answer.value)) {
    return null
  }

  const value = [
    answer.value.address1,
    answer.value.address2,
    answer.value.city,
    answer.value.state,
    answer.value.zip
  ]

  if (isTableCell) {
    return <span className="text-nowrap">{value.filter(helper.isValid).join(', ')}</span>
  }

  const labels = [
    t('form.submissions.address.address1'),
    t('form.submissions.address.address2'),
    t('form.submissions.address.city'),
    t('form.submissions.address.state'),
    t('form.submissions.address.zip')
  ]

  const result = value
    .map((row, index) => {
      if (helper.isValid(row)) {
        return {
          value: row,
          label: labels[index]
        }
      }
    })
    .filter(Boolean) as AnyMap[]

  return (
    <dl className="grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6">
      {result.map((row, index) => (
        <Fragment key={index}>
          <dt className="col-start-1 border-t border-accent-light pt-3 text-secondary first:border-none sm:border-t sm:border-accent-light sm:py-3">
            {row.label}
          </dt>
          <dd className="sm:[&amp;:nth-child(2)]:border-none pb-3 pt-1 text-primary sm:border-t sm:border-accent-light sm:py-3">
            {row.value}
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}

const DateRangeItem: FC<SubmissionCellProps> = ({ answer, field }) => {
  if (answer.kind !== field.kind || !helper.isObject(answer.value)) {
    return null
  }

  return <span>{[answer.value.start, answer.value.end].filter(Boolean).join(' - ')}</span>
}

const FileUploadItem: FC<SubmissionCellProps> = ({ answer, field }) => {
  if (answer.kind !== field.kind || !helper.isObject(answer.value)) {
    return null
  }

  const filename = encodeURIComponent(answer.value.filename)
  const downloadUrl = `${answer.value.cdnUrlPrefix}/${answer.value.cdnKey}?attname=${filename}`

  return (
    <a className="inline-flex text-nowrap" href={downloadUrl} target="_blank" rel="noreferrer">
      <IconFile className="h-5 w-5 text-secondary" />
      <div className="ml-1 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {answer.value.filename}
      </div>
    </a>
  )
}

const FullNameItem: FC<SubmissionCellProps> = ({ answer, field }) => {
  if (answer.kind !== field.kind || !helper.isObject(answer.value)) {
    return null
  }

  return (
    <span className="text-nowrap">
      {[answer.value.firstName, answer.value.lastName].filter(Boolean).join(' ')}
    </span>
  )
}

const InputTableItem: FC<SubmissionCellProps> = ({ answer, field, isTableCell }) => {
  const columns = field.properties?.tableColumns as Column[]

  if (
    answer.kind !== field.kind ||
    !helper.isValidArray(columns) ||
    !helper.isValidArray(answer.value)
  ) {
    return null
  }

  const result = answer.value.map((row: AnyMap) => {
    if (helper.isObject(row)) {
      return columns.map(c => row[c.id])
    }
  }) as string[][]

  if (isTableCell) {
    return (
      <span>
        {result
          .filter(helper.isValidArray)
          .map(row => row.join(', '))
          .join('|')}
      </span>
    )
  }

  return (
    <div className="scrollbar overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-secondary">
          <tr className="border-b border-accent">
            {columns.map(c => (
              <th key={c.id} className="text-nowrap py-2 text-left font-normal">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.map((row, index) => (
            <tr
              key={index}
              className="border-b border-accent last:border-b-0 hover:bg-primary/[2.5%]"
            >
              {row.map((cell, index) => (
                <td key={index} className="h-10 text-nowrap py-2 text-left">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const MultipleChoiceItem: FC<SubmissionCellProps> = ({ answer, field, isTableCell }) => {
  const choices = field.properties?.choices as Choice[]

  if (
    answer.kind !== field.kind ||
    !helper.isValidArray(choices) ||
    !helper.isObject(answer.value) ||
    (!helper.isValidArray(answer.value.value) && helper.isEmpty(answer.value.other))
  ) {
    return null
  }

  const result = choices.filter(c => answer.value.value.includes(c.id))

  if (answer.value.other) {
    result.push(answer.value.other)
  }

  return (
    <div className={cn('flex', isTableCell ? 'gap-x-2 py-2' : 'flex-wrap gap-2')}>
      {result.map(row => (
        <Badge key={row.id} color="zinc">
          {row.label}
        </Badge>
      ))}
    </div>
  )
}

const OpinionScaleItem: FC<SubmissionCellProps> = ({ answer, field }) => {
  if (answer.kind !== field.kind || !helper.isNumeric(answer.value)) {
    return null
  }

  return (
    <span className="text-nowrap">
      {answer.value}/{field.properties?.total}
    </span>
  )
}

const PaymentItem: FC<SubmissionCellProps> = ({ answer, field }) => {
  if (answer.kind !== field.kind || !helper.isObject(answer.value)) {
    return null
  }

  const amount = answer.value.amount || 0
  const amountString = CURRENCY_SYMBOLS[answer.value.currency] + Big(amount).div(100).toFixed(2)
  const isCompleted = helper.isValid(answer.value.paymentIntentId)

  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center overflow-hidden truncate">
        {isCompleted ? (
          <div className="flex h-6 items-center rounded bg-green-100 pl-1 pr-2 text-sm text-green-800">
            <IconCheck className="h-4 w-4" />
            <span className="ml-1">Succeeded</span>
          </div>
        ) : (
          <div className="flex h-6 items-center rounded bg-gray-100 pl-1 pr-2 text-sm text-primary">
            <IconClock className="h-4 w-4" />
            <span className="ml-1">Incomplete</span>
          </div>
        )}
        <div className="ml-2">{amountString}</div>
      </div>

      {isCompleted && (
        <div className="ml-2">
          <a href={answer.value.receiptUrl} target="_blank" rel="noreferrer">
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  )
}

const SignatureItem: FC<SubmissionCellProps> = ({ answer, field }) => {
  if (answer.kind !== field.kind || !helper.isURL(answer.value)) {
    return null
  }

  return <Image src={answer.value} width={80} height={40} />
}

const TextItem: FC<SubmissionCellProps> = ({ answer, field }) => {
  if (answer.kind !== field.kind || !helper.isString(answer.value)) {
    return null
  }

  return <span className="text-nowrap">{answer.value}</span>
}

const URLItem: FC<SubmissionCellProps> = ({ answer, field }) => {
  if (answer.kind !== field.kind || !helper.isString(answer.value)) {
    return null
  }

  return (
    <a className="text-nowrap" href={answer.value} target="_blank" rel="noreferrer">
      {answer.value}
    </a>
  )
}

const SubmitDateItem: FC<SubmissionCellProps> = ({ answer }) => {
  const { i18n } = useTranslation()

  return <span className="text-nowrap">{formatDay(unixDate(answer.value), i18n.language)}</span>
}

const CheckboxItem: FC<SubmissionCellProps> = ({ submission }) => {
  return (
    <div className="flex items-center" data-id={submission.id}>
      <Checkbox onChange={console.log} />
    </div>
  )
}

export default function SubmissionCell(props: SubmissionCellProps) {
  switch (props.field.kind) {
    case FieldKindEnum.HIDDEN_CHECKBOX:
      return <CheckboxItem {...props} />

    case FieldKindEnum.SUBMIT_DATE:
      return <SubmitDateItem {...props} />

    case FieldKindEnum.URL:
      return <URLItem {...props} />

    case FieldKindEnum.MULTIPLE_CHOICE:
    case FieldKindEnum.PICTURE_CHOICE:
      return <MultipleChoiceItem {...props} />

    case FieldKindEnum.RATING:
    case FieldKindEnum.OPINION_SCALE:
      return <OpinionScaleItem {...props} />

    case FieldKindEnum.FILE_UPLOAD:
      return <FileUploadItem {...props} />

    case FieldKindEnum.SIGNATURE:
      return <SignatureItem {...props} />

    case FieldKindEnum.ADDRESS:
      return <AddressItem {...props} />

    case FieldKindEnum.FULL_NAME:
      return <FullNameItem {...props} />

    case FieldKindEnum.DATE_RANGE:
      return <DateRangeItem {...props} />

    case FieldKindEnum.INPUT_TABLE:
      return <InputTableItem {...props} />

    case FieldKindEnum.PAYMENT:
      return <PaymentItem {...props} />

    default:
      return <TextItem {...props} />
  }
}

export const SubmissionHeaderCell: FC<SubmissionHeaderCellProps & ComponentProps> = ({
  className,
  field
}) => {
  const label = helper.isArray(field.title)
    ? htmlUtils.plain(htmlUtils.serialize(field.title))
    : field.title

  return (
    <div className={cn('flex items-center gap-x-1.5', className)}>
      <QuestionIcon
        className="h-5 w-5 justify-center px-0 [&_[data-slot=icon]]:ml-0"
        configs={ICON_CONFIGS}
        kind={field.kind}
      />
      <span className="text-nowrap" data-slot="label">
        {label}
      </span>
    </div>
  )
}
