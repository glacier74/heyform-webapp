import { removeObjectNil } from '@hpnp/utils'
import { isURL, isValid } from '@hpnp/utils/helper'
import { stringify } from '@hpnp/utils/qs'
import isMobilePhone from 'validator/lib/isMobilePhone'

export function urlBuilder(prefix: string, query: Record<string, any>): string {
  return prefix + '?' + stringify(removeObjectNil(query), { encode: true })
}

const LOADED_SCRIPTS = new Set<string>()

export function loadScript(
  name: string,
  src: string,
  callback: (err?: Error) => void,
  attempts = 0
) {
  if (LOADED_SCRIPTS.has(src)) {
    return callback()
  }

  let script = document.getElementById(name) as HTMLScriptElement

  if (!script) {
    script = document.createElement('script')
    script.id = name
    script.src = src
    document.head.appendChild(script)
  }

  script.onload = () => {
    LOADED_SCRIPTS.add(src)
    callback()
  }

  script.onerror = () => {
    script.onload = null
    script.onerror = null
    document.head.removeChild(script)

    if (attempts >= 3) {
      return callback(new Error(`Failed to load script ${name}`))
    }

    attempts += 1

    setTimeout(() => {
      loadScript(name, src, callback, attempts)
    }, attempts * 50)
  }
}

export function redirectToStripeCheckout(sessionId: string) {
  return new Promise((resolve, reject) => {
    loadScript('stripe-v3', 'https://js.stripe.com/v3/', err => {
      if (err) {
        return reject(err)
      }

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

const cropImageRules: Array<Record<string, any>> = [
  {
    match: 'https://storage-us.heyformhq.com',
    handler(src: string, width: number, height: number) {
      const mode = width === height ? 1 : 2
      return `${src}?imageView2/${mode}/w/${width}/h/${height}/format/webp/interlace/1`
    }
  },
  {
    match: 'https://images.unsplash.com',
    handler(src: string, width: number, height: number) {
      src = src!.replace(/&(w|h)=\d+/g, '')

      if (width === height) {
        src = src!.replace(/&fit=[^&]+/i, '&fit=crop')
      }

      return `${src}&w=${width}&h=${height}`
    }
  }
]

export function cropImage(src?: string, width = 0, height = 0): string | undefined {
  if (isURL(src)) {
    for (const rule of cropImageRules) {
      if (src!.startsWith(rule.match)) {
        return rule.handler(src!, width, height)
      }
    }

    return src
  }
}

const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export class SecondUtils {
  static parse(num: number, unit: string): number {
    if (unit === 'd') {
      return num * DAY
    }
    if (unit === 'h') {
      return num * HOUR
    }
    if (unit === 'm') {
      return num * MINUTE
    }
    return num * SECOND
  }

  static stringify(hs: number): [number, string] {
    if (hs >= DAY) {
      return [Math.round(hs / DAY), 'd']
    }
    if (hs >= HOUR) {
      return [Math.round(hs / HOUR), 'h']
    }
    if (hs >= MINUTE) {
      return [Math.round(hs / MINUTE), 'm']
    }
    return [hs, 's']
  }
}
