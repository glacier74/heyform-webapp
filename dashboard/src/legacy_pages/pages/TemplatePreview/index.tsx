import { Request } from '@/legacy_pages/components'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { TemplateModal } from '@/legacy_pages/models'
import { TemplateService } from '@/service'
import { useParam } from '@/utils'
import { customTheme, FormRender } from '@heyforms/form-component'
import { FormThemeV2 } from '@heyforms/shared-types-enums'
import { Button, message } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

const TemplatePreview = observer(() => {
  const history = useHistory()
  const { t } = useTranslation()
  const { workspaceId, projectId, templateId } = useParam()
  const [loading, setLoading] = useState(false)
  const [template, setTemplate] = useState<TemplateModal | Nil>(null)
  const [theme, setTheme] = useState<FormThemeV2 | undefined>()

  async function fetchTemplate() {
    const result = await TemplateService.detail(templateId)
    setTemplate(result)
    setTheme(customTheme(result.themeSettings?.theme))
    return true
  }

  async function handleUse() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const result = await TemplateService.useTemplate(projectId, template!.id)
      history.push(`/workspace/${workspaceId}/project/${projectId}/form/${result}/create`)
    } catch (err: any) {
      message.error('Failed to use this template')
      setLoading(false)
    }
  }

  function handleFinish() {
    message.warn('Can\'t submit form in Preview mode')
  }

  function handleNavigateBack() {
    history.goBack()
  }

  return (
    <Container
      navigateBackTitle={t('template.Templates')}
      actions={
        <StyledButton type="primary" loading={loading} onClick={handleUse}>
          {t('template.UseTemplate')}
        </StyledButton>
      }
      onNavigateBack={handleNavigateBack}
    >
      <StyledRequest fetch={fetchTemplate}>
        <ThemeProvider theme={theme}>
          <StyledFormRender
            form={template as any}
            theme={theme}
            finishRequest={handleFinish as any}
          />
        </ThemeProvider>
      </StyledRequest>
    </Container>
  )
})

export default TemplatePreview

const Container = styled(NavBarContainer)`
  .content {
    width: 100%;
    padding: 0;
  }
`

const StyledRequest = styled(Request)`
  min-height: 100vh;
`

const StyledFormRender = styled(FormRender)`
  min-height: calc(100vh - 60px);
`

const StyledButton = styled(Button)`
  svg {
    width: 16px;
    height: 16px;
  }
`
