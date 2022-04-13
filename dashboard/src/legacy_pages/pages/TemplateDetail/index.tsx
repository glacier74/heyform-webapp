import { Request } from '@/legacy_pages/components'
import { TemplateModal } from '@/legacy_pages/models'
import { useStore } from '@/legacy_pages/utils'
import { TemplateService } from '@/service'
import { useParam } from '@/utils'
import { FormRender } from '@heyforms/form-component'
import { Button, Flex, message } from '@heyui/component'
import { ArrowLeftSIcon } from '@heyui/icon'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const TemplateDetail = observer(() => {
  const navigate = useNavigate()
  const workspaceStore = useStore('workspaceStore')
  const { templateId } = useParam()
  const [loading, setLoading] = useState(false)
  const [template, setTemplate] = useState<TemplateModal | Nil>(null)

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
      const workspaceId = workspaceStore.activeWorkspaceId!
      const projectId = workspaceStore.activeProjectId!
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const result = await TemplateService.useTemplate(projectId, template!.id)
      navigate(`/workspace/${workspaceId}/project/${projectId}/form/${result}/create`)
    } catch (err: any) {
      message.error('Failed to use this template')
      setLoading(false)
    }
  }

  function handleFinish() {
    message.warn("Can't submit form in Preview mode")
  }

  function handleExitPreview() {
    navigate.goBack()
  }

  return (
    <Container>
      <Navbar align="center" justify="space-between">
        <ExitPreview onClick={handleExitPreview}>
          <ArrowLeftSIcon />
          Exit template preview
        </ExitPreview>
        <StyledButton
          size="small"
          type="primary"
          ghost={true}
          loading={loading}
          onClick={handleUse}
        >
          Use this template
        </StyledButton>
      </Navbar>

      <StyledRequest fetch={fetchTemplate}>
        <StyledFormRender form={template as any} finishRequest={handleFinish as any} />
      </StyledRequest>
    </Container>
  )
})

export default TemplateDetail

const Container = styled.div`
  margin: -40px;
`

const StyledRequest = styled(Request)`
  min-height: 100vh;
`

const StyledFormRender = styled(FormRender)`
  min-height: 100vh;
`

const Navbar = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  z-index: 9;
`

const ExitPreview = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary};
  }

  svg {
    margin-right: 10px;
  }
`

const StyledButton = styled(Button)`
  margin-right: 12px;
`
