import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FakeSelect } from '../FakeSelect'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Country: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-country" field={field} {...restProps}>
      <FakeSelect placeholder={t('formBuilder.selectCountry')} />
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
