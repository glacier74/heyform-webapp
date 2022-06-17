import { Request } from '@/legacy_pages/components'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { TemplateModal } from '@/legacy_pages/models'
import { TemplateService } from '@/service'
import { useParam } from '@/utils'
import { getTheme, insertThemeStyle, insertWebFont, Renderer } from '@heyforms/form-component'
import { Button, message } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const TemplatePreview = observer(() => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { workspaceId, projectId, templateId } = useParam()
  const [loading, setLoading] = useState(false)
  const [template, setTemplate] = useState<TemplateModal | null>(null)

  async function fetchTemplate() {
    const result = await TemplateService.detail(templateId)
    setTemplate(result)
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
      navigate(`/workspace/${workspaceId}/project/${projectId}/form/${result}/create`)
    } catch (err: any) {
      message.error('Failed to use this template')
      setLoading(false)
    }
  }

  async function handleFinish() {
    message.warn("Can't submit form in Preview mode")
  }

  function handleNavigateBack() {
    navigate(`/workspace/${workspaceId}/project/${projectId}/templates`)
  }

  useEffect(() => {
    const theme = getTheme(template?.themeSettings?.theme)

    insertWebFont(theme.fontFamily)
    insertThemeStyle(theme)
  }, [templateId])

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
        <Renderer form={template as any} autoSave={false} onSubmit={handleFinish} />
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
  height: calc(100vh - 3.75rem);
`

const StyledButton = styled(Button)`
  svg {
    width: 16px;
    height: 16px;
  }
`
