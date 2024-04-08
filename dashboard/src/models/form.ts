import type { FormField as IFormField } from '@heyforms/shared-types-enums'
import { Property } from '@heyforms/shared-types-enums/types/form'

export enum IntegrationStatusEnum {
  PERMITTED = 0,
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

export interface FormField extends IFormField {
  isCollapsed?: boolean
  parent?: IFormField
  properties?: Omit<Property, 'fields'> & {
    fields?: FormField[]
  }
}
