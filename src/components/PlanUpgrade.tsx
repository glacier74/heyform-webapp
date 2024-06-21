import { IconCircleArrowUp } from '@tabler/icons-react'
import { FC, ReactElement, ReactNode, cloneElement, isValidElement, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { PlanGradeEnum } from '@/consts'
import { useAppStore, useWorkspaceStore } from '@/store'

import { Tooltip } from './Tooltip'

interface UpgradeProps extends ComponentProps {
  minimalGrade: PlanGradeEnum
  tooltipLabel?: string
  isUpgradeShow?: boolean
  fallback?: (openUpgradeModal: () => void) => ReactNode
}

export const usePlanGrade = (minimalGrade: PlanGradeEnum) => {
  const { workspace } = useWorkspaceStore()

  return (workspace?.plan.grade || PlanGradeEnum.FREE) >= minimalGrade
}

export const PlanUpgrade: FC<UpgradeProps> = ({
  minimalGrade,
  tooltipLabel,
  isUpgradeShow = true,
  fallback = null,
  children,
  ...restProps
}) => {
  const { t } = useTranslation()

  const { openModal } = useAppStore()
  const isAllowed = usePlanGrade(minimalGrade)

  const openUpgradeModal = useCallback(() => openModal('UpgradeModal'), [openModal])

  if (isAllowed) {
    return isValidElement(children)
      ? cloneElement(children as ReactElement, {
          ...(children as ReactElement).props,
          ...restProps
        })
      : null
  }

  return isUpgradeShow ? (
    <Tooltip label={tooltipLabel}>
      <button
        className="flex cursor-pointer items-center gap-x-1 rounded-md border border-blue-600 px-2 py-1 text-sm/5 text-blue-600 sm:text-xs"
        onClick={openUpgradeModal}
      >
        <IconCircleArrowUp className="h-4 w-4" stroke={1.5} />
        {t('billing.upgrade.confirm')}
      </button>
    </Tooltip>
  ) : (
    fallback?.(openUpgradeModal)
  )
}
