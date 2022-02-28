import { removeObjectNil } from '@hpnp/utils'
import { stringify } from '@hpnp/utils/qs'

export function urlBuilder(prefix: string, query: Record<string, any>): string {
  return prefix + '?' + stringify(removeObjectNil(query), { encode: true })
}

export function loadScript(src: string, callback: () => void) {
  let attempts = 0

  const script = document.createElement('script')
  script.src = src
  document.head.appendChild(script)

  script.onload = callback
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
