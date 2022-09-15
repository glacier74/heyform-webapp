import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const ThankYou: FC<BlockProps> = ({ field, locale, className, children, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block
      className="builder-thank-you builder-empty-state"
      field={field}
      locale={locale}
      {...restProps}
    />
  )
}
