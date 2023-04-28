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
import { ExclamationIcon } from '@heroicons/react/solid'
import { Button, Form, FormItem, Input, message, SwitchFormItem } from '@heyui/component'
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
      <SubHeading>Basic</SubHeading>

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

        <div className="relative cursor-not-allowed">
          <SwitchFormItem
            name="redirectOnCompletion"
            label={t('formSettings.Redirect')}
            description={t('formSettings.redirectText')}
            style={{
              paddingBottom: values?.redirectOnCompletion ? 0 : undefined
            }}
          />

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

          <div className="absolute inset-0"></div>
        </div>

        <div className="mb-4 w-full flex items-center px-3 py-2.5 bg-yellow-50 rounded-lg">
          <div className="flex-shrink-0">
            <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-yellow-800">
              Redirect on completion has been moved to the Thank You settings, go to the "Create"
              page, select "Thank You" in left sidebar, then set it in the settings on the right
              sidebar.
            </p>
          </div>
        </div>

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
