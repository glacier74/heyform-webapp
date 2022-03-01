import { FormModel } from '@/legacy_pages/models'

export interface TemplateModal
  extends Pick<FormModel, 'id' | 'name' | 'interactiveMode' | 'kind' | 'fields' | 'themeSettings'> {
  category: string
  published: boolean
}
