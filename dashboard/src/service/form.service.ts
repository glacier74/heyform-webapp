import {
  FormField,
  FormKindEnum,
  FormStatusEnum,
  InteractiveModeEnum,
  Logic,
  ThemeSettings,
  Variable
} from '@heyforms/shared-types-enums'

import {
  CREATE_FORM_FIELD_GQL,
  CREATE_FORM_GQL,
  DELETE_FORM_FIELD_GQL,
  DELETE_FORM_GQL,
  DUPLICATE_FORM_GQL,
  FORMS_GQL,
  FORM_ANALYTIC_GQL,
  FORM_DETAIL_GQL,
  FORM_INTEGRATIONS_GQL,
  FORM_REPORT_GQL,
  FORM_SUMMARY_GQL,
  IMPORT_FORM_GQL,
  MOVE_FORM_TO_TRASH_GQL,
  RESTORE_FORM_GQL,
  SEARCH_FORM_GQL,
  UPDATE_FORM_ARCHIVE_GQL,
  UPDATE_FORM_FIELD_GQL,
  UPDATE_FORM_GQL,
  UPDATE_FORM_INTEGRATIONS_GQL,
  UPDATE_FORM_LOGICS,
  UPDATE_FORM_SCHEMAS_GQL,
  UPDATE_FORM_THEME_GQL,
  UPDATE_FORM_VARIABLES
} from '@/consts'
import { request } from '@/utils'

export class FormService {
  static async forms(projectId: string, status = FormStatusEnum.NORMAL) {
    return request.query({
      query: FORMS_GQL,
      variables: {
        input: {
          projectId,
          status
        }
      },
      fetchPolicy: 'network-only'
    })
  }

  static create(input: {
    projectId: string
    name: string
    nameSchema?: string[]
    interactiveMode: InteractiveModeEnum
    kind: FormKindEnum
  }) {
    return request.mutate({
      mutation: CREATE_FORM_GQL,
      variables: {
        input
      }
    })
  }

  static import(projectId: string, url: string) {
    return request.mutate({
      mutation: IMPORT_FORM_GQL,
      variables: {
        input: {
          projectId,
          url
        }
      }
    })
  }

  /**
   * Upload form picture choices and custom background image
   */
  // static async uploadImage(formId: string, image: File) {
  //   return request.mutate({
  //     mutation: UPLOAD_FORM_IMAGE_GQL,
  //     variables: {
  //       input: {
  //         formId,
  //         image
  //       }
  //     }
  //   })
  // }

  static async analytic(formId: string, range: number) {
    return request.query({
      query: FORM_ANALYTIC_GQL,
      variables: {
        input: {
          formId,
          range
        }
      },
      fetchPolicy: 'cache-first'
    })
  }

  static async report(formId: string) {
    return request.query({
      query: FORM_REPORT_GQL,
      variables: {
        input: {
          formId
        }
      }
    })
  }

  static async summary(formId: string) {
    return request.query({
      query: FORM_SUMMARY_GQL,
      variables: {
        input: {
          formId
        }
      },
      fetchPolicy: 'network-only'
    })
  }

  static async detail(formId: string) {
    return request.query({
      query: FORM_DETAIL_GQL,
      variables: {
        input: {
          formId
        }
      },
      fetchPolicy: 'network-only'
    })
  }

  static updateFormSchemas(formId: string, updates: Record<string, any>) {
    return request.mutate({
      mutation: UPDATE_FORM_SCHEMAS_GQL,
      variables: {
        input: {
          formId,
          ...updates
        }
      }
    })
  }

  static updateLogics(formId: string, logics: Logic[]) {
    return request.mutate({
      mutation: UPDATE_FORM_LOGICS,
      variables: {
        input: {
          formId,
          logics
        }
      }
    })
  }

  static updateVariables(formId: string, variables: Variable[]) {
    return request.mutate({
      mutation: UPDATE_FORM_VARIABLES,
      variables: {
        input: {
          formId,
          variables
        }
      }
    })
  }

  static update(formId: string, updates: IMapType) {
    return request.mutate({
      mutation: UPDATE_FORM_GQL,
      variables: {
        input: {
          formId,
          ...updates
        }
      }
    })
  }

  static updateArchive(formId: string, allowArchive: boolean) {
    return request.mutate({
      mutation: UPDATE_FORM_ARCHIVE_GQL,
      variables: {
        input: {
          formId,
          allowArchive
        }
      }
    })
  }

  static updateTheme(formId: string, themeOptions: ThemeSettings) {
    const { themeId, theme } = themeOptions

    return request.mutate({
      mutation: UPDATE_FORM_THEME_GQL,
      variables: {
        input: {
          formId,
          themeId,
          theme
        }
      }
    })
  }

  static createField(formId: string, field: Partial<FormField>) {
    return request.mutate({
      mutation: CREATE_FORM_FIELD_GQL,
      variables: {
        input: {
          formId,
          field
        }
      }
    })
  }

  static updateField(input: { formId: string; fieldId: string; updates: Partial<FormField> }) {
    return request.mutate({
      mutation: UPDATE_FORM_FIELD_GQL,
      variables: {
        input
      }
    })
  }

  static deleteField(formId: string, fieldId: string) {
    return request.mutate({
      mutation: DELETE_FORM_FIELD_GQL,
      variables: {
        input: {
          formId,
          fieldId
        }
      }
    })
  }

  static async integrations(formId: string) {
    return request.query({
      query: FORM_INTEGRATIONS_GQL,
      fetchPolicy: 'no-cache',
      variables: {
        input: {
          formId
        }
      }
    })
  }

  static updateIntegration(input: { formId: string; appId: string; attributes: IMapType }) {
    return request.mutate({
      mutation: UPDATE_FORM_INTEGRATIONS_GQL,
      variables: {
        input
      }
    })
  }

  static duplicate(formId: string) {
    return request.mutate({
      mutation: DUPLICATE_FORM_GQL,
      variables: {
        input: {
          formId
        }
      }
    })
  }

  static search(keyword: string) {
    return request.query({
      query: SEARCH_FORM_GQL,
      variables: {
        input: {
          keyword
        }
      }
    })
  }

  static moveToTrash(formId: string) {
    return request.mutate({
      mutation: MOVE_FORM_TO_TRASH_GQL,
      variables: {
        input: {
          formId
        }
      }
    })
  }

  static restoreForm(formId: string) {
    return request.mutate({
      mutation: RESTORE_FORM_GQL,
      variables: {
        input: {
          formId
        }
      }
    })
  }

  static delete(formId: string) {
    return request.mutate({
      mutation: DELETE_FORM_GQL,
      variables: {
        input: {
          formId
        }
      }
    })
  }
}
