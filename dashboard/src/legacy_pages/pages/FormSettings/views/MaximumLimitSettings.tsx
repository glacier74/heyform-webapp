import { NumberInput } from '@/legacy_pages/components/NumberInput'
import { FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { Button, ComponentProps, Flex, Form, FormItem, message, Switch } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

interface MaximumLimitSettingsProps extends ComponentProps {
  value?: boolean
  quotaLimit?: number
}

export const MaximumLimitSettings: FC<MaximumLimitSettingsProps> = ({
  value,
  quotaLimit,
  ...restProps
}) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const [switchLoading, setSwitchLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleChange(value: boolean) {
    if (switchLoading) {
      return
    }

    setSwitchLoading(true)
    await request({
      enableQuotaLimit: value
    })
    setSwitchLoading(false)
  }

  async function handleFinish(updates: any) {
    if (loading) {
      return
    }

    setLoading(true)
    await request(updates)
    setLoading(false)
  }

  async function request(updates: any) {
    try {
      await FormService.update(formId, updates)
      formStore.updateSettings(updates)

      message.success('Form settings have been successfully updated')
    } catch (err: any) {
      message.error('Failed to update form settings')
    }
  }

  return (
    <Container {...restProps}>
      <Header>{t('Maximum Submission Limit')}</Header>
      <Body>
        <Description>
          {t(
            'This allows you to set a specific total number of submissions allowed for your form.'
          )}
        </Description>
        <Switch value={value} loading={switchLoading} onChange={handleChange} />
      </Body>
      {value && (
        <Footer>
          <StyledForm initialValues={{ quotaLimit }} onFinish={handleFinish}>
            <InputFormItem
              name="quotaLimit"
              rules={[
                {
                  type: 'number',
                  required: true,
                  min: 1
                }
              ]}
            >
              <NumberInput size="small" />
            </InputFormItem>
            <FormItem>
              <StyledButton type="primary" htmlType="submit" loading={loading} size="small">
                {t('Save')}
              </StyledButton>
            </FormItem>
          </StyledForm>
        </Footer>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 24px;

  .hey-input {
    input {
      height: 40px;
      padding: 8px 24px;
    }
  }
`

const Header = styled.div`
  color: #4e5d78;
`

const Body = styled(Flex)`
  margin-top: 4px;
`

const Description = styled.div`
  flex: 1;
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
