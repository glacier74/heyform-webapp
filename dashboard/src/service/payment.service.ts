import {
  ADD_ADDITIONAL_SEAT_GQL,
  APPLY_COUPON_GQL,
  CANCEL_SUBSCRIPTION_GQL,
  INVOICES_GQL,
  ORDER_PREVIEW_GQL,
  PAYMENT_GQL,
  ZH_CN_PAYMENT_GQL
} from '@/consts'
import { Locale } from '@/locales'
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
      mutation: Locale.isZhCn ? ZH_CN_PAYMENT_GQL : PAYMENT_GQL,
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
}
