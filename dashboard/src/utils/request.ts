import { clearAuthState, getDeviceId } from '@/utils'
import { ApolloClient, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { isValid } from '@hpnp/utils/helper'
import { RetryLink } from 'apollo-link-retry'
import ApolloLinkTimeout from 'apollo-link-timeout'
import { createUploadLink } from 'apollo-upload-client'

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

export const request = new ApolloClient({
  link: from([retryLink, timeoutLink, headerLink, errorLink, uploadLink]),
  cache
})
