import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FakeSelect } from '../FakeSelect'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Address: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-address" field={field} {...restProps}>
      <div className="space-y-4">
        <input
          type="text"
          className="builder-input"
          placeholder={t('formBuilder.address1')}
          disabled={true}
        />
        <input
          type="text"
          className="builder-input"
          placeholder={t('formBuilder.address2')}
          disabled={true}
        />

        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="builder-input"
            placeholder={t('formBuilder.city')}
            disabled={true}
          />
          <input
            type="text"
            className="builder-input"
            placeholder={t('formBuilder.state')}
            disabled={true}
          />
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="builder-input"
            placeholder={t('formBuilder.zip')}
            disabled={true}
          />
          <FakeSelect placeholder={t('formBuilder.country')} />
        </div>
      </div>
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
