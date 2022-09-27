import { PaymentService } from '@/service'
import { useStore } from '@/store'
import { useParam, useWindow } from '@/utils'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { XCircleIcon } from '@heroicons/react/solid'
import { Button, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ConnectStripeModal: FC<IModalProps> = observer(({ visible, onClose }) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const appStore = useStore('appStore')

  const [loading, setLoading] = useState(false)
  const [authorizeUrl, setAuthorizeUrl] = useState<string>()
  const [error, setError] = useState<string>()

  function handleUpgrade() {
    appStore.isPlanModalOpen = true
  }

  async function handleClick() {
    setLoading(true)

    try {
      const result = await PaymentService.stripeAuthorizeUrl(formId)

      setLoading(false)
      setAuthorizeUrl(result)
    } catch (err: any) {
      setLoading(false)
      setError(err.message)
    }
  }

  async function handleConnectStripe(state: string, code: string) {
    setLoading(true)

    try {
      const stripeAccount = await PaymentService.connectStripe(formId, state, code)

      formStore.update({
        stripeAccount
      })

      onClose?.()
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }

  useWindow(authorizeUrl, { source: 'heyform-connect-stripe' }, (window, payload) => {
    window.close()

    if (payload.error) {
      setError(`Failed to connect with stripe: ${payload.error_description}`)
    } else {
      setError(undefined)
      handleConnectStripe(payload.state, payload.code)
    }
  })

  return (
    <Modal className="connect-stripe-modal" visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg font-medium text-slate-900">{t('formBuilder.ConnectStripe')}</h1>
        </div>

        <div className="space-y-2">
          <p>
            Collect and receive payments directly on your bank account provided by{' '}
            <a href="https://stripe.com/">Stripe</a>.
          </p>
          <p>
            Free HeyForm users collect payments at the the rate of{' '}
            <strong>5% HeyForm commission</strong> + <strong>Stripe transaction fee</strong>.
          </p>
          <p>
            To remove the 5% HeyForm commission on payments, upgrade to{' '}
            <Button.Link type="primary" onClick={handleUpgrade}>
              HeyForm Premium
            </Button.Link>
            .
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-400" />
              </div>
              <p className="ml-2 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            trailing={<ExternalLinkIcon />}
            loading={loading}
            onClick={handleClick}
          >
            {t('formBuilder.ConnectStripe')}
          </Button>
        </div>
      </div>
    </Modal>
  )
})
