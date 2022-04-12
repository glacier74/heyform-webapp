import { COUNTRIES } from '@/pages/form/Create/consts'
import { ChevronDownIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useMemo } from 'react'
import { FlagIcon } from '../FlagIcon'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const PhoneNumber: FC<BlockProps> = ({ field, ...restProps }) => {
  const placeholder = useMemo(() => {
    return COUNTRIES.find(c => c.value === field.properties?.defaultCountryCode)?.example
  }, [field.properties?.defaultCountryCode])

  return (
    <Block className="heyform-phone-number" field={field} {...restProps}>
      <div className="flex items-center">
        <div className="heyform-calling-code">
          <FlagIcon countryCode={field.properties?.defaultCountryCode} />
          <ChevronDownIcon className="heyform-phone-arrow-icon" />
        </div>
        <input type="text" className="heyform-input" placeholder={placeholder} />
      </div>
    </Block>
  )
}
