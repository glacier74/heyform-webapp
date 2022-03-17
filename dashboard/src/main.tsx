import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'unfetch/polyfill/polyfill.mjs'
import '@/legacy_pages/i18n'
import Router from '@/router'
import { store, StoreProvider } from '@/store'
import { getDeviceId, setDeviceId } from '@/utils'
import { register } from '@/utils/serviceWorker'
import { ApolloError } from '@apollo/client'
import { EmojiSadIcon } from '@heroicons/react/outline'
import { EmptyStates } from '@heyforms/ui'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { Suspense } from 'react'
import { render } from 'react-dom'
import './styles/index.scss'

if (!getDeviceId()) {
  setDeviceId()
}

if (import.meta.env.PROD) {
  Sentry.init({
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
    <Sentry.ErrorBoundary fallback={Fallback}>
      <Suspense fallback={<></>}>
        <StoreProvider value={store}>
          <Router />
        </StoreProvider>
      </Suspense>
    </Sentry.ErrorBoundary>
  )
}

// Register service worker
register()

render(<App />, document.getElementById('root'))
