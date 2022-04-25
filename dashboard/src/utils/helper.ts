import { removeObjectNil } from '@hpnp/utils'
import { isValid } from '@hpnp/utils/helper'
import { stringify } from '@hpnp/utils/qs'
import isMobilePhone from 'validator/lib/isMobilePhone'

export function urlBuilder(prefix: string, query: Record<string, any>): string {
  return prefix + '?' + stringify(removeObjectNil(query), { encode: true })
}

const LOADED_SCRIPTS = new Set<string>()

export function loadScript(src: string, callback: () => void) {
  if (LOADED_SCRIPTS.has(src)) {
    return callback()
  }

  let attempts = 0

  const script = document.createElement('script')
  script.src = src
  document.head.appendChild(script)

  script.onload = () => {
    LOADED_SCRIPTS.add(src)
    callback()
  }

  script.onerror = () => {
    script.onload = null
    script.onerror = null
    document.removeChild(script)

    if (attempts < 3) {
      attempts += 1

      setTimeout(() => {
        loadScript(src, callback)
      }, 100)
    }
  }
}

export function redirectToStripeCheckout(sessionId: string) {
  return new Promise(resolve => {
    loadScript('https://js.stripe.com/v3/', () => {
      const stripe = (window as any).Stripe(import.meta.env.VITE_STRIPE_KEY)

      stripe.redirectToCheckout({
        sessionId
      })

      resolve(null)
    })
  })
}

export function insertStyle(id: string, style: string) {
  let styleElement = document.getElementById(id)

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = id

    document.head.appendChild(styleElement)
  }

  styleElement.innerHTML = style
}

export function isPhoneNumber(arg: any): boolean {
  return isValid(arg) && isMobilePhone(arg, 'zh-CN')
}
