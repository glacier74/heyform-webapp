import { Badge } from '@heyforms/ui'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { PlanGradeEnum } from '@/models'
import { useStore } from '@/store'

interface UpgradeButtonProps extends IComponentProps {
  permission: PlanGradeEnum
  isBadgeShow?: boolean
}

const BADGE_TEXTS: any = {
  [PlanGradeEnum.FREE]: 'Free',
  [PlanGradeEnum.BASIC]: 'Basic',
  [PlanGradeEnum.PREMIUM]: 'Premium',
  [PlanGradeEnum.BUSINESS]: 'Business'
}

export const PlanBadge: FC<UpgradeButtonProps> = ({ permission }) => {
  const isAllowed = usePlanCheck(permission)

  if (isAllowed) {
    return null
  }

  return <Badge className="px-2" type="blue" text={BADGE_TEXTS[permission]} rounded />
}

export function usePlanCheck(permission: PlanGradeEnum) {
  const workspaceStore = useStore('workspaceStore')
  const grade = workspaceStore.workspace?.plan.grade || PlanGradeEnum.FREE

  return grade >= permission
}

export const PlanCheck: FC<UpgradeButtonProps & { containerClassName?: string }> = observer(
  ({ className, containerClassName, permission, isBadgeShow = true, children }) => {
    const appStore = useStore('appStore')
    const isAllowed = usePlanCheck(permission)

    function handleClick(event: any) {
      event.stopPropagation()
      appStore.isPlanModalOpen = true
    }

    if (isAllowed) {
      return <>{children}</>
    }

    return (
      <div className={clsx('plan-check relative', className)}>
        {children}
        <div
          className={clsx(
            'plan-check-container absolute inset-0 z-10 flex cursor-pointer items-center justify-end',
            containerClassName
          )}
          onClick={handleClick}
        >
          {isBadgeShow && (
            <Badge className="px-2" type="blue" text={BADGE_TEXTS[permission]} rounded />
          )}
        </div>
      </div>
    )
  }
)

export const TabPanePlanCheck: FC<UpgradeButtonProps> = observer(
  ({ permission, isBadgeShow = true, children }) => {
    const appStore = useStore('appStore')
    const workspaceStore = useStore('workspaceStore')
    const grade = workspaceStore.workspace?.plan.grade || PlanGradeEnum.FREE

    function handleClick(event: any) {
      event.stopPropagation()
      appStore.isPlanModalOpen = true
    }

    if (grade >= permission) {
      return <>{children}</>
    }

    return (
      <div className="relative">
        {children}
        <div
          className="tab-pane_plan-check absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-white bg-opacity-5 backdrop-blur-sm"
          onClick={handleClick}
        >
          {isBadgeShow && (
            <Badge className="px-4 py-2" type="blue" text={BADGE_TEXTS[permission]} rounded />
          )}
        </div>
      </div>
    )
  }
)
