import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const LongText: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-long-text" field={field} {...restProps}>
      <textarea
        className="builder-textarea"
        placeholder={t('formBuilder.yourAnswer')}
        disabled={true}
      />
      <p className="builder-textarea-hit">{t('formBuilder.hitTip')}</p>
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
