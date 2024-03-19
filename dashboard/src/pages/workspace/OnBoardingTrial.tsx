import { Button, notification } from '@heyforms/ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PaymentService } from '@/service'
import { redirectToStripeCheckout, useParam, useRouter } from '@/utils'

const OnBoarding = () => {
  const { t } = useTranslation()
  const { workspaceId } = useParam()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleUseFreePlan() {
    router.replace(`/workspace/${workspaceId}`)
  }

  async function handleFreeTrial() {
    setLoading(true)

    try {
      const sessionId = await PaymentService.freeTrial(workspaceId)
      await redirectToStripeCheckout(sessionId)
    } catch (err: any) {
      notification.error({
        title: 'Failed to start free trial',
        message: err.message
      })

      setLoading(false)
    }
  }

  return (
    <div className="free-trial grid h-screen place-items-center bg-white">
      <div className="mx-auto max-w-3xl py-28">
        <img
          className="mx-auto h-72 w-72"
          src="https://forms.b-cdn.net/website/dashboard/free-trial.webp"
        ></img>
        <h1 className="mb-4 text-center text-3xl font-semibold text-slate-900">
          {t('onboarding.trialTitle')}
        </h1>
        <p className="text-center text-lg text-slate-500">{t('onboarding.trialDesc')}</p>

        <div className="mt-12 flex items-center justify-center">
          <span>
            <Button
              type="primary"
              className="free-trial__button"
              loading={loading}
              onClick={handleFreeTrial}
            >
              {t('onboarding.trialButton')}
            </Button>
          </span>
          <span>
            <button className="ml-4 text-sm text-slate-700 underline" onClick={handleUseFreePlan}>
              {t('onboarding.trialGofree')}
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default OnBoarding
