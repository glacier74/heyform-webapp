import { IconText } from '@/legacy_pages/components'
import { PlanPermissionBadge, UpgradePlan } from '@/legacy_pages/components/UpgradePlan'
import { PlanGradeEnum } from '@/legacy_pages/models'
import { useParam } from '@/utils'
import { DownloadIcon } from '@heyui/icon'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const ExportLink: FC = () => {
  const { t } = useTranslation()
  const { formId } = useParam()

  function handleClick() {
    window.open(`/export/submissions?formId=${formId}`)
  }

  return (
    <UpgradePlan name="Basic" permission={PlanGradeEnum.BASIC}>
      <Container
        icon={<DownloadIcon/>}
        text={
          <>
            <span>{t('submissions.export')}</span>
            <PlanPermissionBadge name="Basic" permission={PlanGradeEnum.BASIC}/>
          </>
        }
        onClick={handleClick}
      />
    </UpgradePlan>
  )
}

const Container = styled(IconText)`
  height: 40px;
  padding: 0 12px;
  background: #f3f3f3;
  color: #4e5d78;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
  }

  svg {
    width: 22px;
    height: 22px;
    color: #8a94a6;
  }

  span {
    margin-left: 8px;
  }
`
