import { Heading } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const BillingLayout: FC<IComponentProps> = ({ children }) => {
  const { t } = useTranslation()

  return (
    <div>
      <Heading title={t('billing.Billing')} description={t('billing.invoices')} />

      <div className="py-4">
        <div className="mt-8">{children}</div>
      </div>
    </div>
  )
}
