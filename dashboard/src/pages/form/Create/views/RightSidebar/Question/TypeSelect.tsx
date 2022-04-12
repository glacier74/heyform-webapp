import { CheckIcon } from '@heroicons/react/solid'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { Select } from '@heyforms/ui'
import type { FC } from 'react'
import { useStoreContext } from '../../../store'
import {
  FIELD_QUESTION_CONFIGS,
  FIELD_THANK_YOU_CONFIG,
  FIELD_WELCOME_CONFIG
} from '../../FieldConfig'
import { FieldIcon } from '../../FieldIcon'

export const TypeSelect: FC = () => {
  const { state, dispatch } = useStoreContext()
  const field = state.selectedField!

  function valueRender(option: any) {
    if (field.kind === FieldKindEnum.WELCOME) {
      option = FIELD_WELCOME_CONFIG
    } else if (field.kind === FieldKindEnum.THANK_YOU) {
      option = FIELD_THANK_YOU_CONFIG
    }

    if (!option) {
      return null
    }

    return (
      <>
        <FieldIcon kind={option.kind} />
        <span>{option.label}</span>
      </>
    )
  }

  function optionRender(option: any) {
    return (
      <>
        <FieldIcon kind={option.kind} />
        <span className="select-option-text">{option.label}</span>
        {field.kind === option.kind && (
          <span className="select-option-checkmark">
            <CheckIcon />
          </span>
        )}
      </>
    )
  }

  function handleChange(value: IValueType) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          kind: value as FieldKindEnum
        }
      }
    })
  }

  return (
    <div className="right-sidebar-group">
      <div className="right-sidebar-group-title">Type</div>
      <Select
        className="right-sidebar-custom-select"
        popupClassName="right-sidebar-custom-select-popup"
        options={FIELD_QUESTION_CONFIGS as unknown as IOptionType[]}
        value={field.kind}
        valueKey="kind"
        valueRender={valueRender as unknown as any}
        optionRender={optionRender}
        onChange={handleChange}
      />
    </div>
  )
}
