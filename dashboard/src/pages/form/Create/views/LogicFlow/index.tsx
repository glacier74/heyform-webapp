import { EdgeArrow, TabPanePlanCheck } from '@/components'
import { PlanGradeEnum } from '@/models'
import { ReactFlowProvider } from 'react-flow-renderer'
import { Flow } from './Flow'

export const LogicFlow = () => {
  return (
    <div className="logic-flow">
      <EdgeArrow />
      <ReactFlowProvider>
        <TabPanePlanCheck permission={PlanGradeEnum.PREMIUM} isBadgeShow={false}>
          <Flow />
        </TabPanePlanCheck>
      </ReactFlowProvider>
    </div>
  )
}
