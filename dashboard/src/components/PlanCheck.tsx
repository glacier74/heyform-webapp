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

export const PlanBadge: FC<UpgradeButtonProps> = ({ permission }) => {
  const workspaceStore = useStore('workspaceStore')
  const grade = workspaceStore.workspace?.plan.grade || PlanGradeEnum.FREE

  if (grade >= permission) {
    return null
  }

  return <Badge className="px-2" type="blue" text="Premium" rounded />
}

export const PlanCheck: FC<UpgradeButtonProps> = observer(
  ({ className, permission, isBadgeShow = true, children }) => {
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
      <div className={clsx('plan-check relative', className)}>
        {children}
        <div
          className="plan-check-container absolute inset-0 z-10 flex cursor-pointer items-center justify-end"
          onClick={handleClick}
        >
          {isBadgeShow && <Badge className="px-2" type="blue" text="Premium" rounded />}
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
      <div className="absolute inset-0 z-10 overflow-hidden">
        {children}
        <div
          className="tab-pane_plan-check absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-white bg-opacity-5 backdrop-blur-sm"
          onClick={handleClick}
        >
          {isBadgeShow && <Badge className="px-4 py-2" type="blue" text="Premium" rounded />}
        </div>
      </div>
    )
  }
)
