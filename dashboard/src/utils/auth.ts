import { date } from '@hpnp/utils/date'
import { isEqual, isValid } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'
import cookies, { CookieAttributes } from 'js-cookie'
import store from 'store2'

export const workspaceIdKey = 'HEYFORM_WORKSPACE_ID'
export const deviceIdKey = 'HEYFORM_USER_ID'
export const loggedInKey = 'HEYFORM_LOGGED_IN'
export const dangerZoneKey = 'HEYFORM_SUPERMAN'

const cookieOptions: CookieAttributes = {
  expires: 365,
  sameSite: 'strict',
  domain: import.meta.env.VITE_APP_COOKIE_DOMAIN as string,
  secure: import.meta.env.NODE_ENV === 'production'
}

export function getAuthState() {
  const value = cookies.get(loggedInKey)
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
    domain: import.meta.env.VITE_APP_COOKIE_DOMAIN as string
  })
}

export function getDeviceId() {
  const storage = store.get(deviceIdKey)
  const cookie = cookies.get(deviceIdKey)

  if (isValid(storage)) {
    if (!isEqual(storage, cookie)) {
      cookies.set(deviceIdKey, storage, cookieOptions)
    }
    return storage
  } else if (isValid(cookie)) {
    store.set(deviceIdKey, cookie)
    return cookie
  }
}

export function setDeviceId() {
  const deviceId = nanoid(8)

  cookies.set(deviceIdKey, deviceId, cookieOptions)
  store.set(deviceIdKey, deviceId)
}
