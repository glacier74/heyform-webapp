import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Signature: FC<BlockProps> = ({ field, locale, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-signature" field={field} locale={locale} {...restProps}>
      <div className="builder-signature-wrapper"></div>
      <div className="builder-signature-bottom">
        <span>{t('Draw your signature above', { lng: locale })}</span>
        <span>{t('Clear', { lng: locale })}</span>
      </div>
      <FakeSubmit text={t('Next', { lng: locale })} icon={<ChevronRightIcon />} />
    </Block>
  )
}
