import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Website: FC<BlockProps> = ({ field, locale, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="heyform-website" field={field} locale={locale} {...restProps}>
      <input
        type="url"
        className="heyform-input"
        placeholder="https://example.com"
        disabled={true}
      />
      <FakeSubmit text={t('Next', { lng: locale })} icon={<ChevronRightIcon />} />
    </Block>
  )
}
