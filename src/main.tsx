import Router, { Route } from '@heyooo-inc/react-router'
import * as Tooltip from '@radix-ui/react-tooltip'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

import { Toaster } from '@/components'
import '@/i18n'
import { AuthLayout } from '@/layouts'
import routes from '@/routes'
import '@/styles/globals.scss'
import { getAuthState, getDecoratedURL, getDeviceId, setDeviceId } from '@/utils'

// Setup device ID
if (!getDeviceId()) {
  setDeviceId()
}

const Fallback = () => {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <h1 className="text-center text-2xl font-semibold">{t('components.error.title')}</h1>
      <p className="text-center text-sm/6 text-secondary">{t('components.error.message')}</p>
    </AuthLayout>
  )
}

const App = () => {
  function render(options?: AnyMap) {
    const isLoggedIn = getAuthState()

    if (options?.loginRequired) {
      if (!isLoggedIn) {
        const redirect_uri = window.location.pathname + window.location.search
        const nextUrl = getDecoratedURL('/login', { redirect_uri })

        return <Navigate to={nextUrl} replace />
      }
    } else {
      if (isLoggedIn) {
        return <Navigate to="/" replace />
      }
    }
  }

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Tooltip.Provider>
        <Router routes={routes as Route[]} render={render} />
      </Tooltip.Provider>
      <Toaster />
    </ErrorBoundary>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
