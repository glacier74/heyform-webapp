import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const ShortText: FC<BlockProps> = ({ field, locale, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-short-text" field={field} locale={locale} {...restProps}>
      <input
        type="text"
        className="builder-input"
        placeholder={t('Your answer goes here', { lng: locale })}
        disabled={true}
      />
      <FakeSubmit text={t('Next', { lng: locale })} icon={<ChevronRightIcon />} />
    </Block>
  )
}
