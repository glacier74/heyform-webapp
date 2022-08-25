import { BillingLayout } from '../views/BillingLayout'
import './index.scss'
import { SubscriptionDetail } from './views/SubscriptionDetail'

const Subscription = () => {
  return (
    <BillingLayout>
      <div className="space-y-10">
        <SubscriptionDetail />
      </div>
    </BillingLayout>
  )
}

export default Subscription
