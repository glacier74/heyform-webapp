import GoogleImage from '@/legacy_pages/assets/google.svg'
import { AppModel } from '@/legacy_pages/models'
import { commonCss } from '@/legacy_pages/pages/Integration/views/Settings/views/Summary'
import { usePopup } from '@/legacy_pages/utils'
import { IntegrationService } from '@/service'
import { useParam } from '@/utils'
import { Button, Image } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface ThirdPartySignInProps {
  app?: AppModel
  authorized?: boolean
  oauthRequest: (code: string) => Promise<void>
}

const LoginWithGoogle: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <img src={GoogleImage} width={20} height={20} style={{ marginRight: 12 }} alt=""/>
      {t('integration.loginGoogle')}
    </>
  )
}

export const ThirdPartySignIn: FC<ThirdPartySignInProps> = ({
                                                              app,
                                                              authorized = false,
                                                              oauthRequest
                                                            }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [loading, setLoading] = useState(false)
  const [oauthUrl, setOauthUrl] = useState<string | undefined | null>()
  const { t } = useTranslation()

  async function handleClick() {
    if (loading) {
      return
    }

    setLoading(true)
    setOauthUrl(null)

    const result = await IntegrationService.oauthUrl(formId, appId)
    setOauthUrl(result)

    setLoading(false)
  }

  usePopup(oauthUrl, async (payload: any) => {
    await oauthRequest(payload.code)
  })

  return (
    <Container>
      <Heading>{t('integration.Authorization')}</Heading>
      <SubHeading>{t('integration.AuthorizationText')}</SubHeading>
      <Button onClick={handleClick} loading={loading} block={true} disabled={authorized}>
        {app?.uniqueId === 'googledrive' || app?.uniqueId === 'googlesheets' ? (
          <LoginWithGoogle/>
        ) : (
          <>
            <ImageContainer url={app?.avatar!} width={40} height={40}/>
            <span>{authorized ? 'Authorized' : <>{t('integration.login')} {app?.name}</>}</span>
          </>
        )}
      </Button>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding-bottom: 16px;

  .hey-button {
    width: auto;
  }
`

const Heading = styled.div`
  font-weight: 500;
  margin-bottom: 10px;
`

const SubHeading = styled.div`
  margin-bottom: 10px;
  color: #8a94a6;
`

const ImageContainer = styled(Image)`
  ${commonCss};
  width: 30px;
  height: 30px;
  margin-right: 12px;
  padding: 4px;

  img {
    display: block;
    width: 20px;
    height: 20px;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }
`
