import { clearAuthState, getDeviceId } from '@/legacy_pages/utils'
import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { isValid } from '@hpnp/utils/helper'
import { RetryLink } from 'apollo-link-retry'
import ApolloLinkTimeout from 'apollo-link-timeout'
import { createUploadLink } from 'apollo-upload-client'

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  credentials: 'include'
})

const retryLink: any = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  }
})

const timeoutLink = new ApolloLinkTimeout(30_000)

const headerLink = setContext((_, { headers }) => {
  // get `User-ID` from local storage or cookie if it exists
  return {
    headers: {
      ...headers,
      'User-Id': getDeviceId()
    }
  }
})

const responseLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(data => {
    if (data?.data) {
      data.data = data.data[operation.operationName]
    }
    return data
  })
})

const errorLink = onError(({ response, graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    const error: any = graphQLErrors[0]

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
  link: from([retryLink, timeoutLink, headerLink, responseLink, errorLink, uploadLink]),
  cache,
  connectToDevTools: true
})
