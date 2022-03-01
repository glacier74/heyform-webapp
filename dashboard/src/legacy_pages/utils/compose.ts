import { FieldKindEnum, FormField, PlanGradeEnum, WorkspaceModel } from '@/legacy_pages/models'
import { RateIconShapeEnum } from '@heyforms/form-component'
import { clone } from '@hpnp/utils/clone'
import { isEmpty, isNil, isValidArray } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'
import { copyObjectValues } from '@hpnp/utils/object'

export function formFieldToValues(field: FormField): IMapType {
  const values: IMapType = {
    id: field.id,
    number: field.number,
    kind: field.kind,
    title: field.title,
    description: field.description
  }

  copyObjectValues(field, values, [['validations.required', 'required']])

  switch (field.kind) {
    case FieldKindEnum.RATING:
      copyObjectValues(field, values, [
        ['properties.total', 'ratingCount'],
        ['properties.shape', 'ratingShape']
      ])
      break

    case FieldKindEnum.OPINION_SCALE:
      copyObjectValues(field, values, [
        ['properties.total', 'opinionScaleCount'],
        ['properties.leftLabel', 'opinionScaleLabels.left'],
        ['properties.centerLabel', 'opinionScaleLabels.center'],
        ['properties.rightLabel', 'opinionScaleLabels.right']
      ])
      break

    case FieldKindEnum.DATE:
      copyObjectValues(field, values, [['properties.format', 'dateFormat']])
      break

    case FieldKindEnum.DROPDOWN:
      copyObjectValues(field, values, [['properties.choices', 'choices']])
      break

    case FieldKindEnum.SINGLE_CHOICE:
      copyObjectValues(field, values, [
        ['properties.choices', 'choices'],
        ['properties.numberPreRow', 'numberPreRow']
      ])
      break

    case FieldKindEnum.MULTIPLE_CHOICE:
    case FieldKindEnum.PICTURE_CHOICE:
      copyObjectValues(field, values, [
        ['properties.choices', 'choices'],
        ['properties.allowMultiple', 'allowMultiple'],
        ['properties.numberPreRow', 'numberPreRow'],
        ['validations.min', 'selectionLimits.min'],
        ['validations.max', 'selectionLimits.max']
      ])
      break
  }

  return values
}

export function valuesToFormField(field: FormField, values: IMapType) {
  const clonedField = clone(field)

  if (isNil(clonedField.properties)) {
    clonedField.properties = {}
  }

  if (isNil(clonedField.validations)) {
    clonedField.validations = {}
  }

  // Update common properties
  copyObjectValues(values, clonedField, [
    'title',
    'description',
    'kind',
    ['required', 'validations.required']
  ])

  switch (clonedField.kind) {
    case FieldKindEnum.RATING:
      copyObjectValues(values, clonedField, [
        ['ratingCount', 'properties.total'],
        ['ratingShape', 'properties.shape']
      ])
      break

    case FieldKindEnum.OPINION_SCALE:
      copyObjectValues(values, clonedField, [
        ['opinionScaleCount', 'properties.total'],
        ['opinionScaleLabels.left', 'properties.leftLabel'],
        ['opinionScaleLabels.center', 'properties.centerLabel'],
        ['opinionScaleLabels.right', 'properties.rightLabel']
      ])
      break

    case FieldKindEnum.DATE:
      copyObjectValues(values, clonedField, [['dateFormat', 'properties.format']])
      break

    case FieldKindEnum.YES_NO:
    case FieldKindEnum.DROPDOWN:
      copyObjectValues(values, clonedField, [['choices', 'properties.choices']])
      break

    case FieldKindEnum.SINGLE_CHOICE:
      copyObjectValues(values, clonedField, [
        ['choices', 'properties.choices'],
        ['numberPreRow', 'properties.numberPreRow']
      ])
      break

    case FieldKindEnum.MULTIPLE_CHOICE:
    case FieldKindEnum.PICTURE_CHOICE:
      copyObjectValues(values, clonedField, [
        ['choices', 'properties.choices'],
        ['allowMultiple', 'properties.allowMultiple'],
        ['numberPreRow', 'properties.numberPreRow'],
        ['selectionLimits.min', 'validations.min'],
        ['selectionLimits.max', 'validations.max']
      ])
      break
  }

  return clonedField
}

export function transformFormField(field: FormField): FormField {
  const newField: FormField = {
    id: nanoid(12),
    title: '',
    description: '',
    kind: field.kind,
    validations: {
      required: true
    },
    properties: {}
  }

  switch (newField.kind) {
    case FieldKindEnum.RATING:
      newField.properties!.total = 5
      newField.properties!.shape = RateIconShapeEnum.STAR
      break

    case FieldKindEnum.OPINION_SCALE:
      newField.properties!.total = 10
      break

    case FieldKindEnum.YES_NO:
      newField.properties!.choices = [
        {
          id: nanoid(12),
          label: 'Yes'
        },
        {
          id: nanoid(12),
          label: 'No'
        }
      ]
      break

    case FieldKindEnum.DROPDOWN:
    case FieldKindEnum.SINGLE_CHOICE:
      newField.properties!.allowMultiple = false
      newField.properties!.choices = [
        {
          id: nanoid(12),
          label: 'Choice 1'
        }
      ]
      break

    case FieldKindEnum.PICTURE_CHOICE:
    case FieldKindEnum.MULTIPLE_CHOICE:
      newField.properties!.allowMultiple = true
      newField.properties!.choices = [
        {
          id: nanoid(12),
          label: 'Choice 1'
        }
      ]
      break

    case FieldKindEnum.DATE:
      newField.properties!.format = 'YYYY-MM-DD'
      break

    case FieldKindEnum.PHONE_NUMBER:
      newField.properties!.defaultCountryCode = 'US'
      break
  }

  return newField
}

export function transformValue(value: IMapType): IMapType {
  switch (value.kind) {
    case FieldKindEnum.RATING:
      if (isEmpty(value.ratingCount)) {
        value.ratingCount = 5
      }
      if (isEmpty(value.ratingShape)) {
        value.ratingShape = RateIconShapeEnum.STAR
      }
      break

    case FieldKindEnum.OPINION_SCALE:
      if (isEmpty(value.opinionScaleCount)) {
        value.opinionScaleCount = 10
      }
      break

    case FieldKindEnum.YES_NO:
      value.choices = [
        {
          id: nanoid(12),
          label: 'Yes'
        },
        {
          id: nanoid(12),
          label: 'No'
        }
      ]
      break

    case FieldKindEnum.DROPDOWN:
      if (isEmpty(value.choices)) {
        value.choices = [
          {
            id: nanoid(12),
            label: 'Choice 1'
          }
        ]
      }
      break

    case FieldKindEnum.PICTURE_CHOICE:
      if (isEmpty(value.allowMultiple)) {
        value.allowMultiple = true
      }
      if (isEmpty(value.choices)) {
        value.choices = [
          {
            id: nanoid(12),
            label: 'Choice 1'
          }
        ]
      }
      break

    case FieldKindEnum.SINGLE_CHOICE:
      if (isEmpty(value.numberPreRow)) {
        value.numberPreRow = 1
      }
      if (isEmpty(value.choices)) {
        value.choices = [
          {
            id: nanoid(12),
            label: 'Choice 1'
          }
        ]
      }
      break

    case FieldKindEnum.MULTIPLE_CHOICE:
      if (isEmpty(value.allowMultiple)) {
        value.allowMultiple = true
      }
      if (isEmpty(value.numberPreRow)) {
        value.numberPreRow = 1
      }
      if (isEmpty(value.choices)) {
        value.choices = [
          {
            id: nanoid(12),
            label: 'Choice 1'
          }
        ]
      }
      break

    case FieldKindEnum.DATE:
      if (isEmpty(value.dateFormat)) {
        value.dateFormat = 'YYYY-MM-DD'
      }
      break

    case FieldKindEnum.PHONE_NUMBER:
      if (isEmpty(value.defaultCountryCode)) {
        value.defaultCountryCode = 'US'
      }
      break
  }

  return value
}

export function formSharingLinkUrl(workspace?: WorkspaceModel, formId?: string) {
  let urlPrefix = import.meta.env.VITE_HOMEPAGE

  if (
    workspace?.plan.grade &&
    workspace?.plan?.grade >= PlanGradeEnum.PRO &&
    isValidArray(workspace?.customHostnames) &&
    workspace?.enableCustomDomain
  ) {
    urlPrefix = `https://${workspace!.customHostnames![0].hostname}`
  }

  return urlPrefix + `/f/${formId}`
}
