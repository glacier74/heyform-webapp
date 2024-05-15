import { Button } from '@heyforms/ui'
import { IconDownload } from '@tabler/icons-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import {PlanBadge, PlanCheck} from '@/components'
import { PlanGradeEnum } from '@/models'
import { useParam } from '@/utils'

export const ExportLink: FC = () => {
  const { t } = useTranslation()
  const { formId } = useParam()

  function handleClick() {
    window.open(`/export/submissions?formId=${formId}`)
  }

  return (
    <PlanCheck permission={PlanGradeEnum.BASIC} isBadgeShow={false}>
      <Button
        className="ml-5"
        leading={<IconDownload className="h-6 w-6 text-slate-500" />}
        onClick={handleClick}
      >
        <span className="mr-2">{t('submissions.export')}</span>
        <PlanBadge permission={PlanGradeEnum.BASIC} />
      </Button>
    </PlanCheck>
  )
}
