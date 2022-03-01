/**
 * @program: dashboard
 * @description:
 * @author: mufeng
 * @date: 12/1/21 1:22 PM
 **/

import { FormError, SubHeading } from '@/legacy_pages/components'
import { PreventionSettings } from '@/legacy_pages/pages/FormSettings/views/PreventionSettings'
import { FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { Button, Form, FormItem, message, SwitchFormItem } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

export const Protection: FC = observer(() => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleFinish(allValues: IMapType) {
    if (loading) {
      return
    }
    setLoading(true)

    try {
      await FormService.update(formId, allValues)
      formStore.updateSettings(allValues)

      message.success('Form settings have been successfully updated')
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Container>
      <SubHeading>{t('Protection')}</SubHeading>

      <Form initialValues={formStore.current?.settings} onFinish={handleFinish}>
        <FormItem name="captchaKind">
          <PreventionSettings />
        </FormItem>

        <SwitchFormItem
          name="filterSpam"
          label={t('Anti-Spam')}
          description={t('Enable to prevent spam submissions.')}
        />

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

  .hey-form-item-control {
    & > div {
      margin-bottom: 0;
    }
  }
`
