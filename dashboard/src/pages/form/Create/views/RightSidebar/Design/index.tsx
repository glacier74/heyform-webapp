import { useStore } from '@/store'
import { insertThemeStyle, insertWebFont } from '@heyforms/form-component'
import { Tabs } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Customize } from './Customize'
import { Theme } from './Theme'

const DesignComponent = () => {
  const { t } = useTranslation()
  const formStore = useStore('formStore')

  useEffect(() => {
    insertWebFont(formStore.customTheme!.fontFamily)
    insertThemeStyle(formStore.customTheme!)
  }, [formStore.customTheme])

  return (
    <Tabs type="segment" defaultActiveName="theme">
      <Tabs.Pane name="theme" title={t('formBuilder.theme')}>
        <Theme />
      </Tabs.Pane>
      <Tabs.Pane name="customize" title={t('formBuilder.customize')}>
        <Customize />
      </Tabs.Pane>
    </Tabs>
  )
}

export const Design = observer(DesignComponent)