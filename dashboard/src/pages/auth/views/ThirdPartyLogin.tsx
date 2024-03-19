import { removeObjectNil } from '@hpnp/utils'
import { stringify } from '@hpnp/utils/qs'
import { useTranslation } from 'react-i18next'

import { AppleIcon, GoogleIcon } from '@/components'
import { getDeviceId, useQuery, useRouter } from '@/utils'

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
          className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50"
          onClick={handleSignInWithGoogle}
        >
          <span className="sr-only">{t('login.Google')}</span>
          <GoogleIcon className="h-5 w-5" />
        </div>
      </div>

      <div>
        <div
          className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50"
          onClick={handleSignInWithApple}
        >
          <span className="sr-only">{t('login.Apple')}</span>
          <AppleIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
