import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'unfetch/polyfill/polyfill.mjs'
import Router from '@/router'
import { store, StoreProvider } from '@/store'
import { getDeviceId, setDeviceId } from '@/utils'
import { register } from '@/utils/serviceWorker'
import * as Sentry from '@sentry/react'
import { Suspense } from 'react'
import { render } from 'react-dom'
import './styles/index.scss'

if (!getDeviceId()) {
  setDeviceId()
}

const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={<></>}>
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
