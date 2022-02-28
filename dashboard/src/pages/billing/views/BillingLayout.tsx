import { useParam } from '@/utils'
import { Heading, Navbar } from '@heyforms/ui'
import type { FC } from 'react'
import { NavLink } from 'react-router-dom'

export const BillingLayout: FC<IComponentProps> = ({ children }) => {
  const { workspaceId } = useParam()

  return (
    <div>
      <Heading title="Billing" description="Manage your subscription and invoices" />

      <div className="py-4">
        <Navbar className="mt-4">
          <NavLink to={`/workspace/${workspaceId}/billing`} exact>
            Subscription
          </NavLink>
          <NavLink to={`/workspace/${workspaceId}/billing/invoice`}>Invoices</NavLink>
        </Navbar>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  )
}
