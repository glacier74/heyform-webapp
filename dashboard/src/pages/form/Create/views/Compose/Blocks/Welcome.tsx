import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Welcome: FC<BlockProps> = ({ field, locale, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block
      className="builder-welcome builder-empty-state"
      field={field}
      locale={locale}
      {...restProps}
    >
      <FakeSubmit text={field.properties?.buttonText || t('Next', { lng: locale })} />
    </Block>
  )
}
