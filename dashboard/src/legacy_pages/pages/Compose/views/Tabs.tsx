import { ComposeTabKeyEnum } from '@/legacy_pages/models'
import { useStore } from '@/legacy_pages/utils'
import { observer } from 'mobx-react-lite'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface TabOptions {
  key: ComposeTabKeyEnum
  title: string
  icon: ReactNode
}

interface TabsProps {
  tabs: TabOptions[]
}

export const Tabs: FC<TabsProps> = observer(({ tabs }) => {
  const composeStore = useStore('composeStore')

  function handleClick(key: ComposeTabKeyEnum) {
    if (key === composeStore.activeTab) {
      composeStore.clearTabKey()
    } else {
      composeStore.setTabKey(key)
    }
  }

  return (
    <>
      {tabs.map(row => (
        <TabItem
          active={row.key === composeStore.activeTab}
          title={row.title}
          onClick={() => handleClick(row.key)}
        >
          {row.icon}
        </TabItem>
      ))}
    </>
  )
})

const TabItem = styled.div<{
  active?: boolean
}>`
  color: #8a94a6;
  cursor: pointer;
  line-height: 1;
  transition: background-color, color 0.3s;

  &:hover {
    background: #f5f6f7;
  }

  svg {
    width: 48px;
    height: 48px;
    padding: 14px;
  }

  ${({ active }) =>
    active &&
    `
    background: #f5f6f7;
    color: #4e5d78;
  `}
`
