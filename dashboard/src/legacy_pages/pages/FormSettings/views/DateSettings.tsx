import { DatetimePicker } from '@/legacy_pages/components/DatetimePicker'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { Button, ComponentProps, Flex, Form, FormItem, message, Switch } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface DateSettingsProps extends ComponentProps {
  value?: boolean
  enabledAt?: number
  closedAt?: number
}

export const DateSettings: FC<DateSettingsProps> = ({
  value,
  enabledAt,
  closedAt,
  ...restProps
}) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const [values, setValues] = useState<Record<string, number>>()
  const [switchLoading, setSwitchLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleChange(value: boolean) {
    if (switchLoading) {
      return
    }

    setSwitchLoading(true)
    await request({
      enableExpirationDate: value
    })
    setSwitchLoading(false)
  }

  async function handleFinish(updates: any) {
    if (!isValid(updates)) {
      return
    }

    if (loading) {
      return
    }

    setLoading(true)
    await request(updates)
    setLoading(false)
  }

  function handleValuesChange(_: any, values: any) {
    setValues(values)
  }

  async function request(updates: any) {
    try {
      await FormService.update(formId, updates)
      formStore.updateSettings(updates)

      message.success(t('formSettings.formUpdated'))
    } catch (err: any) {
      message.error('Failed to update form settings')
    }
  }

  return (
    <Container {...restProps}>
      <Header>{t('formSettings.expiration')}</Header>
      <Body>
        <Description>{t('formSettings.expirationText')}</Description>
        <Switch value={value} loading={switchLoading} onChange={handleChange} />
      </Body>
      {value && (
        <Footer>
          <Form
            initialValues={{
              enabledAt,
              closedAt
            }}
            onValuesChange={handleValuesChange}
            onFinish={handleFinish}
          >
            <Flex>
              <Flex align="flex-start" auto={true}>
                <FormItem name="enabledAt" hideRequiredMark={true}>
                  <DatetimePicker
                    placeholder="Start Date"
                    format="MMM DD, YYYY hh:mm A"
                    timeFormat="hh:mm A"
                  />
                </FormItem>
                <Divider>-</Divider>
                <FormItem
                  name="closedAt"
                  hideRequiredMark={true}
                  validateTrigger={['onBlur', 'onChange']}
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (isValid(values?.enabledAt) && value < values!.enabledAt!) {
                          throw new Error(t('formSettings.dateErr'))
                        }
                      }
                    }
                  ]}
                >
                  <DatetimePicker
                    placeholder="Close Date"
                    format="MMM DD, YYYY hh:mm A"
                    timeFormat="hh:mm A"
                  />
                </FormItem>
              </Flex>
              <FormItem>
                <Button type="primary" htmlType="submit" size="small" loading={loading}>
                  {t('Save')}
                </Button>
              </FormItem>
            </Flex>
          </Form>
        </Footer>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 28px;

  .hey-input {
    input {
      width: 240px;
      height: 40px;
      padding: 8px 24px;
      color: #37352f !important;
      background: #fff !important;
      cursor: pointer !important;
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

const Divider = styled.div`
  height: 44px;
  color: #8a94a6;
  line-height: 44px;
  margin-left: 12px;
  margin-right: 12px;
`
