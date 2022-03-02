import { PlanGradeEnum } from '@/models'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

interface UpgradeButtonProps extends IComponentProps {
  permission: PlanGradeEnum
}

export const PlanCheck: FC<UpgradeButtonProps> = observer(({ permission, children }) => {
  const appStore = useStore('appStore')
  const workspaceStore = useStore('workspaceStore')
  const grade = workspaceStore.workspace?.plan.grade || PlanGradeEnum.FREE

  function handleClick(event: any) {
    event.stopPropagation()
    appStore.isPlanModalOpen = true
  }

  return (
    <div className="relative">
      {children}
      {grade < permission && (
        <div className="absolute inset-0 z-10 cursor-pointer" onClick={handleClick} />
      )}
    </div>
  )
})
