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
    <Block className="builder-phone-number" field={field} {...restProps}>
      <div className="flex items-center">
        <div className="builder-calling-code">
          <FlagIcon countryCode={field.properties?.defaultCountryCode} />
          <ChevronDownIcon className="builder-phone-arrow-icon" />
        </div>
        <input type="text" className="builder-input" placeholder={placeholder} disabled={true} />
      </div>
    </Block>
  )
}
