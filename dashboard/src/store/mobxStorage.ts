import { isValid } from '@hpnp/utils/helper'
import { pickValidValues } from '@hpnp/utils/object'
import { autorun, set, toJS } from 'mobx'
import store2 from 'store2'

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
