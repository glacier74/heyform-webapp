import { COUNTRIES } from '@/pages/form/Create/consts'
import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlagIcon } from '../FlagIcon'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const PhoneNumber: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()
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
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
