import { EmptyDataView, Request } from '@/legacy_pages/components'
import { BlankSubmissionIcon } from '@/legacy_pages/components/Icons'
import { PaginationBar } from '@/legacy_pages/components/PaginationBar'
import { SelectedPanel } from '@/legacy_pages/components/SelectedPanel'
import { FormModel, SubmissionModel } from '@/legacy_pages/models'
import { ResultNavbar } from '@/legacy_pages/pages/Analytics/views/ResultNavbar'
import { urlBuilder, useQuery } from '@/legacy_pages/utils'
import { FormService, SubmissionService } from '@/service'
import { useParam } from '@/utils'
import { Answer, SubmissionCategoryEnum } from '@heyforms/shared-types-enums'
import { Button, Flex, message } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { parseNumber } from '@hpnp/utils/parse'
import throttle from 'lodash/throttle'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CategorySelect } from './views/CategorySelect'
import { ExportLink } from './views/ExportLink'
import { Sheet } from './views/Sheet'
import { ColumnOptions, SheetColumn } from './views/Sheet/types'

const Submissions: FC = () => {
  const navigate = useNavigate()
  const { workspaceId, projectId, formId, category: rawCategory } = useParam()
  const category: any = isValid(rawCategory) ? rawCategory : SubmissionCategoryEnum.INBOX
  const { page: rawPage } = useQuery()
  const pageSize = 30
  const page = parseNumber(rawPage, 1)!
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [form, setForm] = useState<FormModel | null>(null)
  const [total, setTotal] = useState(0)
  const [submissions, setSubmissions] = useState<SubmissionModel[]>([])
  const [deleting, setDeleting] = useState(false)
  const { t } = useTranslation()

  async function fetchData() {
    const [res1, res2] = await Promise.all([
      FormService.detail(formId),
      SubmissionService.submissions({
        formId,
        category,
        page
      })
    ])

    const { submissions, total } = res2

    setForm(res1)
    setSubmissions(submissions)
    setTotal(total)

    return submissions.length > 0
  }

  async function fetchSubmissions() {
    const result = await SubmissionService.submissions({
      formId,
      category,
      page
    })
    const { submissions, total } = result

    setSubmissions(submissions)
    setTotal(total)
  }

  function handleColumnPin(column: SheetColumn) {
    FormService.updateField({
      formId,
      fieldId: column.key,
      updates: {
        frozen: true
      }
    })
  }

  function handleColumnUnpin(column: SheetColumn) {
    FormService.updateField({
      formId,
      fieldId: column.key,
      updates: {
        frozen: false
      }
    })
  }

  function handleColumnHide(column: SheetColumn) {
    FormService.updateField({
      formId,
      fieldId: column.key,
      updates: {
        hide: true
      }
    })
  }

  async function handleColumnAdd(column: SheetColumn, options: ColumnOptions) {
    await FormService.createField(formId, {
      id: column.key,
      title: options.name as string,
      kind: options.kind as any,
      properties: {
        choices: options.choices || []
      },
      width: column.width as number,
      hide: column.hide,
      frozen: column.frozen
    })
  }

  async function handleColumnUpdate(column: SheetColumn, options: ColumnOptions) {
    const updates: any = {
      title: options.name as string,
      kind: options.kind,
      properties: {
        choices: options.choices
      }
    }

    await FormService.updateField({
      formId,
      fieldId: column.key,
      updates
    })
  }

  function handleColumnResize(column: SheetColumn, width: number) {
    FormService.updateField({
      formId,
      fieldId: column.key,
      updates: {
        width
      }
    })
  }

  function handleColumnDelete(column: SheetColumn) {
    FormService.deleteField(formId, column.key)
  }

  function handleCellValueChange(rowIdx: number, column: SheetColumn, value: any) {
    SubmissionService.updateAnswer({
      formId,
      submissionId: submissions[rowIdx].id,
      answer: {
        id: column.key,
        kind: column.kind,
        properties: column.properties,
        value
      } as Answer
    })
  }

  function handleCategoryChange(category: any) {
    navigate(
      `/workspace/${workspaceId}/project/${projectId}/form/${formId}/results/submissions/${category}`
    )
  }

  function handlePageChange(page: number) {
    const url = urlBuilder(
      `/workspace/${workspaceId}/project/${projectId}/form/${formId}/results/submissions/${category}`,
      {
        page
      }
    )
    navigate(url)
  }

  function handleDeselectedRows() {
    setSelectedRows(new Set())
  }

  function handleSelectedRowsChange(selectedRows: any) {
    setSelectedRows(selectedRows)
  }

  async function handleDelete() {
    if (deleting) {
      return
    }

    setDeleting(true)

    try {
      await SubmissionService.delete(formId, Array.from(selectedRows))
      await fetchSubmissions()
      handleDeselectedRows()
    } catch (_) {
      message.error('Failed to delete selected submissions')
    }

    setDeleting(false)
  }

  // 限制 cell 更新提交的频率
  const throttledCellValueChange = throttle(handleCellValueChange)

  return (
    <>
      <ResultNavbar
        style={{
          width: 'auto',
          marginLeft: 24
        }}
      />
      <Container>
        <Toolbar align="center" justify="space-between">
          <ToolbarLeft align="center">
            <CategorySelect category={category} onChange={handleCategoryChange} />
            {/*<CustomFields />*/}
            <ExportLink />
          </ToolbarLeft>
          <PaginationBar
            total={total}
            page={page}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </Toolbar>

        <StyledRequest
          fetch={fetchData}
          deps={[category, page]}
          emptyNode={
            <EmptyDataView icon={<BlankSubmissionIcon />} text={t('report.noSubmission')} />
          }
        >
          <Sheet
            loading={false}
            formFields={[...(form?.fields || [])]}
            submissions={submissions}
            selectedRows={selectedRows}
            onSelectedRowsChange={handleSelectedRowsChange}
            onColumnPin={handleColumnPin}
            onColumnUnpin={handleColumnUnpin}
            onColumnHide={handleColumnHide}
            onColumnAdd={handleColumnAdd}
            onColumnUpdate={handleColumnUpdate}
            onColumnDelete={handleColumnDelete}
            onColumnResize={handleColumnResize}
            onCellValueChange={throttledCellValueChange}
          />
        </StyledRequest>

        <SelectedPanel
          selected={selectedRows}
          actions={
            <>
              <Button type="error" loading={deleting} onClick={handleDelete}>
                {t('submissions.Delete')}
              </Button>
            </>
          }
          onDeselect={handleDeselectedRows}
        />
      </Container>
    </>
  )
}

const Container = styled.div`
  position: relative;
`

const Toolbar = styled(Flex)`
  margin: 20px 24px;

  .hey-pagination {
    margin-left: 12px;
  }
`

const ToolbarLeft = styled(Flex)`
  height: 32px;
`

const StyledRequest = styled(Request)`
  height: calc(100vh - 188px);
`

export default Submissions
