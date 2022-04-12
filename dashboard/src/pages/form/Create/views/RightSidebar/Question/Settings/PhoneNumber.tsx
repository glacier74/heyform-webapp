import { COUNTRIES } from '@/pages/form/Create/consts'
import { useStoreContext } from '@/pages/form/Create/store'
import { CheckIcon } from '@heroicons/react/solid'
import { Select } from '@heyforms/ui'
import type { FC } from 'react'
import { startTransition, useCallback } from 'react'
import { FlagIcon } from '../../../Compose/FlagIcon'
import type { IBasicProps } from './Basic'

export const PhoneNumber: FC<IBasicProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function valueRender(option: any) {
    if (!option) {
      return null
    }

    return (
      <>
        <FlagIcon countryCode={option.value} />
        <span className="flex-1 truncate">{option.label}</span>
      </>
    )
  }

  function optionRender(option: any, isActive?: boolean) {
    return (
      <>
        <FlagIcon countryCode={option.value} />
        <span className="flex-1 truncate">{option.label}</span>
        {isActive && (
          <span className="select-option-checkmark">
            <CheckIcon />
          </span>
        )}
      </>
    )
  }

  function handleChange(defaultCountryCode: any) {
    startTransition(() => {
      dispatch({
        type: 'updateField',
        payload: {
          id: field.id,
          updates: {
            properties: {
              ...field.properties,
              defaultCountryCode
            }
          }
        }
      })
    })
  }

  const handleChangeCallback = useCallback(handleChange, [field.properties])

  return (
    <>
      <div className="right-sidebar-settings-item">
        <label className="form-item-label">Default Country</label>
        <Select
          className="right-sidebar-custom-select mt-1"
          popupClassName="right-sidebar-custom-select-popup"
          options={COUNTRIES}
          value={field.properties?.defaultCountryCode}
          valueRender={valueRender as any}
          optionRender={optionRender}
          onChange={handleChangeCallback}
        />
      </div>
    </>
  )
}
