import { TemplateModal } from '@/legacy_pages/models'
import { getResizeImageUrl } from '@/legacy_pages/utils'
import { TemplateService } from '@/service'
import { Button, Flex, message } from '@heyui/component'
import { FC, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface TemplateItemProps {
  workspaceId: string
  projectId: string
  template: TemplateModal
}

export const TemplateItem: FC<TemplateItemProps> = ({ workspaceId, projectId, template }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const imageUrl = getResizeImageUrl(template.themeSettings?.theme?.backgroundImage!)

  function handlePreview() {
    navigate(`/templates/${template.id}`)
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

  return (
    <Container isLoading={loading}>
      <Thumbnail background={template.themeSettings?.theme?.background}>
        {imageUrl && (
          <LazyLoad height={120} once>
            <img src={imageUrl} />
          </LazyLoad>
        )}
      </Thumbnail>
      <Name>{template.name}</Name>
      <Footer align="center" justify="space-between">
        <PreviewButton type="primary" size="small" ghost={true} onClick={handlePreview}>
          Preview
        </PreviewButton>
        <UseButton
          type="primary"
          size="small"
          loading={loading}
          disabled={loading}
          onClick={handleUse}
        >
          Use
        </UseButton>
      </Footer>
    </Container>
  )
}

const Name = styled.div`
  padding: 16px;
  cursor: default;
  background: ${props => props.theme.white};
  transition: transform 150ms;
`

const Footer = styled(Flex)`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px;
  transform: translateY(10px);
  background: ${props => props.theme.white};
  opacity: 0;
  pointer-events: none;
  transition: transform 150ms, opacity 150ms;
`

const PreviewButton = styled(Button)`
  width: 70px;
  cursor: pointer;
`

const UseButton = styled(PreviewButton)`
  margin-left: 12px;
`

const Container = styled.div<{
  isLoading?: boolean
}>`
  position: relative;
  width: 204px;
  height: 200px;
  margin: 0 30px 30px 0;
  background: ${props => props.theme.white};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: rgb(192 192 192 / 25%) 0px 2px 4px;
  transition: all 150ms;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

    ${Name} {
      transform: translateY(-60%);
    }

    ${Footer} {
      transform: translateY(0px);
      opacity: 1;
      pointer-events: auto;
    }
  }

  ${props =>
    props.isLoading &&
    `
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

    ${Name} {
      transform: translateY(-50%);
    }

    ${Footer} {
      transform: translateY(0px);
      opacity: 1;
      pointer-events: auto;
    }

    ${UseButton} {
      padding-left: 0;
      padding-right: 0;
    }
  `};
`

const Thumbnail = styled.div<{
  background?: string
}>`
  margin: 2px auto;

  &,
  img {
    width: 200px;
    height: 120px;
    border-radius: ${props => props.theme.borderRadius};
  }

  img {
    object-fit: cover;
  }

  ${({ background, theme }) => `background: ${background ? background : theme.deepBackground}`};
`
