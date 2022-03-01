import { CAPTCHA_KIND_OPTIONS } from '@/legacy_pages/constants'
import { CaptchaKindEnum } from '@/legacy_pages/models'
import { ComponentProps, Flex, Select } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface PreventionSettingsProps extends ComponentProps {
  value?: CaptchaKindEnum
  onChange?: (value: CaptchaKindEnum) => void
}

export const PreventionSettings: FC<PreventionSettingsProps> = ({
  value,
  onChange,
  ...restProps
}) => {
  const { t } = useTranslation()

  return (
    <Container align="flex-end" {...restProps}>
      <Left>
        <Header>{t('Bots Prevention')}</Header>
        <Description>{t('Prevent bot submissions by enabling the captcha.')}</Description>
      </Left>
      <Select
        value={value || CaptchaKindEnum.NONE}
        options={CAPTCHA_KIND_OPTIONS}
        size="small"
        allowClear={false}
        onChange={onChange}
      />
    </Container>
  )
}

const Container = styled(Flex)`
  margin-bottom: 24px;
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
