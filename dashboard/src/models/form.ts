export enum IntegrationStatusEnum {
  ACTIVE = 1,
  DISABLED
}

export interface FormIntegration {
  formId: string
  thirdPartyId: string
  subKind: string
  uniqueName: string
  attributes?: Record<string, any>
  status: IntegrationStatusEnum
}

export interface FormAnalyticsSummary {
  totalVisits: number
  submissionCount: number
  completeRate: number
  averageDuration: string
}
