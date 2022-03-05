/**
 * @program: dashboard
 * @description:
 * @author: mufeng
 * @date: 12/1/21 1:22 PM
 **/

import { FormError, SubHeading } from '@/legacy_pages/components'
import { DatetimePicker } from '@/legacy_pages/components/DatetimePicker'
import { NumberInput } from '@/legacy_pages/components/NumberInput'
import { TimeInput } from '@/legacy_pages/components/TimeInput'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { Button, Flex, Form, FormItem, message, Switch, SwitchFormItem } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const FormStatus: FC = observer(() => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')

  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [values, setValues] = useState<IMapType>(formStore.current?.settings as any)
  const [error, setError] = useState<Error | null>(null)

  async function handleSwitchChange(value: boolean) {
    if (loading) {
      return
    }
    setLoading(true)

    try {
      await FormService.update(formId, {
        active: value
      })
      formStore.updateSettings({
        active: value
      })

      message.success('Form settings have been successfully updated')
    } catch (err: any) {
      message.error('Failed to update form settings')
    }

    setLoading(false)
  }

  async function handleFinish(values: IMapType) {
    if (loading2) {
      return
    }
    setLoading2(true)

    try {
      await FormService.update(formId, values)
      formStore.updateSettings(values)

      message.success('Form settings have been successfully updated')
    } catch (err: any) {
      setError(err)
    }

    setLoading2(false)
  }

  function handleValuesChange(_: any, values: any) {
    setValues(values)
  }

  return (
    <Container>
      <SwitchContainer align="center" justify="space-between">
        <StyledSubHeading>{t('Form Status')}</StyledSubHeading>
        <Switch
          loading={loading}
          value={formStore.current?.settings?.active}
          onChange={handleSwitchChange}
        />
      </SwitchContainer>
      <Description>
        {t(
          'You can disable this form to stop receiving new submissions and prevent public access to the form.'
        )}
      </Description>

      {formStore.current?.settings?.active && (
        <Form
          initialValues={formStore.current?.settings}
          onValuesChange={handleValuesChange}
          onFinish={handleFinish}
        >
          <StyledFormItem
            name="enableExpirationDate"
            label={t('Expiration date')}
            description={t(
              'When you want to receiving submissions within a certain date range, you can set the start and end dates below.'
            )}
            style={{
              paddingBottom: values?.enableExpirationDate ? 0 : undefined
            }}
          />
          {values?.enableExpirationDate && (
            <Flex align="flex-start" auto={true}>
              <FormItem
                name="enabledAt"
                hideRequiredMark={true}
                style={{
                  width: 180
                }}
              >
                <DatetimePicker
                  placeholder="Start Date"
                  format="MMM DD, YYYY hh:mm A"
                  timeFormat="hh:mm A"
                />
              </FormItem>
              <Divider>{t('to')}</Divider>
              <CloseDateFormItem
                name="closedAt"
                hideRequiredMark={true}
                validateTrigger={['onBlur', 'onChange']}
                rules={[
                  {
                    validator: async (_, value) => {
                      if (isValid(values?.enabledAt) && value < values!.enabledAt!) {
                        throw new Error('Close Date must come after the Start Date')
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
              </CloseDateFormItem>
            </Flex>
          )}

          <StyledFormItem
            name="enableQuotaLimit"
            label={t('Submission Limit')}
            description={t(
              'This allows you to set a specific total number of submissions allowed for your form.'
            )}
            style={{
              paddingBottom: values?.enableQuotaLimit ? 0 : undefined
            }}
          />
          {values?.enableQuotaLimit && (
            <NumberLimitItem
              name="quotaLimit"
              rules={[
                {
                  type: 'number',
                  required: true,
                  min: 1,
                  message: 'Please enter a valid number'
                }
              ]}
            >
              <StyledNumberInput size="small" />
            </NumberLimitItem>
          )}

          <StyledFormItem
            name="enableIpLimit"
            label={t('IP Address Limit')}
            description={t(
              'You can set it below if you want to limit the number of submitting times from a same IP address in a period.'
            )}
            style={{
              paddingBottom: values?.enableIpLimit ? 0 : undefined
            }}
          />
          {values?.enableIpLimit && (
            <Flex>
              <NumberLimitItem
                name="ipLimitCount"
                rules={[
                  {
                    required: true,
                    type: 'number',
                    min: 1,
                    message: 'Please enter a valid number'
                  }
                ]}
              >
                <StyledNumberInput />
              </NumberLimitItem>
              <Divider>times in every</Divider>
              <FormItem
                name="ipLimitTime"
                rules={[
                  {
                    required: true,
                    type: 'number',
                    min: 1,
                    message: 'Please enter a valid number'
                  }
                ]}
              >
                <StyledTimeInput
                  options={[
                    {
                      id: 'd',
                      label: 'Day'
                    },
                    {
                      id: 'h',
                      label: 'Hour'
                    },
                    {
                      id: 'm',
                      label: 'Minute'
                    }
                  ]}
                />
              </FormItem>
            </Flex>
          )}

          {error && <FormError error={error} />}
          <FormItem>
            <Button type="primary" htmlType="submit" size="small" loading={loading2}>
              {t('Update')}
            </Button>
          </FormItem>
        </Form>
      )}
    </Container>
  )
})

const Container = styled.div`
  .hey-label {
    margin-bottom: 8px;
  }

  input {
    height: 40px;
  }

  .hey-label {
    margin-bottom: 8px;
    color: #37352f !important;
  }

  .heyform-item-description {
    color: #8a94a6;
    font-size: 13px;
  }
`

const StyledSubHeading = styled(SubHeading)`
  margin-top: 0;

  &,
  .subheading-title {
    margin-bottom: 0;
  }
`

const SwitchContainer = styled(Flex)`
  margin-bottom: 10px;
`

const Description = styled.div`
  color: #8a94a6;
  font-size: 13px;
  margin-bottom: 16px;
`

const StyledFormItem = styled(SwitchFormItem)``

const Divider = styled.div`
  height: 40px;
  color: #8a94a6;
  line-height: 40px;
  margin-left: 12px;
  margin-right: 12px;
`

const CloseDateFormItem = styled(FormItem)`
  flex: 1;
`

const StyledNumberInput = styled(NumberInput)`
  width: 180px;
`

const StyledTimeInput = styled(TimeInput)`
  width: 80px;
`

const NumberLimitItem = styled(FormItem)`
  &,
  input {
    width: 180px;
  }
`
