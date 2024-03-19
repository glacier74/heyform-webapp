import { ApolloError } from '@apollo/client'
import { EmptyStates } from '@heyforms/ui'
import { ErrorBoundary, init } from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { IconMoodSad } from '@tabler/icons-react'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import 'unfetch/polyfill/polyfill.mjs'

import '@/locales'
import Router from '@/router'
import { StoreProvider, store } from '@/store'
import { getDeviceId, setDeviceId } from '@/utils'
import { register } from '@/utils/serviceWorker'

import './styles/index.scss'

if (!getDeviceId()) {
  setDeviceId()
}

if (import.meta.env.PROD) {
  init({
    dsn: import.meta.env.VITE_SENTRY_DSN as string,
    release: import.meta.env.PACKAGE_VERSION as string,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    beforeSend: (event, hit) => {
      if (hit?.originalException instanceof ApolloError) {
        return null
      }
      return event
    }
  })
}

const App = () => {
  const Fallback = (
    <EmptyStates
      className="flex h-screen flex-col justify-center"
      icon={<IconMoodSad />}
      title="Oops, Something went wrong"
      description="Brace yourself till we get the error fixed. You may also refresh the page or try again later."
    />
  )

  return (
    <ErrorBoundary fallback={Fallback}>
      <Suspense fallback={<></>}>
        <StoreProvider value={store}>
          <Router />
        </StoreProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

// Register service worker
register()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
