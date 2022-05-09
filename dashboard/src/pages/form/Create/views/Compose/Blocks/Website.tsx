import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Website: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-website" field={field} {...restProps}>
      <input
        type="url"
        className="builder-input"
        placeholder="https://example.com"
        disabled={true}
      />
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
