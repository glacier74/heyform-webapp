import { insertWebFont } from '@heyforms/form-component'
import { Tabs } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { TabPanePlanCheck } from '@/components'
import { PlanGradeEnum } from '@/models'
import { useStore } from '@/store'
import { insertThemeStyle } from '@/utils'

import { Customize } from './Customize'
import { Theme } from './Theme'
import './style.scss'

const DesignComponent = () => {
  const { t } = useTranslation()
  const formStore = useStore('formStore')

  useEffect(() => {
    insertWebFont(formStore.customTheme!.fontFamily)
    insertThemeStyle(formStore.customTheme!)
  }, [formStore.customTheme])

  return (
    <Tabs className="right-sidebar-design" type="segment" defaultActiveName="theme">
      <Tabs.Pane name="theme" title={t('formBuilder.theme')}>
        <TabPanePlanCheck permission={PlanGradeEnum.BASIC}>
          <Theme />
        </TabPanePlanCheck>
      </Tabs.Pane>
      <Tabs.Pane name="customize" title={t('formBuilder.customize')}>
        <TabPanePlanCheck permission={PlanGradeEnum.BASIC}>
          <Customize />
        </TabPanePlanCheck>
      </Tabs.Pane>
    </Tabs>
  )
}

export const Design = observer(DesignComponent)
