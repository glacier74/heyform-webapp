import { COMPONENT_KINDS } from '@/legacy_pages/constants'
import { FormItem, Input, Select, Switch } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const TypeSettings: FC = () => {
  const { t } = useTranslation()

  const options = COMPONENT_KINDS.map(row => ({
    ...row,
    label: t(row.label)
  }))

  return (
    <FormItem className="item" labelClassName="label" name="kind" label={t('Component Type')}>
      <Select className="select" options={options} allowClear={false} />
    </FormItem>
  )
}

export const TitleSettings: FC = () => {
  const { t } = useTranslation()

  return (
    <FormItem className="item" labelClassName="label" name="title" label={t('Title')}>
      <TextArea />
    </FormItem>
  )
}

export const ValidationSettings: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <SettingsExplanation>{t('Validation')}</SettingsExplanation>
      <FormItem
        className="item"
        labelClassName="label"
        label={t('Required')}
        name="required"
        inline={true}
      >
        <Switch />
      </FormItem>
    </>
  )
}

export const SettingsExplanation = styled.div`
  position: sticky;
  top: 0;
  padding: 20px 0 12px 0;
  color: #4e5d78;
  font-weight: 500;
  background: #fff;
`

const TextArea = styled(Input.TextArea)``
