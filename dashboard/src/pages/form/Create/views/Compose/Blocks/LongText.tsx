import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const LongText: FC<BlockProps> = ({ field, locale, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-long-text" field={field} locale={locale} {...restProps}>
      <textarea
        className="builder-textarea"
        placeholder={t('Your answer goes here', { lng: locale })}
        disabled={true}
      />
      <p className="builder-textarea-hit">
        {t('Hit Shift ⇧ + Enter ↵ for new line', { lng: locale })}
      </p>
      <FakeSubmit text={t('Next', { lng: locale })} icon={<ChevronRightIcon />} />
    </Block>
  )
}
