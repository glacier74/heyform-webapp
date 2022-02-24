import { removeObjectNil } from '@hpnp/utils'
import { stringify } from '@hpnp/utils/qs'

export function urlBuilder(prefix: string, query: Record<string, any>): string {
  return prefix + '?' + stringify(removeObjectNil(query), { encode: true })
}
