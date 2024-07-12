import { FormField, FormModel } from '@heyform-inc/shared-types-enums'

export type { SubmissionModel as SubmissionType } from '@heyform-inc/shared-types-enums'

export interface FormType extends Omit<FormModel, 'fields'> {
  drafts?: FormField[]
  version: number
  fieldsUpdatedAt: number
  isDraft: boolean
  canPublish: boolean
}

export * from './form'
export * from './plan'
export * from './user'
export * from './workspace'
