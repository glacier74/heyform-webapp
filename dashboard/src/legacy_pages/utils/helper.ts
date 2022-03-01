import { GOOGLE_FONTS } from '@/legacy_pages/constants'
import { resizeImage } from '@heyui/component'
import { isFunction, isObject, isURL, isValid, isValidArray } from '@hpnp/utils/helper'
import { pickValidValues, removeObjectNil } from '@hpnp/utils/object'
import { stringify } from '@hpnp/utils/qs'
import { autorun, set, toJS } from 'mobx'
import store2 from 'store2'
import { Md5 } from 'ts-md5/dist/md5'

export function sortRoute(pathA: string, pathB: string) {
  if (/^\/$/.test(pathA)) {
    return -1
  }

  if (/^\/$/.test(pathB)) {
    return 1
  }

  const slicedA = pathA.split('/')
  const slicedB = pathB.split('/')
  const depthA = slicedA.length
  const depthB = slicedB.length

  if (depthA === depthB) {
    const weightA = pathWeight(slicedA)
    const weightB = pathWeight(slicedB)
    return weightA > weightB ? 1 : -1
  } else {
    return depthA > depthB ? 1 : -1
  }
}

export function isMobile(): boolean {
  return /iPhone|iPod|\bAndroid(?:.+)Mobile\b/i.test(window.navigator.userAgent)
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function stopPropagation(event: any) {
  event.stopPropagation()
}

export function mobxStorage(storeInstance: any, storeName: string, fields?: string[]) {
  const cache = store2.get(storeName)

  if (isValid(cache)) {
    set(storeInstance, cache)
  }

  autorun(() => {
    let value = toJS(storeInstance)

    if (isValid(fields)) {
      value = pickValidValues(value, fields!)
    }

    store2.set(storeName, value)
  })
}

export function formatSeconds(t: number): string {
  if (t < 60) {
    return `${t}s`
  }

  const m = Math.floor(t / 60)
  const s = t % 60

  return `${m}m ${s}s`
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

export function loadFont(fontName?: string) {
  if (!fontName || !GOOGLE_FONTS.includes(fontName)) {
    return
  }

  const fontFamily = fontName.replace(/\s+/g, '+')

  if (document.getElementById(fontFamily)) {
    return
  }

  const link = document.createElement('link')
  const href = `https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap`

  link.setAttribute('id', fontFamily)
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)

  document.head.appendChild(link)
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function redirectToStripe(sessionId: string) {
  loadScript('https://js.stripe.com/v3/', () => {
    const stripe = window.Stripe(import.meta.env.VITE_STRIPE_KEY)

    stripe.redirectToCheckout({
      sessionId
    })
  })
}

export function getResizeImageUrl(url: string, width = 400, height = 240): string | undefined {
  if (isValid(url) && isURL(url)) {
    return resizeImage({
      url,
      width,
      height,
      fit: 'cover'
    })
  }
}

export function urlBuilder(prefix: string, query: Record<string, any>): string {
  return prefix + '?' + stringify(removeObjectNil(query), { encode: true })
}

export function gravatar(email: string, size = 120) {
  const hash = Md5.hashStr(email)
  return `https://secure.gravatar.com/avatar/${hash}?s=${size}&d=mm&r=g`
}

const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export function formatHs(hs: number): [number, string] {
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

export function hsToSecond(num: number, unit: string): number {
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

export function pickInArray(arr: any[], key: string, index = 0) {
  if (isValidArray(arr) && isValid(arr![index])) {
    return arr![index][key]
  }
}

// Fork from https://github.com/fvilers/disable-react-devtools
export function disableReactDevTools() {
  // Ensure the React Developer Tools global hook exists
  if (!isObject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
    return
  }

  // Replace all global hook properties with a no-op function or a null value
  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = isFunction(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop]
    )
      ? Function.prototype
      : null
  }
}

/*!
 * route-order https://github.com/sfrdmn/node-route-order
 *
 * Takes a sliced path and returns an integer representing the
 * "weight" of its free variables. More specific routes are heavier
 *
 * Intuitively: when a free variable is at the base of a path e.g.
 * '/:resource', this is more generic than '/resourceName/:id' and thus has
 * a lower weight
 *
 * Weight can only be used to compare paths of the same depth
 */
function pathWeight(sliced: string[]): number {
  return sliced.reduce(function (weight, part, i) {
    // If is bound part
    if (!/^:.+$/.test(part)) {
      // Weight is positively correlated to indexes of bound parts
      weight += Math.pow(i + 1, sliced.length)
    }
    return weight
  }, 0)
}
