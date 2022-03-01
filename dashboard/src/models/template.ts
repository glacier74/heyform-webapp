import type { FormModel } from '@heyforms/shared-types-enums'

export interface TemplateModal
  extends Pick<FormModel, 'id' | 'name' | 'interactiveMode' | 'kind' | 'fields' | 'themeSettings'> {
  category: string
  published: boolean
}
