import { NumberInput } from '@/legacy_pages/components/NumberInput'
import { TimeInput } from '@/legacy_pages/components/TimeInput'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import {
  Button,
  CheckboxValue,
  ComponentProps,
  Flex,
  Form,
  FormItem,
  message,
  Radio,
  RadioGroup,
  Switch
} from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface IpLimitSettingsProps extends ComponentProps {
  value?: boolean
  ipLimitCount?: number
  ipLimitTime?: number
}

enum IpLimitRadioEnums {
  ONCE = 0,
  MANUAL = 1
}

export const IpLimitSettings: FC<IpLimitSettingsProps> = ({
                                                            value,
                                                            ipLimitCount,
                                                            ipLimitTime,
                                                            ...restProps
                                                          }) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const [radioValue, setRadioValue] = useState<CheckboxValue>()
  const [switchLoading, setSwitchLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleChange(value: boolean) {
    if (switchLoading) {
      return
    }

    setSwitchLoading(true)
    await request({
      enableIpLimit: value
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

  async function handleSubmit() {
    if (loading) {
      return
    }

    setLoading(true)
    await request({
      ipLimitCount: 1,
      ipLimitTime: 0
    })
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

  useEffect(() => {
    if (isValid(ipLimitCount)) {
      setRadioValue({
        value: [isValid(ipLimitTime) ? IpLimitRadioEnums.MANUAL : IpLimitRadioEnums.ONCE]
      })
    } else {
      setRadioValue({
        value: []
      })
    }
  }, [value])

  return (
    <Container {...restProps}>
      <Header>{t('formSettings.timeLimit')}</Header>
      <Body>
        <Description>
          {t('formSettings.timeText')}
        </Description>
        <Switch value={value} loading={switchLoading} onChange={handleChange}/>
      </Body>
      {value && (
        <Footer>
          <RadioGroup value={radioValue} onChange={setRadioValue}>
            <Radio value={IpLimitRadioEnums.MANUAL}>
              <StyledForm
                initialValues={{
                  ipLimitCount,
                  ipLimitTime
                }}
                onFinish={handleFinish}
              >
                <span>Can't submit more than</span>
                <FormItem
                  name="ipLimitCount"
                  style={{
                    marginLeft: 10,
                    marginRight: 10
                  }}
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      min: 1,
                      message: 'Total number can\'t be empty'
                    }
                  ]}
                >
                  <StyledNumberInput/>
                </FormItem>
                <span>times within</span>
                <FormItem
                  name="ipLimitTime"
                  style={{
                    marginLeft: 10,
                    marginRight: 10
                  }}
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      min: 1,
                      message: 'Time can\'t be empty'
                    }
                  ]}
                >
                  <StyledTimeInput
                    options={[
                      {
                        id: 'm',
                        label: t('formSettings.Minute')
                      },
                      {
                        id: 'h',
                        label: t('formSettings.Hour')
                      },
                      {
                        id: 'd',
                        label: t('formSettings.Day')
                      }
                    ]}
                  />
                </FormItem>

                {radioValue?.value.includes(IpLimitRadioEnums.MANUAL) && (
                  <FormItem>
                    <StyledButton type="primary" htmlType="submit" loading={loading} size="small">
                      {t('Save')}
                    </StyledButton>
                  </FormItem>
                )}
              </StyledForm>
            </Radio>
            <Radio value={IpLimitRadioEnums.ONCE}>
              <Flex align="center" justify="space-between">
                <span>Can only submit once</span>
                {radioValue?.value?.includes(IpLimitRadioEnums.ONCE) && (
                  <StyledButton2
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="small"
                    onClick={handleSubmit}
                  >
                    {t('Save')}
                  </StyledButton2>
                )}
              </Flex>
            </Radio>
          </RadioGroup>
        </Footer>
      )}
    </Container>
  )
}

const StyledButton = styled(Button)``
const StyledButton2 = styled(StyledButton)``

const Container = styled.div`
  margin-bottom: 24px;

  .hey-input {
    input {
      height: 40px;
      padding: 8px 24px;
    }
  }

  .hey-radio-text {
    flex: 1;
  }

  .hey-input-number {
    input {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .hey-select {
    button {
      width: 100px;
      padding-left: 10px;
    }

    .hey-select-label {
      padding-left: 12px;
    }

    .hey-select-arrow-icon {
      right: 8px;
    }
  }

  ${StyledButton},
  ${StyledButton2} {
    position: absolute;
  }

  ${StyledButton2} {
    margin-top: -39px;
    right: -3px;
  }

  .hey-radio-group {
    position: relative;

    .hey-form-item {
      padding-bottom: 0 !important;
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
`

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
`

const StyledNumberInput = styled(NumberInput)`
  width: 80px;
`

const StyledTimeInput = styled(TimeInput)`
  width: 80px;
`
