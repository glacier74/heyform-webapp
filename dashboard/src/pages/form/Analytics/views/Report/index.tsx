import { flattenFields, htmlUtils } from '@heyforms/answer-utils'
import {
  CHOICES_FIELD_KINDS,
  CUSTOM_COLUMN_CHOICE_KINDS,
  FieldKindEnum,
  QUESTION_FIELD_KINDS
} from '@heyforms/shared-types-enums'
import { EmptyStates } from '@heyforms/ui'
import { isArray, isEmpty, isValidArray } from '@hpnp/utils/helper'
import { pickValidValues } from '@hpnp/utils/object'
import { IconChartBar } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Async, SubHeading } from '@/components'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

import { FieldList } from './FieldList'
import { ReportItem } from './ReportItem'

const CHOICE_KINDS = [FieldKindEnum.YES_NO, ...CHOICES_FIELD_KINDS, ...CUSTOM_COLUMN_CHOICE_KINDS]

const Report: FC = observer(() => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const [responses, setResponses] = useState([])

  async function fetchReport() {
    const result = await FormService.report(formId)
    const fields = flattenFields(formStore.current?.fields).filter(field =>
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
          'tableColumns',
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

  return (
    <div className="mx-auto flex print:bg-white md:w-[1044px]">
      <FieldList />
      <div className="mx-4 mb-16 mt-10 w-full rounded-[3px] print:ml-0 md:ml-16 md:mr-0 md:w-[700px]">
        <SubHeading
          style={{
            marginTop: 0
          }}
        >
          {t('analytics.Report')}
        </SubHeading>

        <Async
          request={fetchReport}
          deps={[formStore.current]}
          emptyState={
            <EmptyStates
              className="empty-states-fit"
              icon={<IconChartBar className="non-scaling-stroke" />}
              title={t('submissions.NoSubmissions')}
              description={t('submissions.SubHeadline')}
            />
          }
        >
          {responses.map((row, index) => (
            <ReportItem key={index} index={index + 1} response={row} />
          ))}
        </Async>
      </div>
    </div>
  )
})

export default Report
