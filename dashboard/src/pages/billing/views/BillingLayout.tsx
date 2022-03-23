import { useParam } from '@/utils'
import { Heading, Navbar } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export const BillingLayout: FC<IComponentProps> = ({ children }) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()


  return (
    <div>
      <Heading title={t('billing.Billing')} description={t('billing.invoices')}/>

      <div className="py-4">
        <Navbar className="mt-4">
          <NavLink to={`/workspace/${workspaceId}/billing`} exact>
            {t('billing.Subscription')}
          </NavLink>
          <NavLink to={`/workspace/${workspaceId}/billing/invoice`}>{t('billing.Invoices')}</NavLink>
        </Navbar>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  )
}
