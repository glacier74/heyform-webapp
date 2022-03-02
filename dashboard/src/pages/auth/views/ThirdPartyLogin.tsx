import { AppleIcon, GoogleIcon } from '@/components'
import { getDeviceId, redirectUriKey, setCookie, useQuery } from '@/utils'
import { isValid } from '@hpnp/utils/helper'

export const ThirdPartyLogin = () => {
  const query = useQuery()

  function handleRedirect(type: string) {
    if (isValid(query.redirect_uri)) {
      setCookie(redirectUriKey, query.redirect_uri)
    }

    const state = getDeviceId()
    window.location.href = `/connect/${type}?state=${state}`
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
          <span className="sr-only">Sign in with Google</span>
          <GoogleIcon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
          onClick={handleSignInWithApple}
        >
          <span className="sr-only">Sign in with Apple</span>
          <AppleIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
