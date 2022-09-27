import {
  ADD_ADDITIONAL_SEAT_GQL,
  APPLY_COUPON_GQL,
  CANCEL_SUBSCRIPTION_GQL,
  CONNECT_STRIPE_GQL,
  FREE_TRIAL_GQL,
  INVOICES_GQL,
  ORDER_PREVIEW_GQL,
  ORDERS_GQL,
  PAYMENT_GQL,
  REVOKE_STRIPE_ACCOUNT_GQL,
  STRIPE_AUTHORIZE_URL_GQL
} from '@/consts'
import { BillingCycleEnum, ZhCnPaymentMethodEnum } from '@/models'
import { request } from '@/utils'

export class PaymentService {
  static async applyCoupon(input: {
    teamId: string
    planId: string
    billingCycle: BillingCycleEnum
    code: string
  }) {
    return request.mutate({
      mutation: APPLY_COUPON_GQL,
      variables: {
        input
      }
    })
  }

  static async payment(input: {
    teamId: string
    planId: string
    billingCycle: BillingCycleEnum
    code?: string | undefined | null
    couponId?: string | undefined | null
    paymentMethod?: ZhCnPaymentMethodEnum | undefined | null
  }) {
    return request.mutate({
      mutation: PAYMENT_GQL,
      variables: {
        input
      }
    })
  }

  static async invoices(teamId: string) {
    return request.query({
      query: INVOICES_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
  }

  static async orders(teamId: string) {
    return request.query({
      query: ORDERS_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
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

  static orderPreview(input: {
    teamId: string
    planId: string
    billingCycle: BillingCycleEnum
    couponId?: string
  }) {
    return request.query({
      query: ORDER_PREVIEW_GQL,
      variables: {
        input
      }
    })
  }

  static freeTrial(teamId: string) {
    return request.mutate({
      mutation: FREE_TRIAL_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
  }

  static stripeAuthorizeUrl(formId: string) {
    return request.query({
      query: STRIPE_AUTHORIZE_URL_GQL,
      variables: {
        input: {
          formId
        }
      }
    })
  }

  static connectStripe(formId: string, state: string, code: string) {
    return request.mutate({
      mutation: CONNECT_STRIPE_GQL,
      variables: {
        input: {
          formId,
          state,
          code
        }
      }
    })
  }

  static revokeStripeAccount(formId: string) {
    return request.mutate({
      mutation: REVOKE_STRIPE_ACCOUNT_GQL,
      variables: {
        input: {
          formId
        }
      }
    })
  }
}
