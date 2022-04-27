export enum BillingCycleEnum {
  FOREVER = 0,
  MONTHLY,
  ANNUALLY
}

export enum InvoiceKindEnum {
  PURCHASE = 1,
  RENEW,
  UPGRADE
}

export enum InvoiceStatusEnum {
  EXPIRED,
  UNPAID,
  PAID
}

export enum PaymentMethodEnum {
  STRIPE = 1,
  PAYPAL,
  ALIPAY,
  WECHAT_PAY
}

export interface InvoicePriceData {
  total: number
  fee: number
  savings?: number
}

export interface InvoiceModel {
  id: string
  teamId: string
  total: number
  pdfUrl?: string
  note?: string
  paidAt?: number
  status: InvoiceStatusEnum
}

export enum OrderKindEnum {
  PURCHASE = 1,
  RENEW = 2,
  UPGRADE = 3,
  DOWNGRADE = 4
}

export enum OrderStatusEnum {
  UNPAID = 0,
  PAID = 1,
  EXPIRED = 2,
  CANCELLED = 3
}

export enum ZhCnPaymentMethodEnum {
  ALIPAY = 1,
  WECHAT_PAY = 2
}

export interface OrderModel {
  teamId: string
  planId: string
  planName: string
  billingCycle: BillingCycleEnum
  couponId?: string
  kind: OrderKindEnum
  seatCount?: number
  seatsAmount?: number
  amount: number
  discount?: number
  total: number
  paymentMethod?: ZhCnPaymentMethodEnum
  transactionId?: string
  paidAt?: number
  note?: string
  status: OrderStatusEnum
}
