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
  paidAt?: string
  status: InvoiceStatusEnum
}
