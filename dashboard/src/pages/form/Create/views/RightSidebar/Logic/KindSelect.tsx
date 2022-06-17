import { VARIABLE_KIND_CONFIGS } from '@/pages/form/Create/consts'
import { CheckIcon } from '@heroicons/react/solid'
import { Select } from '@heyforms/ui'
import { type SelectProps } from '@heyforms/ui/types/select/Native'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldIcon } from '../../FieldIcon'

export const KindSelect: FC<SelectProps> = props => {
  const { t } = useTranslation()

  function valueRender(option: any) {
    if (!option) {
      return null
    }

    return (
      <>
        <FieldIcon configs={VARIABLE_KIND_CONFIGS} kind={option.kind} />
        <span>{t(option.label)}</span>
      </>
    )
  }

  function optionRender(option: any) {
    return (
      <div className="select-option-container">
        <FieldIcon configs={VARIABLE_KIND_CONFIGS} kind={option.kind} />
        <span className="select-option-text">{t(option.label)}</span>
        {props.value === option.kind && (
          <span className="select-option-checkmark">
            <CheckIcon />
          </span>
        )}
      </div>
    )
  }

  return (
    <Select
      className="right-sidebar-custom-select"
      popupClassName="right-sidebar-custom-select-popup"
      options={VARIABLE_KIND_CONFIGS as unknown as IOptionType[]}
      valueKey="kind"
      valueRender={valueRender as unknown as any}
      optionRender={optionRender}
      {...props}
    />
  )
}
