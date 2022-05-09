import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const FullName: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-full-name" field={field} {...restProps}>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="builder-input"
          placeholder={t('formBuilder.firstName')}
          disabled={true}
        />
        <input
          type="text"
          className="builder-input"
          placeholder={t('formBuilder.lastName')}
          disabled={true}
        />
      </div>
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
