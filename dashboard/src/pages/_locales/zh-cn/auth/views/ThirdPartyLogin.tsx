import { AlipayIcon, WechatIcon } from '@/components'
import { getDeviceId, redirectUriKey, setCookie, useQuery } from '@/utils'
import { isValid } from '@hpnp/utils/helper'
import { useTranslation } from 'react-i18next'

export const ThirdPartyLogin = () => {
  const query = useQuery()
  const { t } = useTranslation()

  function handleRedirect(type: string) {
    if (isValid(query.redirect_uri)) {
      setCookie(redirectUriKey, query.redirect_uri)
    }

    const state = getDeviceId()
    window.location.href = `/connect/${type}?state=${state}`
  }

  function handleSignInWithWechat() {
    handleRedirect('wechat')
  }

  function handleSignInWithAlipay() {
    handleRedirect('alipay')
  }

  return (
    <div className="mt-1 grid grid-cols-2 gap-2">
      <div>
        <div
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
          onClick={handleSignInWithAlipay}
        >
          <span className="sr-only">{t('login.Alipay')}</span>
          <AlipayIcon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
          onClick={handleSignInWithWechat}
        >
          <span className="sr-only">{t('login.Wechat')}</span>
          <WechatIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
