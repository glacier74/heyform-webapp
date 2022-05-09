import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FakeRadio } from '../FakeRadio'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const LegalTerms: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-legal-terms" field={field} {...restProps}>
      <div className="builder-radio-group w-56">
        <FakeRadio hotkey="Y" label={t('formBuilder.accept')} />
        <FakeRadio hotkey="N" label={t('formBuilder.dontAccept')} />
      </div>
    </Block>
  )
}
