import { TimeInput } from '@/legacy_pages/components/TimeInput'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { Button, ComponentProps, Flex, Form, FormItem, message, Switch } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface TimeLimitSettingsProps extends ComponentProps {
  value?: boolean
  timeLimit?: number
}

export const TimeLimitSettings: FC<TimeLimitSettingsProps> = ({
  value,
  timeLimit,
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
      enableTimeLimit: value
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
      <Header>{t('Time Limit')}</Header>
      <Body>
        <Description>
          {t('You can set it below if you want to block submission when the time is up.')}
        </Description>
        <Switch value={value} loading={switchLoading} onChange={handleChange} />
      </Body>
      {value && (
        <Footer>
          <StyledForm initialValues={{ timeLimit }} onFinish={handleFinish}>
            <InputFormItem
              name="timeLimit"
              rules={[
                {
                  type: 'number',
                  required: true,
                  min: 1
                }
              ]}
            >
              <TimeInput />
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
