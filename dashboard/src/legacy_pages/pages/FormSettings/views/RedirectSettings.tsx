import { UpgradePlan } from '@/legacy_pages/components/UpgradePlan'
import { PlanGradeEnum } from '@/legacy_pages/models'
import { FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import {
  Button,
  ComponentProps,
  Flex,
  Form,
  FormItem,
  Input,
  message,
  Switch
} from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

interface RedirectSettingsProps extends ComponentProps {
  value?: boolean
  redirectUrl?: string
}

export const RedirectSettings: FC<RedirectSettingsProps> = ({
  value,
  redirectUrl,
  ...restProps
}) => {
  const { t } = useTranslation()
  const { formId } = useParam()

  const formStore = useStore('formStore')
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  async function handleChange(value: boolean) {
    if (loading) {
      return
    }

    setLoading(true)
    await request('redirectOnCompletion', value)
    setLoading(false)
  }

  async function handleFinish(values: any) {
    if (loading) {
      return
    }

    setButtonLoading(true)
    await request('redirectUrl', values.redirectUrl)
    setButtonLoading(false)
  }

  async function request(name: string, value: any) {
    try {
      const updates = {
        [name]: value
      }

      await FormService.update(formId, updates)
      formStore.updateSettings(updates)

      message.success('Form settings have been successfully updated')
    } catch (err: any) {
      message.error('Failed to update form settings')
    }
  }

  return (
    <Container {...restProps}>
      <UpgradePlan name="Pro" permission={PlanGradeEnum.PRO}>
        <Header align="center">
          <span>{t('Redirect On Completion')}</span>
        </Header>
        <Body>
          <Description>
            {t("Take your respondents to another web page once they're done filling in your form.")}
          </Description>
          <Switch value={value} loading={loading} onChange={handleChange} />
        </Body>
        {value && (
          <Footer>
            <StyledForm initialValues={{ redirectUrl }} onFinish={handleFinish}>
              <InputFormItem
                name="redirectUrl"
                rules={[
                  {
                    type: 'url',
                    required: true
                  }
                ]}
              >
                <Input size="small" placeholder="eg: https://example.com" />
              </InputFormItem>
              <FormItem>
                <StyledButton type="primary" htmlType="submit" loading={buttonLoading} size="small">
                  {t('Save')}
                </StyledButton>
              </FormItem>
            </StyledForm>
          </Footer>
        )}
      </UpgradePlan>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 24px;

  .upgrade-wrapper {
    background-image: linear-gradient(to right, transparent, #fff);
  }
`

const Header = styled(Flex)`
  color: #4e5d78;
`

const Body = styled(Flex)`
  margin-top: 4px;
`

const Description = styled.div`
  flex: 1;
  margin-right: 16px;
  color: #8a94a6;
  font-size: 13px;
`

const Footer = styled.div`
  margin-top: 12px;
  margin-bottom: -24px;
`

const StyledForm = styled(Form)`
  display: flex;
`

const InputFormItem = styled(FormItem)`
  flex: 1;
  margin-right: 12px;

  input {
    height: 40px;
  }
`

const StyledButton = styled(Button)``
