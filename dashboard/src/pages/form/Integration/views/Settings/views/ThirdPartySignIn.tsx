import { Button } from '@heyforms/ui'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { GoogleIcon } from '@/components'
import { AppModel } from '@/models'
import { IntegrationService } from '@/service'
import { useParam, useWindow } from '@/utils'

interface ThirdPartySignInProps {
  app?: AppModel
  authorized?: boolean
  oauthRequest: (code: string) => Promise<void>
}

const LoginWithGoogle: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <GoogleIcon className="mr-5 h-5 w-5" />
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

  useWindow(oauthUrl, { source: 'heyform-integration' }, async (payload: any) => {
    await oauthRequest(payload.code)
  })

  return (
    <div className="third-party-signin-container relative pb-4">
      <div className="mb-3 font-medium">{t('integration.Authorization')}</div>
      <div className="mb-3 text-[#8a94a6]">{t('integration.AuthorizationText')}</div>
      <Button
        className="flex items-center"
        onClick={handleClick}
        loading={loading}
        block={true}
        disabled={authorized}
      >
        {app?.uniqueId === 'googledrive' || app?.uniqueId === 'googlesheets' ? (
          <LoginWithGoogle />
        ) : (
          <>
            <img className="third-party-signin-image" src={app?.avatar} />
            <span>
              {authorized ? (
                'Authorized'
              ) : (
                <>
                  {t('integration.login')} {app?.name}
                </>
              )}
            </span>
          </>
        )}
      </Button>
    </div>
  )
}
