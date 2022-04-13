import { Fetcher, Heading, SubHeading } from '@/legacy_pages/components'
import { ClassicFormIcon, ImportFormIcon } from '@/legacy_pages/components/Icons'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { TemplateModal } from '@/legacy_pages/models'
import { useStore } from '@/legacy_pages/utils'
import { FormService, TemplateService } from '@/service'
import { useParam } from '@/utils'
import { FormKindEnum, InteractiveModeEnum } from '@heyforms/shared-types-enums'
import { Flex, message, Spin } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MoreTemplates } from './views/MoreTemplates'
import { TemplateItem } from './views/TemplateItem'
import { TemplateSkeleton } from './views/TemplateSkeleton'

const CreateForm = observer(() => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId, projectId } = useParam()
  const [templates, setTemplates] = useState<TemplateModal[]>([])
  const [loading, setLoading] = useState(false)

  async function handleScratch() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const result = await FormService.create({
        projectId,
        name: 'Untitled',
        nameSchema: ['Untitled'],
        interactiveMode: InteractiveModeEnum.GENERAL,
        kind: FormKindEnum.SURVEY
      })
      fetchForms()
      navigate(`/workspace/${workspaceId}/project/${projectId}/form/${result}/create`)
    } catch (err: any) {
      setLoading(false)
      console.error(err)
      message.error('Failed to create the form')
    }
  }

  function handleImport() {
    navigate(`/workspace/${workspaceId}/project/${projectId}/form/import`)
  }

  async function fetchForms() {
    const result = await FormService.forms(workspaceId)
    workspaceStore.setForms(workspaceId, result)
  }

  async function fetchTemplates() {
    const result = await TemplateService.templates({
      limit: 3
    })
    setTemplates(result)
    return result.length > 0
  }

  function handleNavigateBack() {
    navigate(`/workspace/${workspaceId}/project/${projectId}`)
  }

  return (
    <Container
      navigateBackTitle={`${workspaceStore.project?.name} · ${workspaceStore.workspace?.name}`}
      onNavigateBack={handleNavigateBack}
    >
      <Heading description={t('createForm.typeText')}>{t('importForm.createForm')}</Heading>

      <SubHeading>{t('createForm.createNew')}</SubHeading>
      <Flex>
        <StartScratch align="center" justify="center" column={true} onClick={handleScratch}>
          <Flex align="center" justify="center" auto={true}>
            <ClassicFormIcon />
          </Flex>
          <Text>{t('createForm.ClassicForm')}</Text>

          {loading && (
            <Loader align="center" justify="center">
              <Spin />
            </Loader>
          )}
        </StartScratch>

        <StartScratch align="center" justify="center" column={true} onClick={handleImport}>
          <Flex align="center" justify="center" auto={true}>
            <ImportFormIcon />
          </Flex>
          <Text>{t('createForm.URLForm')}</Text>
        </StartScratch>
      </Flex>

      <SubHeading>{t('createForm.templatesForm')}</SubHeading>
      <Fetcher request={fetchTemplates} skeleton={<TemplateSkeleton />}>
        <Flex wrap="wrap" style={{ marginLeft: -10, marginRight: -10 }}>
          {templates.map((template, index) => (
            <TemplateItem
              key={index}
              workspaceId={workspaceId}
              projectId={projectId}
              template={template}
            />
          ))}
          <MoreTemplates />
        </Flex>
      </Fetcher>
    </Container>
  )
})

export default CreateForm

const Container = styled(NavBarContainer)`
  &,
  .navbar {
    background: #fafbfc;
  }

  .content {
    width: 1000px;
  }
`

const StartScratch = styled(Flex)`
  position: relative;
  margin: 0 20px 20px 0;
  width: 160px;
  height: 214px;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
  }

  svg {
    width: 60px;
    height: 60px;
    color: #b0b7c3;
  }
`

const Text = styled.div`
  height: 40px;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
`

const Loader = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => alpha(props.theme.white, 0.85)};

  svg {
    width: 24px;
    height: 24px;
  }
`
