import { Tabs } from '@heyforms/ui'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { TabPanePlanCheck } from '@/components'
import { PlanGradeEnum } from '@/models'
import { useStoreContext } from '@/pages/form/Create/store'
import { Design } from '@/pages/form/Create/views/RightSidebar/Design'

import { Logic } from './Logic'
import { Question } from './Question'

const RightSidebarComponent = () => {
  const { t } = useTranslation()
  const { dispatch } = useStoreContext()

  function handleChange(activeTabName: any) {
    dispatch({
      type: 'setActiveTabName',
      payload: {
        activeTabName
      }
    })
  }

  return (
    <div className="right-sidebar">
      <Tabs defaultActiveName="question" onChange={handleChange}>
        <Tabs.Pane name="question" title={t('formBuilder.question')}>
          <Question />
        </Tabs.Pane>
        <Tabs.Pane name="design" title={t('formBuilder.design')}>
          <TabPanePlanCheck permission={PlanGradeEnum.PREMIUM}>
            <Design />
          </TabPanePlanCheck>
        </Tabs.Pane>
        <Tabs.Pane name="logic" title={t('formBuilder.logic')}>
          <Logic />
        </Tabs.Pane>
      </Tabs>
    </div>
  )
}

export const RightSidebar = memo(RightSidebarComponent)
