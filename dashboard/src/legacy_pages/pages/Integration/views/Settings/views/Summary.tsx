/**
 * @program: dashboard-next
 * @description:
 * @author:
 * @date: 2021-06-16 10:53
 **/

import { Heading } from '@/legacy_pages/components'
import { RoundLogo } from '@/legacy_pages/components/RoundLogo'
import { AppModel } from '@/legacy_pages/models'
import { Flex, Image } from '@heyui/component'
import { MoreIcon } from '@heyui/icon'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

interface SummaryProps {
  app?: AppModel
}

export const Summary: FC<SummaryProps> = ({ app }) => {
  const { t } = useTranslation()

  return (
    <Container>
      <Flex align="center" justify="center">
        <StyledRoundLogo />
        <StyledMoreIcon />
        <ImageContainer url={app?.avatar!} width={120} height={120} />
      </Flex>

      <StyledHeading
        description={
          <>
            {app?.description}{' '}
            <a href={app?.helpLinkUrl} target="_blank" rel="noreferrer">
              {t('integration.LearnAbout')} {app?.name} {t('integration.integration')}
            </a>
          </>
        }
      >
        {t('integration.ConnectWith')} {app?.name}
      </StyledHeading>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 24px;
`

export const commonCss = css`
  position: relative;
  width: 54px;
  height: 54px;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`

const StyledRoundLogo = styled(RoundLogo)`
  margin: 0 20px;
  ${commonCss};
  padding: 8px;

  svg {
    width: 36px;
    height: 36px;
  }
`

const StyledMoreIcon = styled(MoreIcon)`
  width: 36px;
  height: 36px;
  color: ${props => props.theme.disabled};
`

const ImageContainer = styled(Image)`
  margin: 0 20px;
  ${commonCss};
  padding: 10px;

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }
`

const StyledHeading = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 32px;

  .heading-title,
  .heading-description {
    display: block;
    text-align: center;
  }

  a {
    color: #8a94a6;
    text-decoration: underline;

    &:hover {
      color: #0252d7;
    }
  }
`
