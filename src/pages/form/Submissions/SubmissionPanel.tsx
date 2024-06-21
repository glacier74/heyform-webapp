import { FormField } from '@heyform-inc/shared-types-enums'
import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react'
import { FC } from 'react'

import { Button, TableDetailRenderProps } from '@/components'
import { SubmissionType } from '@/types'

import SubmissionCell, { SubmissionHeaderCell } from './SubmissionCell'

interface SubmissionPanelProps {
  submission: SubmissionType
  fields: FormField[]
  props: TableDetailRenderProps
}

interface SubmissionItemProps {
  submission: SubmissionType
  field: FormField
}

const SubmissionItem: FC<SubmissionItemProps> = ({ submission, field }) => {
  const answer = submission.answers.find(answer => answer.id === field.id)

  return (
    <div className="pt-4">
      <SubmissionHeaderCell
        className="items-start gap-x-2 text-secondary [&_[data-slot=icon]]:h-5 [&_[data-slot=icon]]:w-5 [&_[data-slot=label]]:text-wrap [&_[data-slot=question-icon]]:h-6 [&_[data-slot=question-icon]]:w-6"
        field={field}
      />
      {answer && (
        <div className="mt-2">
          <SubmissionCell field={field} submission={submission} answer={answer} />
        </div>
      )}
    </div>
  )
}

export default function SubmissionPanel({
  submission,
  fields,
  props: { isPreviousDisabled, isNextDisabled, loading, toPrevious, toNext, closePanel }
}: SubmissionPanelProps) {
  return (
    <div className="flex h-[calc(100vh-23.45rem)] flex-col rounded-md border border-accent text-sm">
      <div className="flex items-center justify-between border-b border-accent-light px-4 py-2">
        <div className="flex items-center gap-x-1.5">
          <Button.Ghost
            size="sm"
            disabled={loading || isPreviousDisabled}
            iconOnly
            onClick={toPrevious}
          >
            <IconChevronUp className="h-5 w-5" />
          </Button.Ghost>
          <Button.Ghost size="sm" disabled={loading || isNextDisabled} iconOnly onClick={toNext}>
            <IconChevronDown className="h-5 w-5" />
          </Button.Ghost>
        </div>

        <Button.Ghost size="sm" iconOnly onClick={closePanel}>
          <IconX className="h-5 w-5" />
        </Button.Ghost>
      </div>
      <div className="scrollbar flex-1 overflow-y-auto">
        <div className="space-y-4 divide-y divide-accent-light p-4">
          {fields.map(field => (
            <SubmissionItem key={field.id} submission={submission} field={field} />
          ))}
        </div>
      </div>
    </div>
  )
}
