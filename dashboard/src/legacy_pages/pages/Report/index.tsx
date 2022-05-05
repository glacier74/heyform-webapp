import { EmptyDataView, Request, SubHeading } from '@/legacy_pages/components'
import { BlankSubmissionIcon } from '@/legacy_pages/components/Icons'
import { ResultNavbar } from '@/legacy_pages/pages/Analytics/views/ResultNavbar'
import { FieldList } from '@/legacy_pages/pages/Report/views/FieldList'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { htmlUtils } from '@heyforms/answer-utils'
import {
  CHOICES_FIELD_KINDS,
  CUSTOM_COLUMN_CHOICE_KINDS,
  FieldKindEnum,
  QUESTION_FIELD_KINDS
} from '@heyforms/shared-types-enums'
import { Flex } from '@heyui/component'
import { PrinterIcon } from '@heyui/icon'
import { isArray, isEmpty, isValidArray } from '@hpnp/utils/helper'
import { pickValidValues } from '@hpnp/utils/object'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ReportItem } from './views/ReportItem'

const CHOICE_KINDS = [FieldKindEnum.YES_NO, ...CHOICES_FIELD_KINDS, ...CUSTOM_COLUMN_CHOICE_KINDS]

const Report: FC = observer(() => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const [responses, setResponses] = useState([])

  async function fetchReport() {
    const result = await FormService.report(formId)
    const fields = formStore.current?.fields?.filter(field =>
      QUESTION_FIELD_KINDS.includes(field.kind)
    )

    if (isValidArray(fields)) {
      const responses = fields!.map(field => {
        let response = result.responses.find((row: any) => row.id === field.id)

        if (response) {
          response.answers = result.submissions.find((row: any) => row._id === field.id)?.answers

          if (CHOICE_KINDS.includes(field.kind)) {
            response.chooses = field.properties?.choices?.map(choice => {
              const choose = response.chooses.find((row: any) => row.id === choice.id)

              return {
                ...choose,
                ...choice
              }
            })
          }

          if (isEmpty(response.chooses)) {
            response.chooses = []
          }
        } else {
          response = {
            id: field.id,
            chooses: [],
            total: 0,
            count: 0,
            average: 0
          }
        }

        response.title = isArray(field.title)
          ? htmlUtils.plain(htmlUtils.serialize(field.title as any))
          : field.title
        response.kind = field.kind
        response.properties = pickValidValues(field.properties as any, [
          'total',
          'average',
          'leftLabel',
          'rightLabel'
        ])

        return response
      })

      setResponses(responses as any)
    }

    return result.responses.length
  }

  function handlePrint() {
    window.print()
  }

  return (
    <>
      <ResultNavbar
        style={{
          width: 1044
        }}
      />
      <Container>
        <FieldList />

        <Body>
          <SubHeading
            action={
              <PrinterButton align="center" onClick={handlePrint}>
                <PrinterIcon />
                {t('report.Print')}
              </PrinterButton>
            }
            style={{
              marginTop: 0
            }}
          >
            {t('analytics.Report')}
          </SubHeading>

          <Request
            fetch={fetchReport}
            deps={[formStore.current]}
            emptyNode={
              <EmptyDataView icon={<BlankSubmissionIcon />} text={t('report.noSubmission')} />
            }
          >
            {responses.map((row, index) => (
              <ReportItem key={index} index={index + 1} response={row} />
            ))}
          </Request>
        </Body>
      </Container>
    </>
  )
})

const Container = styled(Flex)`
  width: 1044px;
  margin-left: auto;
  margin-right: auto;

  @media print {
    background: #fff;
  }
`

const Body = styled.div`
  margin: 44px 0 64px 64px;
  width: 700px;
  border-radius: 3px;

  @media print {
    margin-left: 0;
  }
`

const PrinterButton = styled(Flex)`
  padding: 6px 16px;
  border: none;
  background: #f3f3f3;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
    margin-left: -2px;
    margin-right: 8px;
    padding: 2px;
    color: #8a94a6;
  }

  @media print {
    display: none;
  }
`

export default Report
