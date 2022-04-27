import '@/locales'
import Router from '@/router'
import { store, StoreProvider } from '@/store'
import { getDeviceId, setDeviceId } from '@/utils'
import { register } from '@/utils/serviceWorker'
import { ApolloError } from '@apollo/client'
import { EmojiSadIcon } from '@heroicons/react/outline'
import { EmptyStates } from '@heyforms/ui'
import { ErrorBoundary, init } from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import 'unfetch/polyfill/polyfill.mjs'
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
      className="h-screen flex flex-col justify-center"
      icon={<EmojiSadIcon />}
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
  <App />
)
