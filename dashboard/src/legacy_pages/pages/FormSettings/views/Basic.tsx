/**
 * @program: dashboard
 * @description:
 * @author: mufeng
 * @date: 12/1/21 1:22 PM
 **/

import { FormError, SubHeading } from '@/legacy_pages/components'
import { TimeInput } from '@/legacy_pages/components/TimeInput'
import { LanguageSettings } from '@/legacy_pages/pages/FormSettings/views/LanguageSettings'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { Button, Form, FormItem, message, SwitchFormItem } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const Basic: FC = observer(() => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const formStore = useStore('formStore')

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

      await FormService.update(formId, allValues)
      formStore.updateSettings(allValues)

      message.success(t('formSettings.formUpdated'))
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  function handleValuesChange(_: any, values: any) {
    setValues(values)
  }

  return (
    <div className="container">
      <SubHeading>{t('formSettings.Basic')}</SubHeading>

      <Form
        initialValues={formStore.current?.settings}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <FormItem name="locale">
          <LanguageSettings />
        </FormItem>

        <SwitchFormItem
          name="allowArchive"
          label={t('formSettings.subArchive')}
          description={t('formSettings.archiveText')}
        />

        <SwitchFormItem
          name="enableTimeLimit"
          label={t('formSettings.timeLimit')}
          description={t('formSettings.timeText')}
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
                min: 1,
                message: t('formSettings.dataError')
              }
            ]}
          >
            <StyledTimeInput
              options={[
                {
                  id: 'h',
                  label: t('formSettings.Hour')
                },
                {
                  id: 'm',
                  label: t('formSettings.Minute')
                },
                {
                  id: 's',
                  label: t('formSettings.Second')
                }
              ]}
            />
          </FormItem>
        )}

        <SwitchFormItem
          name="enableProgress"
          label={t('formSettings.progressBar')}
          description={t('formSettings.progressText')}
        />

        {error && <FormError error={error} />}
        <FormItem>
          <Button type="primary" htmlType="submit" size="small" loading={loading}>
            {t('formSettings.Update')}
          </Button>
        </FormItem>
      </Form>
    </div>
  )
})

const StyledTimeInput = styled(TimeInput)`
  width: 13.75rem;
`
