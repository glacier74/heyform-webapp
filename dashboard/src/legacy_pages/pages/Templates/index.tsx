import { Heading, Request, SubHeading } from '@/legacy_pages/components'
import { TEMPLATE_CATEGORIES } from '@/legacy_pages/constants'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { TemplateModal } from '@/legacy_pages/models'
import { TemplateService } from '@/service'
import { useParam } from '@/utils'
import { Flex } from '@heyui/component'
import { uniqueArray } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
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

const Templates = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { workspaceId, projectId } = useParam()
  const [categories, setCategories] = useState<string[]>([])
  const [templates, setTemplates] = useState<TemplateModal[]>([])

  function extractCategories(result: TemplateModal[]) {
    const cats = uniqueArray(result.map(row => row.category))
    return [...TEMPLATE_CATEGORIES, ...cats.filter(row => !TEMPLATE_CATEGORIES.includes(row))]
  }

  async function fetchTemplates() {
    const result = await TemplateService.templates()

    setTemplates(result)
    setCategories(extractCategories(result))

    return result.length > 0
  }

  function handleNavigateBack() {
    navigate(`/workspace/${workspaceId}/project/${projectId}/form/create`)
  }

  return (
    <Container navigateBackTitle={t('template.create')} onNavigateBack={handleNavigateBack}>
      <Flex>
        <Sidebar>
          <CategoryList className="scrollbar">
            <CategoryHeader>{t('integration.Categories')}</CategoryHeader>
            {categories.map((name, index) => (
              <CategoryItem key={index} name={name} />
            ))}
          </CategoryList>
        </Sidebar>

        <Body>
          <Heading>{t('template.Templates')}</Heading>
          <Request fetch={fetchTemplates} useCache={templates.length > 0}>
            {categories.map((category, index) => (
              <div key={index}>
                <StyledSubHeading id={category}>{category}</StyledSubHeading>
                <Flex wrap="wrap" style={{ marginLeft: -16, marginRight: -16 }}>
                  {templates
                    .filter(row => row.category === category)
                    .map(template => (
                      <TemplateItem
                        key={template.id}
                        workspaceId={workspaceId}
                        projectId={projectId}
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
}

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
    overflow-x: hidden;
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
