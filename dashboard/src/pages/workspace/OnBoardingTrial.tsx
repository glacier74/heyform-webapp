import { PaymentService } from '@/service'
import { redirectToStripeCheckout, useParam, useRouter } from '@/utils'
import { Button, notification } from '@heyforms/ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
    <div className="free-trial bg-white grid place-items-center h-screen">
      <div className="max-w-3xl mx-auto py-28">
        <img
          className="w-72 mx-auto"
          src="https://forms.b-cdn.net/website/dashboard/free-trial.webp"
        ></img>
        <h1 className="text-4xl font-semibold text-slate-900 text-center mb-4">
          {t('onboarding.trialTitle')}
        </h1>
        <p className="text-xl text-slate-600 text-center">{t('onboarding.trialDesc')}</p>

        <div className="text-center mt-12">
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
            <button className="ml-4 text-gray-700 underline text-sm" onClick={handleUseFreePlan}>
              {t('onboarding.trialGofree')}
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default OnBoarding
