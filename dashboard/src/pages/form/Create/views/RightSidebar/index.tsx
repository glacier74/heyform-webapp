import { loadFont } from '@/legacy_pages/utils'
import { useStore } from '@/store'
import { insertStyle } from '@/utils'
import { getTheme, getThemeStyles } from '@heyforms/form-component'
import { Tabs } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Customize } from './Customize'
import { Question } from './Question'
import { Theme } from './Theme'

export const RightSidebar = observer(() => {
  const formStore = useStore('formStore')

  function handleThemeChange() {
    const theme = getTheme(formStore.current!.themeSettings!.theme)
    const themeStyle = getThemeStyles(theme)

    loadFont(theme.fontFamily)
    insertStyle('heyform-theme', themeStyle)
  }

  useEffect(() => {
    if (isValid(formStore.current?.themeSettings?.theme)) {
      handleThemeChange()
    }
  }, [formStore.current?.themeSettings?.theme])

  return (
    <div className="right-sidebar flex flex-col w-64 bg-white border-l border-gray-200">
      <Tabs defaultActiveName="question">
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
})
