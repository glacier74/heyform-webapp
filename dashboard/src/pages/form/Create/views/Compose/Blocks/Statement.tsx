import { IconChevronRight } from '@tabler/icons-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'

import type { BlockProps } from './Block'
import { Block } from './Block'

export const Statement: FC<BlockProps> = ({ field, locale, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="heyform-statement" field={field} locale={locale} {...restProps}>
      <FakeSubmit
        text={field.properties?.buttonText || t('Next', { lng: locale })}
        icon={<IconChevronRight />}
      />
    </Block>
  )
}
