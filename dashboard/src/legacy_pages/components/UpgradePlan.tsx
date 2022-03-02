import { PlanGradeEnum } from '@/legacy_pages/models'
import { useStore } from '@/legacy_pages/utils'
import { ComponentProps, Flex } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface UpgradePlanProps extends ComponentProps {
  name: string
  permission: PlanGradeEnum
}

export const UpgradePlan: FC<UpgradePlanProps> = observer(
  ({ name, permission, children, ...restProps }) => {
    const appStore = useStore('appStore')
    const workspaceStore = useStore('workspaceStore')

    function handleClick(event: any) {
      event.stopPropagation()
      appStore.isPlanModalOpen = true
    }

    return (
      <Container>
        {children}
        {workspaceStore.workspace?.plan.grade! < permission && (
          <Wrapper align="center" justify="flex-end" {...restProps} onClick={handleClick} />
        )}
      </Container>
    )
  }
)

export const PlanPermissionBadge: FC<UpgradePlanProps> = observer(({ name, permission }) => {
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')

  return (
    <>
      {workspaceStore.workspace?.plan.grade! < permission && (
        <Badge className="upgrade-badge">{t(name)}</Badge>
      )}
    </>
  )
})

const Container = styled.div`
  position: relative;
`

const Wrapper = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  cursor: pointer;
`

const Badge = styled.span`
  margin-left: 12px;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #377dff;
  text-align: center;
  border-radius: 4px;
  background: #ebf2ff;
`
