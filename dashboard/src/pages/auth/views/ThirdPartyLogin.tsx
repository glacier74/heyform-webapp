import { AppleIcon, GoogleIcon } from '@/components'
import { getDeviceId, useQuery, useRouter } from '@/utils'
import { removeObjectNil } from '@hpnp/utils'
import { stringify } from '@hpnp/utils/qs'
import { useTranslation } from 'react-i18next'

export const ThirdPartyLogin = () => {
  const query = useQuery()
  const router = useRouter()
  const { t } = useTranslation()

  function handleRedirect(type: string) {
    const state = getDeviceId()
    const q = removeObjectNil({
      state,
      redirect_uri: query.redirect_uri
    })

    router.redirect(`/connect/${type}?${stringify(q, { encode: true })}`)
  }

  function handleSignInWithApple() {
    handleRedirect('apple')
  }

  function handleSignInWithGoogle() {
    handleRedirect('google')
  }

  return (
    <div className="mt-1 grid grid-cols-2 gap-2">
      <div>
        <div
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
          onClick={handleSignInWithGoogle}
        >
          <span className="sr-only">{t('login.Google')}</span>
          <GoogleIcon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
          onClick={handleSignInWithApple}
        >
          <span className="sr-only">{t('login.Apple')}</span>
          <AppleIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
