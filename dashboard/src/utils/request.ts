import { ApolloClient, ApolloQueryResult, InMemoryCache, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { isValid } from '@hpnp/utils/helper'
import { RetryLink } from 'apollo-link-retry'
import ApolloLinkTimeout from 'apollo-link-timeout'
import { createUploadLink } from 'apollo-upload-client'

import { clearAuthState, getDeviceId } from '@/utils'

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_GRAPHQL_URI as string,
  credentials: 'include'
})

const retryLink: any = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  }
})

const timeoutLink = new ApolloLinkTimeout(30000)

const headerLink = setContext((_, { headers }) => {
  // get `User-ID` from local storage or cookie if it exists
  return {
    headers: {
      ...headers,
      'User-Id': getDeviceId()
    }
  }
})

const errorLink = onError(({ response }) => {
  if (isValid(response?.errors)) {
    const error: any = response!.errors![0]

    if (isValid(error) && error.status === 401) {
      clearAuthState()
      window.location.href = '/login'
      return
    }
  }
})

const cache = new InMemoryCache({
  addTypename: false
})

// Disable apollo devtools tips
window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ = true

const client = new ApolloClient({
  // https://stackoverflow.com/a/58736777
  // Put uploadLink to the end
  link: from([retryLink, timeoutLink, headerLink, errorLink, uploadLink]),
  connectToDevTools: false,
  cache
})

// https://github.com/apollographql/apollo-client/issues/5903
function responseInterceptor<T = any>(response: ApolloQueryResult<T>): T {
  const operationName = Object.keys(response)[0]
  return JSON.parse(JSON.stringify((response as any)[operationName]))
}

export const request = {
  async mutate<T = any>(options: any): Promise<T> {
    const result = await client.mutate(options)
    return responseInterceptor<T>(result.data)
  },

  async query<T = any>(options: any): Promise<T> {
    const result = await client.query(options)
    return responseInterceptor<T>(result.data)
  }
}
