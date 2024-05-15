import { flattenFields, htmlUtils } from '@heyforms/answer-utils'
import {
  CHOICES_FIELD_KINDS,
  CUSTOM_COLUMN_CHOICE_KINDS,
  FieldKindEnum,
  QUESTION_FIELD_KINDS
} from '@heyforms/shared-types-enums'
import { Button, EmptyStates } from '@heyforms/ui'
import { isArray, isEmpty, isValidArray } from '@hpnp/utils/helper'
import { pickValidValues } from '@hpnp/utils/object'
import { IconChartBar, IconDiamond } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Async, SubHeading, usePlanCheck } from '@/components'
import { PlanGradeEnum } from '@/models'
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
  const appStore = useStore('appStore')

  const [responses, setResponses] = useState([])
  const isAllowed = usePlanCheck(PlanGradeEnum.BASIC)

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
        response.properties = pickValidValues((field.properties as any) || {}, [
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

  function openPlanModal() {
    appStore.isPlanModalOpen = true
  }

  if (!isAllowed) {
    return (
      <div className="mx-auto">
        <EmptyStates
          className="py-40"
          icon={<IconDiamond className="non-scaling-stroke" />}
          title={t('submissions.upgradeFormReport')}
          action={
            <Button type="primary" onClick={openPlanModal}>
              {t('submissions.upgradePlan')}
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="mx-auto flex print:bg-white md:w-[1044px]">
      <FieldList />
      <div className="mx-0 mb-16 mt-10 w-full rounded-lg print:ml-0 md:ml-16 md:mr-0 md:w-[700px] lg:mx-4">
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
