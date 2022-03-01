import { AudienceFillIcon } from '@/legacy_pages/components/Icons'
import { Button, Flex } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'
import { ShareAudienceModal } from './ShareAudienceModal'

export const ShareToAudience: FC = () => {
  const { t } = useTranslation()
  const { workspaceId } = useParam()
  const [visible, setVisible] = useState(false)

  return (
    <Container>
      <Header align="center">
        <AudienceFillIcon />
        <span>{t('Share to audience')}</span>
      </Header>
      <Description>
        {t('Send form to the right audience for accurate results. You can')}{' '}
        <a href={`/workspace/${workspaceId}/audience`}>{t('add contacts')}</a>{' '}
        {t('or organize them into')}{' '}
        <a href={`/workspace/${workspaceId}/audience/groups`}>{t('groups')}</a>{' '}
        {t(
          'to share forms with them more easily without manually enter all the email addresses everytime.'
        )}
      </Description>
      <Button type="primary" block={true} onClick={() => setVisible(true)}>
        {t('Share')}
      </Button>

      <ShareAudienceModal visible={visible} onVisibleChange={setVisible} />
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
  margin-left: 40px;
  padding: 34px;
  background: #fff;
`

const Header = styled(Flex)`
  margin-bottom: 32px;

  svg {
    width: 24px;
    height: 24px;
    color: #b0b7c3;
  }

  span {
    margin-left: 12px;
    font-size: 16px;
  }
`

const Description = styled.div`
  line-height: 1.8;
  margin-bottom: 40px;
`
