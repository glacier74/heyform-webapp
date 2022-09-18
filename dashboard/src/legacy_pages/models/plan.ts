import { BillingCycleEnum } from './invoice'

// Refactor at Dec 20, 2021 (v2021.12.3)
/**
 * BASIC:    $9.9/mo  $7.9*12/mo
 * PRO:      $24.9/mo $19.9*12/mo
 * BUSINESS: $49.9/mo $39.9*12/mo
 */

// Refactor at Sep 20, 2022 (v2022.9.2)
/**
 * @Discard BASIC:    $9.9/mo  $7.9*12/mo
 * @Discard PRO:      $24.9/mo $19.9*12/mo
 * PREMIUM: $49.9/mo $39.9*12/mo
 * @Discard ENTERPRISE
 */
export enum PlanGradeEnum {
  FREE = 0,
  // @Discard at Sep 15, 2022
  // BASIC, // @Discard
  // PRO,
  // BUSINESS, // @Discard
  // ENTERPRISE // @Discard
  PREMIUM = 3
}

interface PlacePrice {
  billingCycle: BillingCycleEnum
  price: number
}

export interface PlanModel {
  id: string
  name: string
  customUrlRedirects: boolean
  memberLimit: number
  storageLimit: string
  submissionLimit: number
  contactLimit: number
  questionLimit: number
  formLimit: number
  apiAccessLimit: number
  autoResponse: boolean
  customDomain: boolean
  customThankYouPage: boolean
  whitelabelBranding: boolean
  fileExport: boolean
  grade: PlanGradeEnum
  prices: PlacePrice[]
}
