import { PlanCheck } from '@/components'
import { PlanGradeEnum } from '@/models'
import { Tabs } from '@heyforms/ui'
import type { ITab } from '@heyforms/ui/types/tabs/context'
import { memo, useCallback } from 'react'
import { Customize } from './Customize'
import { Question } from './Question'
import { Theme } from './Theme'

const RightSidebarComponent = () => {
  function render(tab: ITab) {
    switch (tab.name) {
      case 'question':
        return <PlanCheck permission={PlanGradeEnum.FREE}>{tab.title}</PlanCheck>

      default:
        return <PlanCheck permission={PlanGradeEnum.BASIC}>{tab.title}</PlanCheck>
    }
  }

  const renderCallback = useCallback(render, [])

  return (
    <div className="right-sidebar flex flex-col w-64 bg-white border-l border-gray-200">
      <Tabs defaultActiveName="question" navRender={renderCallback}>
        <Tabs.Pane name="question" title="Question">
          <Question />
        </Tabs.Pane>
        <Tabs.Pane name="theme" title="Theme">
          <Theme />
        </Tabs.Pane>
        <Tabs.Pane name="customize" title="Customize">
          <Customize />
        </Tabs.Pane>
      </Tabs>
    </div>
  )
}

export const RightSidebar = memo(RightSidebarComponent)
