import { FormModel } from '@/models'

export interface TemplateModal
  extends Pick<FormModel, 'id' | 'name' | 'interactiveMode' | 'kind' | 'fields' | 'themeSettings'> {
  category: string
  published: boolean
}
