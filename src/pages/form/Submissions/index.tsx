import { flattenFields } from '@heyform-inc/answer-utils'
import {
  Answer,
  FieldKindEnum,
  FormField,
  QUESTION_FIELD_KINDS,
  SubmissionCategoryEnum
} from '@heyform-inc/shared-types-enums'
import { IconDownload, IconMaximize, IconMinimize, IconTrash } from '@tabler/icons-react'
import { useBoolean, useRequest } from 'ahooks'
import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import IconMove from '@/assets/move.svg?react'
import {
  Button,
  EmptyState,
  PlanUpgrade,
  Repeat,
  Select,
  Table,
  TableColumn,
  TableFetchParams,
  TableRef,
  Tooltip
} from '@/components'
import { PlanGradeEnum } from '@/consts'
import { SubmissionService } from '@/services'
import { useFormStore } from '@/store'
import { SubmissionType } from '@/types'
import { cn, useParam } from '@/utils'

import SubmissionCell, { SubmissionHeaderCell } from './SubmissionCell'
import SubmissionPanel from './SubmissionPanel'

const SUBMISSION_CATEGORIES = [
  {
    label: 'form.submissions.inbox',
    value: 'inbox'
  },
  {
    label: 'form.submissions.spam',
    value: 'spam'
  }
]

export default function FormSubmissions() {
  const { t } = useTranslation()

  const { formId } = useParam()
  const { form } = useFormStore()

  const tableRef = useRef<TableRef<SubmissionType> | null>(null)

  const [category, setCategory] = useState<string>(SubmissionCategoryEnum.INBOX)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [isMaximized, { toggle }] = useBoolean(false)

  const { loading: deleteLoading, run: deleteRun } = useRequest(
    async () => {
      await SubmissionService.delete(formId, selectedRowKeys)
      await tableRef.current?.refresh()

      setSelectedRowKeys([])
    },
    {
      manual: true,
      refreshDeps: [formId, selectedRowKeys]
    }
  )

  const { loading: moveLoading, run: moveRun } = useRequest(
    async () => {
      await SubmissionService.updateCategory({
        formId,
        submissionIds: selectedRowKeys,
        category:
          category === SubmissionCategoryEnum.INBOX
            ? SubmissionCategoryEnum.SPAM
            : SubmissionCategoryEnum.INBOX
      })
      await tableRef.current?.refresh()

      setSelectedRowKeys([])
    },
    {
      manual: true,
      refreshDeps: [formId, selectedRowKeys, category]
    }
  )

  const fields = useMemo(() => {
    const submitDateField = {
      id: FieldKindEnum.SUBMIT_DATE,
      kind: FieldKindEnum.SUBMIT_DATE,
      title: t('form.builder.question.submitDate')
    }

    const questionFields = flattenFields(form?.drafts || []).filter(row =>
      QUESTION_FIELD_KINDS.includes(row.kind)
    )

    const hiddenFields = (form?.hiddenFields || []).map(row => ({
      id: row.id,
      kind: FieldKindEnum.HIDDEN_FIELDS,
      title: row.name
    }))

    return [submitDateField, ...questionFields, ...hiddenFields] as FormField[]
  }, [form?.drafts, form?.hiddenFields, t])

  async function fetch({ current, pageSize }: TableFetchParams) {
    const { total, submissions } = await SubmissionService.submissions({
      formId,
      category,
      page: current,
      limit: pageSize
    })

    const list = submissions.map(row => ({
      ...row,
      answers: [
        ...row.answers,
        ...row.hiddenFields.map(v => ({
          ...v,
          kind: FieldKindEnum.HIDDEN_FIELDS
        })),
        {
          id: FieldKindEnum.SUBMIT_DATE,
          kind: FieldKindEnum.SUBMIT_DATE,
          value: row.endAt || 0
        }
      ] as Answer[]
    }))

    return {
      total,
      list
    }
  }

  const columns: TableColumn<FormField, SubmissionType>[] = useMemo(
    () =>
      fields.map(row => ({
        field: row,
        headerRender: field => <SubmissionHeaderCell field={field} />,
        cellRender: (field, submission) => {
          const answer = submission.answers.find(answer => answer.id === field.id)

          if (!answer) {
            return <td />
          }

          return (
            <SubmissionCell field={field} submission={submission} answer={answer} isTableCell />
          )
        }
      })),
    [fields]
  )

  function handleDownload() {
    window.open(`/export/submissions?formId=${formId}`)
  }

  return (
    <div className={cn(isMaximized ? 'fixed inset-0 bg-foreground p-4' : 'mt-4')}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2.5">
          <Select
            value={category}
            options={SUBMISSION_CATEGORIES}
            contentProps={{
              sideOffset: 8
            }}
            multiLanguage
            onChange={setCategory}
          />

          {selectedRowKeys.length > 0 && (
            <>
              <Tooltip label={t('form.submissions.moveTo')}>
                <Button.Ghost size="md" loading={moveLoading} iconOnly onClick={moveRun}>
                  <IconMove className="h-5 w-5" />
                </Button.Ghost>
              </Tooltip>

              <Tooltip label={t('form.submissions.delete')}>
                <Button.Ghost size="md" loading={deleteLoading} iconOnly onClick={deleteRun}>
                  <IconTrash className="h-5 w-5" />
                </Button.Ghost>
              </Tooltip>
            </>
          )}
        </div>

        <div className="flex items-center gap-x-2.5">
          <PlanUpgrade
            minimalGrade={PlanGradeEnum.BASIC}
            isUpgradeShow={false}
            fallback={openUpgradeModal => (
              <Tooltip label={t('form.submissions.downloadCSV')}>
                <Button.Ghost size="md" iconOnly onClick={openUpgradeModal}>
                  <IconDownload className="h-5 w-5" />
                </Button.Ghost>
              </Tooltip>
            )}
          >
            <Tooltip label={t('form.submissions.downloadCSV')}>
              <Button.Ghost size="md" iconOnly onClick={handleDownload}>
                <IconDownload className="h-5 w-5" />
              </Button.Ghost>
            </Tooltip>
          </PlanUpgrade>

          <Tooltip
            label={isMaximized ? t('form.submissions.minimize') : t('form.submissions.maximize')}
          >
            <Button.Ghost size="md" iconOnly onClick={toggle}>
              {isMaximized ? (
                <IconMinimize className="h-5 w-5" />
              ) : (
                <IconMaximize className="h-5 w-5" />
              )}
            </Button.Ghost>
          </Tooltip>

          {/*<Button.Ghost size="md">*/}
          {/*  <IconAdjustmentsHorizontal className="h-5 w-5" />*/}
          {/*  <span className="hidden sm:block">{t('form.submissions.view')}</span>*/}
          {/*</Button.Ghost>*/}
        </div>
      </div>

      <div className="mt-4">
        <Table
          ref={tableRef}
          classNames={{
            container: cn(
              'scrollbar overflow-auto rounded-md border border-accent text-sm',
              isMaximized ? 'h-[calc(100vh-9rem)]' : 'h-[calc(100vh-23.45rem)]'
            ),
            table:
              'min-w-full text-left [&_tbody_td]:text-nowrap [&_tbody_td]:h-10 [&_tbody_td]:px-4 [&_tbody_td]:text-left [&_tbody_td]:font-normal [&_thead_th]:text-nowrap [&_thead_th]:px-4 [&_thead_th]:h-10 [&_thead_th]:text-left [&_thead_th]:font-normal [&_thead_tr]:sticky [&_thead_tr]:top-0 [&_thead_tr]:bg-foreground [&_thead]:text-secondary',
            footer: 'text-sm justify-end'
          }}
          columns={columns}
          loader={
            <Repeat count={20}>
              <div className="-ml-4 flex h-10 items-center gap-x-8 border-b border-accent px-4">
                <div className="skeleton h-4 w-4 rounded-md" />
                <div className="skeleton h-4 w-20 rounded-md" />
                <div className="skeleton h-4 w-60 rounded-md" />
                <div className="skeleton h-4 w-80 rounded-md" />
              </div>
            </Repeat>
          }
          emptyRender={({ refresh }) => (
            <EmptyState
              className="flex h-[calc(100vh-26.5rem)] flex-col items-center justify-center"
              headline={t('form.submissions.headline')}
              subHeadline={t('form.submissions.subHeadline')}
              buttonTitle={t('components.refresh')}
              onClick={refresh}
            />
          )}
          fetch={fetch}
          refreshDeps={[formId, category]}
          selectedRowKeys={selectedRowKeys}
          isExpandable
          onSelectionChange={setSelectedRowKeys}
          detailRender={(submission, props) => (
            <SubmissionPanel submission={submission} fields={fields} props={props} />
          )}
        />
      </div>
    </div>
  )
}