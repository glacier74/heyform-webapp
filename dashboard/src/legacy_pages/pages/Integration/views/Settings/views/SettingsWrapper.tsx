import { FormError } from '@/legacy_pages/components'
import { AppModel } from '@/legacy_pages/models'
import { Summary } from '@/legacy_pages/pages/Integration/views/Settings/views/Summary'
import { useStore } from '@/legacy_pages/utils'
import { AppService, FormService, IntegrationService } from '@/service'
import { useParam } from '@/utils'
import { Button, Form } from '@heyui/component'
import { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface Option {
  name: string
  label: string
  placeholder?: string
  description?: ReactNode
  rules: any[]
}

export interface SettingsProps {
  app?: AppModel
  options?: Option[]
  onFinish?: () => void
}

interface SettingsWrapperProps extends SettingsProps {
  initialValues?: Record<string, any>
  onValuesChange?: (changedValues: any, values: Record<string, any>) => void
  children?: ReactNode
}

export const SettingsWrapper: FC<SettingsWrapperProps> = ({
                                                            app,
                                                            initialValues,
                                                            onValuesChange,
                                                            onFinish,
                                                            children = []
                                                          }) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const integrationStore = useStore('integrationStore')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()

  async function handleFinish(values: Record<string, any>) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await IntegrationService.updateSettings(formId, app!.id, {
        [app!.uniqueId]: values
      })
      await fetchIntegrations()
      onFinish && onFinish()
    } catch (err: any) {
      setError(err)
      setLoading(false)
    }
  }

  async function fetchIntegrations() {
    const [result1, result2] = await Promise.all([
      AppService.apps(),
      FormService.integrations(formId)
    ])

    integrationStore.setApps(result1)
    integrationStore.setIntegrations(result2)

    return true
  }

  return (
    <Container>
      <Summary app={app}/>
      <Form initialValues={initialValues} onValuesChange={onValuesChange} onFinish={handleFinish}>
        {children}
        {error && <FormError error={error}/>}
        <Button htmlType="submit" type="primary" block={true} loading={loading}>
          {t('integration.ConnectWith')} {app?.name}
        </Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  .hey-select {
    width: 100%;
    height: 40px;
  }

  label {
    font-weight: 600;

    &:before {
      display: none;
    }
  }

  .hey-form-item-content {
    * {
      color: #8a94a6;
    }

    label {
      color: #4e5d78;
      font-weight: 500;
    }

    .hey-form-item-control {
      margin-top: 10px;
    }

    a {
      color: #8a94a6;
      text-decoration: underline;

      &:hover {
        color: #377dff;
      }
    }

    code {
      padding: 2px 4px;
      font-size: ${props => props.theme.smallFontSize};
      background: ${props => props.theme.background};
      border-radius: ${props => props.theme.borderRadius};
    }
  }
`
