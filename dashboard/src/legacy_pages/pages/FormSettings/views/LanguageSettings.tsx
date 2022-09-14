import { FORM_LOCALES_OPTIONS } from '@/legacy_pages/constants'
import { ComponentProps, Flex, Select } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface LanguageSettingsProps extends ComponentProps {
  value?: string
  onChange?: (value: string) => void
}

export const LanguageSettings: FC<LanguageSettingsProps> = ({ value, onChange, ...restProps }) => {
  const { t } = useTranslation()
  const options = FORM_LOCALES_OPTIONS.map(row => ({
    ...row,
    label: t(row.label)
  }))

  return (
    <Container align="flex-end" {...restProps}>
      <Left>
        <Header>{t('formSettings.Language')}</Header>
        <Description>{t('formSettings.LanguageDescription')}</Description>
      </Left>
      <Select
        value={value || 'en'}
        options={options}
        valueKey="value"
        size="small"
        allowClear={false}
        onChange={onChange}
      />
    </Container>
  )
}

const Container = styled(Flex)`
  margin-bottom: 24px;

  .hey-select {
    width: auto;
  }
`

const Header = styled.div`
  color: #4e5d78;
`

const Left = styled.div`
  flex: 1;
`

const Description = styled.div`
  margin-top: 4px;
  flex: 1;
  margin-right: 16px;
  color: #8a94a6;
  font-size: 13px;
`
