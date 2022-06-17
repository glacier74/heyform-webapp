import { PlanCheck } from '@/components'
import { PlanGradeEnum } from '@/models'
import { useStoreContext } from '@/pages/form/Create/store'
import { Tabs } from '@heyforms/ui'
import type { ITab } from '@heyforms/ui/types/tabs/context'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Design } from './Design'
import { Logic } from './Logic'
import { Question } from './Question'

const RightSidebarComponent = () => {
  const { t } = useTranslation()
  const { dispatch } = useStoreContext()

  function render(tab: ITab) {
    switch (tab.name) {
      case 'question':
        return <PlanCheck permission={PlanGradeEnum.FREE}>{tab.title}</PlanCheck>

      default:
        return <PlanCheck permission={PlanGradeEnum.BASIC}>{tab.title}</PlanCheck>
    }
  }

  function handleChange(activeTabName: any) {
    dispatch({
      type: 'setActiveTabName',
      payload: {
        activeTabName
      }
    })
  }

  const renderCallback = useCallback(render, [])

  return (
    <div className="right-sidebar">
      <Tabs defaultActiveName="question" navRender={renderCallback} onChange={handleChange}>
        <Tabs.Pane name="question" title={t('formBuilder.question')}>
          <Question />
        </Tabs.Pane>
        <Tabs.Pane name="design" title={t('formBuilder.design')}>
          <Design />
        </Tabs.Pane>
        <Tabs.Pane name="logic" title={t('formBuilder.logic')}>
          <Logic />
        </Tabs.Pane>
      </Tabs>
    </div>
  )
}

export const RightSidebar = memo(RightSidebarComponent)
