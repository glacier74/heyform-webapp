import { BillingLayout } from '../views/BillingLayout'
import './index.scss'
import { Plans } from './views/Plans'
import { SubscriptionDetail } from './views/SubscriptionDetail'

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
