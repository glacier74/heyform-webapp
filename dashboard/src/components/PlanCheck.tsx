import { PlanGradeEnum } from '@/models'
import { useStore } from '@/store'
import { Badge } from '@heyforms/ui'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

interface UpgradeButtonProps extends IComponentProps {
  permission: PlanGradeEnum
  isBadgeShow?: boolean
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
          className="plan-check-container flex items-center justify-end absolute inset-0 z-10 cursor-pointer"
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
          className="tab-pane_plan-check absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white bg-opacity-5 cursor-pointer"
          onClick={handleClick}
        >
          {isBadgeShow && <Badge className="px-4 py-2" type="blue" text="Premium" rounded />}
        </div>
      </div>
    )
  }
)
