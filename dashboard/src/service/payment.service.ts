import {
  ADD_ADDITIONAL_SEAT_GQL,
  APPLY_COUPON_GQL,
  CANCEL_SUBSCRIPTION_GQL,
  INVOICES_GQL,
  PAYMENT_GQL
} from '@/consts'
import { BillingCycleEnum } from '@/models'
import { request } from '@/utils'

export class PaymentService {
  static async applyCoupon(input: {
    teamId: string
    planId: string
    billingCycle: BillingCycleEnum
    code: string
  }) {
    const result = await request.mutate({
      mutation: APPLY_COUPON_GQL,
      variables: {
        input
      }
    })
    return result.data.applyCoupon
  }

  static async payment(input: {
    teamId: string
    planId: string
    billingCycle: BillingCycleEnum
    code?: string | null
  }) {
    const result = await request.mutate({
      mutation: PAYMENT_GQL,
      variables: {
        input
      }
    })
    return result.data.payment
  }

  static async invoices(teamId: string) {
    const result = await request.query({
      query: INVOICES_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
    return result.data.invoices
  }

  static cancelSubscription(teamId: string) {
    return request.mutate({
      mutation: CANCEL_SUBSCRIPTION_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
  }

  static addAdditionalSeats(teamId: string, additionalSeats: number) {
    return request.mutate({
      mutation: ADD_ADDITIONAL_SEAT_GQL,
      variables: {
        input: {
          teamId,
          additionalSeats
        }
      }
    })
  }
}
