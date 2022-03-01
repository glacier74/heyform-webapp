/**
 * @program: dashboard
 * @description:
 * @author: mufeng
 * @date: 12/1/21 1:22 PM
 **/

import { FormError, SubHeading } from '@/legacy_pages/components'
import { TimeInput } from '@/legacy_pages/components/TimeInput'
import { PlanPermissionBadge, UpgradePlan } from '@/legacy_pages/components/UpgradePlan'
import { PlanGradeEnum } from '@/legacy_pages/models'
import { FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { Button, Form, FormItem, Input, message, SwitchFormItem } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

export const Basic: FC = observer(() => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const workspaceStore = useStore('workspaceStore')

  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState<IMapType>(formStore.current?.settings as any)
  const [error, setError] = useState<Error | null>(null)

  async function handleFinish(allValues: IMapType) {
    if (loading) {
      return
    }
    setLoading(true)

    try {
      const allowArchive = allValues.allowArchive

      if (allowArchive !== formStore.current?.settings?.allowArchive) {
        await FormService.updateArchive(formId, allowArchive)
      }

      delete allValues.allowArchive
      if (workspaceStore.workspace?.plan.grade! < PlanGradeEnum.PRO) {
        delete allValues.redirectOnCompletion
      }

      await FormService.update(formId, allValues)
      formStore.updateSettings(allValues)

      message.success('Form settings have been successfully updated')
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  function handleValuesChange(_: any, values: any) {
    setValues(values)
  }

  return (
    <Container>
      <SubHeading>{t('Basic')}</SubHeading>

      <Form
        initialValues={formStore.current?.settings}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <StyledFormItem
          name="allowArchive"
          label={t('Submission Archive')}
          description={t(
            "Disable the submission archive if you don't want HeyForm to store your submissions."
          )}
        />

        <StyledFormItem
          name="enableTimeLimit"
          label={t('Time Limit')}
          description={t(
            'You can set it below if you want to block submission when the time is up.'
          )}
          style={{
            paddingBottom: values?.enableTimeLimit ? 0 : undefined
          }}
        />
        {values?.enableTimeLimit && (
          <FormItem
            name="timeLimit"
            rules={[
              {
                required: true,
                type: 'number',
                min: 1
              }
            ]}
          >
            <StyledTimeInput
              options={[
                {
                  id: 'h',
                  label: 'Hour'
                },
                {
                  id: 'm',
                  label: 'Minute'
                },
                {
                  id: 's',
                  label: 'Second'
                }
              ]}
            />
          </FormItem>
        )}

        <StyledFormItem
          name="enableProgress"
          label={t('Progress Bar')}
          description={t(
            'You can easily let respondents know how close they are to completing your form.'
          )}
        />

        <UpgradePlan name="Pro" permission={PlanGradeEnum.PRO}>
          <StyledFormItem
            name="redirectOnCompletion"
            label={
              <>
                <span>{t('Redirect On Completion')}</span>
                <PlanPermissionBadge name="Pro" permission={PlanGradeEnum.PRO} />
              </>
            }
            description={t(
              "Take your respondents to another web page once they're done filling in your form."
            )}
            style={{
              paddingBottom: values?.redirectOnCompletion ? 0 : undefined
            }}
          />
        </UpgradePlan>
        {values?.redirectOnCompletion && (
          <FormItem
            name="redirectUrl"
            rules={[
              {
                type: 'url',
                required: true
              }
            ]}
          >
            <Input size="small" placeholder="eg: https://example.com" />
          </FormItem>
        )}

        {error && <FormError error={error} />}
        <FormItem>
          <Button type="primary" htmlType="submit" size="small" loading={loading}>
            {t('Update')}
          </Button>
        </FormItem>
      </Form>
    </Container>
  )
})

const Container = styled.div`
  .hey-label {
    margin-bottom: 8px;
    color: #37352f !important;
  }

  .heyform-item-description {
    color: #8a94a6;
    font-size: 13px;
  }

  input {
    height: 40px;
  }
`

const StyledFormItem = styled(SwitchFormItem)``

const StyledTimeInput = styled(TimeInput)`
  width: 80px;
`
