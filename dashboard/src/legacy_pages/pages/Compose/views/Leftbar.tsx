import { PlatteIcon, ThemeIcon } from '@/legacy_pages/components/Icons'
import { UpgradePlan } from '@/legacy_pages/components/UpgradePlan'
import { ComposeTabKeyEnum, PlanGradeEnum } from '@/legacy_pages/models'
import { useStore } from '@/legacy_pages/utils'
import { Flex } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Customize } from './Customize'
import { Tabs } from './Tabs'
import { Themes } from './Themes'

const Pane: FC = observer(() => {
  const composeStore = useStore('composeStore')

  return (
    <PaneContainer className="scrollbar">
      {(() => {
        switch (composeStore.activeTab) {
          // @Discard at Jan 19, 2022 at Form Builder v2.0
          // case ComposeTabKeyEnum.COMPONENT:
          //   return <Components />

          case ComposeTabKeyEnum.THEME:
            return <Themes />

          case ComposeTabKeyEnum.CUSTOMIZE:
            return <Customize />
        }
      })()}
    </PaneContainer>
  )
})

export const Leftbar: FC = observer(() => {
  const { t } = useTranslation()
  const composeStore = useStore('composeStore')

  return (
    <Container active={composeStore.activeTab}>
      <TabsContainer>
        <Tabs
          tabs={[
            // @Discard at Jan 19, 2022 at Form Builder v2.0
            // {
            //   key: ComposeTabKeyEnum.COMPONENT,
            //   title: t('Components'),
            //   icon: <EditIcon />
            // },
            {
              key: ComposeTabKeyEnum.THEME,
              title: t('Theme'),
              icon: (
                <UpgradePlan name="Basic" permission={PlanGradeEnum.BASIC}>
                  <ThemeIcon />
                </UpgradePlan>
              )
            },
            {
              key: ComposeTabKeyEnum.CUSTOMIZE,
              title: t('Customize'),
              icon: (
                <UpgradePlan name="Basic" permission={PlanGradeEnum.BASIC}>
                  <PlatteIcon />
                </UpgradePlan>
              )
            }
          ]}
        />
      </TabsContainer>

      <Pane />
    </Container>
  )
})

const Container = styled(Flex)<{
  active?: boolean
}>`
  background: #fff;
  width: 48px;
  height: calc(100vh - 60px);
  transition: width 0.3s;
  border-right: #f3f3f3 1px solid;

  ${({ active }) =>
    active &&
    `
    width: 360px;
  `}
`

const TabsContainer = styled.div`
  width: 48px;
  background: #fafbfc;
`

const PaneContainer = styled.div`
  flex: 1;
  padding: 0 12px;
  height: calc(100vh - 60px);
  overflow-y: auto;
`
