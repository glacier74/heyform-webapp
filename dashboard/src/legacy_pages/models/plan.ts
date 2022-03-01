import { BillingCycleEnum } from './invoice'

// Refactor at Dec 20, 2021 (v2021.12.3)
/**
 * BASIC:    $9.9/mo  $7.9*12/mo
 * PRO:      $24.9/mo $19.9*12/mo
 * BUSINESS: $49.9/mo $39.9*12/mo
 */
export enum PlanGradeEnum {
  FREE = 0,
  BASIC,
  PRO,
  BUSINESS,
  ENTERPRISE
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
