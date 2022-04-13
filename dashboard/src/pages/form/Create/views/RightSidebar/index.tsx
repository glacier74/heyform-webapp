import { Tabs } from '@heyforms/ui'
import { memo } from 'react'
import { Customize } from './Customize'
import { Question } from './Question'
import { Theme } from './Theme'

const RightSidebarComponent = () => {
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
}

export const RightSidebar = memo(RightSidebarComponent)
