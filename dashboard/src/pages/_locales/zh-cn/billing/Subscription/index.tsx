import { SubscriptionDetail } from '@/pages/billing/Subscription/views/SubscriptionDetail'
import { BillingLayout } from '@/pages/billing/views/BillingLayout'
import './index.scss'
import { Plans } from './views/Plans'

const Subscription = () => {
  return (
    <BillingLayout>
      <div className="space-y-10">
        <SubscriptionDetail />
        <Plans />
      </div>
    </BillingLayout>
  )
}

export default Subscription
