import { Fetcher, Heading, SubHeading } from '@/legacy_pages/components'
import { INTEGRATION_CATEGORIES } from '@/legacy_pages/constants'
import { AppService, FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { Flex } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParam } from '@/utils'
import styled from 'styled-components'
import { AppItem } from './views/AppItem'
import { IntegrationSkeleton } from './views/IntegrationSkeleton'
import { Settings } from './views/Settings'

interface CategoryItemProps {
  name: string
}

const CategoryItem: FC<CategoryItemProps> = ({ name }) => {
  const { t } = useTranslation()

  function handleClick() {
    document.getElementById(name)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return <CategoryLink onClick={handleClick}>{t(name)}</CategoryLink>
}

const Integration: FC = observer(() => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const integrationStore = useStore('integrationStore')
  const [selectedAppId, setSelectedAppId] = useState<string | undefined>()
  const [visible, setVisible] = useState(false)

  async function fetchIntegrations() {
    const [result1, result2] = await Promise.all([
      AppService.apps(),
      FormService.integrations(formId)
    ])

    integrationStore.setApps(result1)
    integrationStore.setIntegrations(result2)

    return true
  }

  function handleClick(app: any) {
    setSelectedAppId(app.id)
    setVisible(true)
  }

  return (
    <Flex justify="center">
      <Sidebar>
        <CategoryList>
          <CategoryHeader>{t('Categories')}</CategoryHeader>
          {INTEGRATION_CATEGORIES.map((name, index) => (
            <CategoryItem key={index} name={name} />
          ))}
        </CategoryList>
      </Sidebar>

      <Body>
        <Heading
          description={
            <>
              {t('Connect your form data with other apps, get to the')}{' '}
              <a href="https://help.heyform.net">{t('Help Center')}</a>{' '}
              {t('here to help you connect the apps.')}
            </>
          }
        >
          {t('Integrations')}
        </Heading>

        <Fetcher
          request={fetchIntegrations}
          deps={[formId]}
          useCache={integrationStore.apps.length > 0}
          skeleton={<IntegrationSkeleton />}
        >
          {INTEGRATION_CATEGORIES.map((category, index) => (
            <Group key={index}>
              <StyledSubHeading id={category}>{t(category)}</StyledSubHeading>
              {integrationStore.integratedApps
                .filter(app => app.category === category)
                .map((app, index) => (
                  <AppItem
                    key={index}
                    app={app}
                    onClick={handleClick}
                    onDelete={fetchIntegrations}
                  />
                ))}
            </Group>
          ))}
        </Fetcher>
      </Body>

      <Settings appId={selectedAppId} visible={visible} onVisibleChange={setVisible} />
    </Flex>
  )
})

export default Integration

const Sidebar = styled.div`
  width: 280px;
`

const CategoryList = styled.div`
  position: sticky;
  top: 40px;
  margin-top: 80px;
  padding: 20px;
  background: #fff;
  border-radius: 3px;
`

const CategoryHeader = styled.div`
  padding: 8px 14px;
  color: #8a94a6;
`

const CategoryLink = styled.div`
  display: block;
  padding: 8px 14px;
  color: #4e5d78;
  font-weight: 400;
  cursor: pointer;
`

const Body = styled.div`
  margin: 80px 0 64px 64px;
  width: 700px;
  border-radius: 3px;
`

const StyledSubHeading = styled(SubHeading)`
  padding-top: 36px;
  margin-bottom: 24px;
`

const Group = styled.div`
  margin-bottom: 16px;
`
