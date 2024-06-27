import { Column, FieldKindEnum } from '@heyform-inc/shared-types-enums'
import { helper } from '@heyform-inc/utils'
import { useBoolean } from 'ahooks'
import { FC, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Pagination, useToast } from '@/components'
import { SubmissionService } from '@/services'
import { timeFromNow, useParam } from '@/utils'

interface SubmissionItemProps {
  answers: AnyMap[]
}

interface InputTableItemProps extends SubmissionItemProps {
  columns: Column[]
}

const InputTableItem: FC<InputTableItemProps> = ({ columns, answers: rawAnswers = [] }) => {
  const { i18n } = useTranslation()
  const answers = useMemo(
    () =>
      rawAnswers
        .map(a =>
          (a.value || []).map((value: AnyMap) => ({
            value,
            endAt: a.endAt
          }))
        )
        .flat(),
    [rawAnswers]
  )

  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map(c => (
            <th
              key={c.id}
              className="border-b border-accent-light py-2 text-sm/6 font-medium text-secondary"
            >
              {c.label}
            </th>
          ))}
          <th className="border-b border-accent-light"></th>
        </tr>
      </thead>

      <tbody className="divide-y divide-accent-light">
        {answers.map((row: Any, index: number) => (
          <tr key={index}>
            {columns.map(c => (
              <td key={c.id} className="whitespace-nowrap py-2 text-sm/6">
                {row.value[c.id]}
              </td>
            ))}
            <td className="whitespace-nowrap py-2 text-right text-xs/6 text-secondary">
              {timeFromNow(row.endAt, i18n.language)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const AnswerValue: FC<{ answer: AnyMap }> = ({ answer }) => {
  switch (answer.kind) {
    case FieldKindEnum.ADDRESS:
      return (
        answer.value &&
        `${answer.value.address1}, ${answer.value.address2} ${answer.value.city}, ${answer.value.state}, ${answer.value.zip}`
      )

    case FieldKindEnum.FULL_NAME:
      return answer.value && `${answer.value.firstName} ${answer.value.lastName}`

    case FieldKindEnum.DATE_RANGE:
      return answer.value && [answer.value.start, answer.value.end].filter(Boolean).join(' - ')

    case FieldKindEnum.FILE_UPLOAD:
      return (
        <a
          href={`${answer.value?.cdnUrlPrefix}/${
            answer.value?.cdnKey
          }?attname=${encodeURIComponent(answer.value?.filename)}`}
          target="_blank"
          rel="noreferrer"
        >
          {answer.value?.filename}
        </a>
      )

    case FieldKindEnum.SIGNATURE:
      return (
        <a href={`${answer.value}?attname=signature.jpg`} target="_blank" rel="noreferrer">
          Signature
        </a>
      )

    default:
      return answer.value
  }
}

const SubmissionItem: FC<SubmissionItemProps> = ({ answers = [] }) => {
  const { i18n } = useTranslation()

  return (
    <div className="divide-y divide-accent-light">
      {answers.map(row => (
        <div className="flex items-center justify-between py-2 text-sm/6" key={row.submissionId}>
          <AnswerValue answer={row} />
          <div className="text-xs text-secondary">{timeFromNow(row.endAt, i18n.language)}</div>
        </div>
      ))}
    </div>
  )
}

export default function FormReportSubmissions({ response }: Any) {
  const { t } = useTranslation()

  const toast = useToast()
  const { formId } = useParam()

  const [page, setPage] = useState(1)
  const [loading, { setTrue, setFalse }] = useBoolean(false)
  const [answers, setAnswers] = useState<AnyMap[]>(response.answers || [])
  const [total, setTotal] = useState(response.count)

  const handleChange = useCallback(
    async (newPage: number) => {
      setTrue()

      try {
        const result = await SubmissionService.answers({
          formId,
          fieldId: response.id,
          page: newPage
        })
        const { total, answers } = result

        setAnswers(answers)
        setTotal(total)
        setPage(newPage)
      } catch (err: Any) {
        toast({
          title: t('components.error.title'),
          message: err.message
        })
      }

      setFalse()
    },
    [formId, response.id, setFalse, setTrue, t, toast]
  )

  if (!helper.isValidArray(response.answers)) {
    return null
  }

  return (
    <div>
      {response.kind === FieldKindEnum.INPUT_TABLE ? (
        <InputTableItem answers={answers} columns={response.properties?.tableColumns || []} />
      ) : (
        <SubmissionItem answers={answers} />
      )}

      {total > 10 && (
        <Pagination
          className="mt-2 border-t border-accent-light py-2 [&_[data-slot=info]]:text-secondary"
          total={total}
          page={page}
          pageSize={5}
          buttonProps={{
            size: 'sm'
          }}
          loading={loading}
          onChange={handleChange}
        />
      )}
    </div>
  )
}