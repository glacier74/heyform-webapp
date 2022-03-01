import { Heading, Request, SubHeading } from '@/legacy_pages/components'
import { TEMPLATE_CATEGORIES } from '@/legacy_pages/constants'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { TemplateModal } from '@/legacy_pages/models'
import { TemplateService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { Flex } from '@heyui/component'
import { uniqueArray } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'
import { TemplateItem } from '../CreateForm/views/TemplateItem'

interface CategoryItemProps {
  name: string
}

const CategoryItem: FC<CategoryItemProps> = ({ name }) => {
  function handleClick() {
    document.getElementById(name)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return <CategoryLink onClick={handleClick}>{name}</CategoryLink>
}

const Templates = observer(() => {
  const history = useHistory()
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId, projectId } = useParam()
  const [categories, setCategories] = useState<string[]>(extractCategories())

  async function fetchTemplates() {
    const result = await TemplateService.templates()
    const templates: TemplateModal[] = result

    workspaceStore.setTemplates(templates)
    setCategories(extractCategories())

    return result.length > 0
  }

  function extractCategories() {
    const categories = uniqueArray(workspaceStore.templates.map(row => row.category))

    return [...TEMPLATE_CATEGORIES, ...categories.filter(row => !TEMPLATE_CATEGORIES.includes(row))]
  }

  function handleNavigateBack() {
    history.push(`/workspace/${workspaceId}/project/${projectId}/form/create`)
  }

  return (
    <Container navigateBackTitle={t('Create a new form')} onNavigateBack={handleNavigateBack}>
      <Flex>
        <Sidebar>
          <CategoryList>
            <CategoryHeader>{t('Categories')}</CategoryHeader>
            {categories.map((name, index) => (
              <CategoryItem key={index} name={name} />
            ))}
          </CategoryList>
        </Sidebar>

        <Body>
          <Heading>{t('Templates')}</Heading>
          <Request fetch={fetchTemplates} useCache={workspaceStore.templates.length > 0}>
            {categories.map((category, index) => (
              <div key={index}>
                <StyledSubHeading id={category}>{category}</StyledSubHeading>
                <Flex wrap="wrap" style={{ marginLeft: -16, marginRight: -16 }}>
                  {workspaceStore.templates
                    .filter(row => row.category === category)
                    .map((template, index) => (
                      <TemplateItem
                        key={index}
                        workspaceId={workspaceStore.activeWorkspaceId!}
                        projectId={workspaceStore.activeProjectId!}
                        template={template}
                      />
                    ))}
                </Flex>
              </div>
            ))}
          </Request>
        </Body>
      </Flex>
    </Container>
  )
})

export default Templates

const Container = styled(NavBarContainer)`
  padding-top: 0;

  &,
  .navbar {
    background: #fafbfc;
  }

  .content {
    width: auto;
    padding-top: 40px;
  }
`

const Sidebar = styled.div`
  width: 280px;
  margin-left: 24px;
`

const CategoryList = styled.div`
  position: sticky;
  top: 100px;
  padding: 20px;
  height: calc(100vh - 100px - 60px);
  background: #fff;
  border-radius: 3px;
  overflow-y: auto;
`

const CategoryHeader = styled.div`
  padding: 8px 14px;
  color: #8a94a6;
`

const CategoryLink = styled.div`
  display: block;
  padding: 8px 14px;
  color: #4e5d78;
  font-weight: 400;
  cursor: pointer;
`

const Body = styled.div`
  flex: 1;
  margin-left: 64px;
  border-radius: 3px;
`

const StyledSubHeading = styled(SubHeading)`
  margin-top: 0;
  padding-top: 60px;
`