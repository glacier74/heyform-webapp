import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { EmptyState, PlanUpgrade, Tabs } from '@/components'
import { PlanGradeEnum } from '@/consts'

import Customize from './Customize'
import Theme from './Theme'

export default function Design() {
  const { t } = useTranslation()

  const tabs = useMemo(
    () => [
      {
        value: 'question',
        label: t('form.builder.design.theme.title'),
        content: <Theme />
      },
      {
        value: 'logic',
        label: t('form.builder.design.customize.title'),
        content: <Customize />
      }
    ],
    [t]
  )

  return (
    <PlanUpgrade
      minimalGrade={PlanGradeEnum.BASIC}
      isUpgradeShow={false}
      fallback={openUpgradeModal => (
        <div className="flex h-full flex-1 items-center justify-center rounded-lg py-36 shadow-sm">
          <EmptyState
            headline={t('billing.upgrade.customize')}
            buttonTitle={t('billing.upgrade.title')}
            onClick={openUpgradeModal}
          />
        </div>
      )}
    >
      <Tabs.SegmentedControl
        className="[&_[data-slot=nav]]:mx-4 [&_[data-slot=nav]]:mt-4"
        tabs={tabs}
      />
    </PlanUpgrade>
  )
}
