import { Heading } from '@/legacy_pages/components/Heading'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { Plans } from '@/legacy_pages/pages/Billing/views/Plans'
import { useStore } from '@/legacy_pages/utils'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const UpgradePlanModal: FC = observer(() => {
  const { t } = useTranslation()
  const appStore = useStore('appStore')

  function handleClose() {}

  useEffect(() => {
    if (appStore.upgradePlanVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [appStore.upgradePlanVisible])

  return (
    <>
      {appStore.upgradePlanVisible && (
        <Container close={true} onClose={handleClose}>
          <Heading description={t('Unlock more features')} style={{ textAlign: 'center' }}>
            {t('Upgrade your plan')}
          </Heading>
          <Plans />
        </Container>
      )}
    </>
  )
})

const Container = styled(NavBarContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
  overflow-y: auto;

  .content {
    width: 1044px;
  }
`
