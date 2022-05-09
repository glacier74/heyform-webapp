import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FakeRadio } from '../FakeRadio'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const YesNo: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-yes-no" field={field} {...restProps}>
      <div className="builder-radio-group w-40">
        <FakeRadio hotkey="Y" label={t('Yes')} />
        <FakeRadio hotkey="N" label={t('No')} />
      </div>
    </Block>
  )
}
