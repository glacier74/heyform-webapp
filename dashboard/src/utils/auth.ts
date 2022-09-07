import { isEqual, isValid } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'
import type { CookieAttributes } from 'js-cookie'
import cookies from 'js-cookie'
import store from 'store2'

export const deviceIdKey = 'HEYFORM_USER_ID'
export const loggedInKey = 'HEYFORM_LOGGED_IN'

const cookieOptions: CookieAttributes = {
  expires: 365,
  sameSite: 'strict',
  domain: import.meta.env.VITE_COOKIE_DOMAIN as string,
  secure: import.meta.env.NODE_ENV === 'production'
}

export function setCookie(key: string, value: string, options = cookieOptions) {
  cookies.set(key, value, options)
}

export function getCookie(key: string) {
  return cookies.get(key)
}

export function getAuthState() {
  const value = getCookie(loggedInKey)
  return isValid(value)
}

export function clearAuthState() {
  // Clear local storage
  Object.keys(localStorage).forEach(key => {
    if (key !== deviceIdKey) {
      store.remove(key)
    }
  })

  // Clear logged in cookie
  cookies.remove(loggedInKey, {
    path: '/',
    domain: import.meta.env.VITE_COOKIE_DOMAIN as string
  })
}

export function getDeviceId() {
  const storage = store.get(deviceIdKey)
  const cookie = getCookie(deviceIdKey)

  if (isValid(storage)) {
    if (!isEqual(storage, cookie)) {
      setCookie(deviceIdKey, storage)
    }
    return storage
  } else if (isValid(cookie)) {
    store.set(deviceIdKey, cookie)
    return cookie
  }
}

export function setDeviceId() {
  const deviceId = nanoid(12)

  setCookie(deviceIdKey, deviceId)
  store.set(deviceIdKey, deviceId)
}
