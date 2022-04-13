import { TemplateModal } from '@/legacy_pages/models'
import { getResizeImageUrl } from '@/legacy_pages/utils'
import { FC } from 'react'
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

  const imageUrl = getResizeImageUrl(
    template.themeSettings?.theme?.backgroundImage!,
    186 * 2,
    148 * 2
  )

  function handlePreview() {
    navigate(`/workspace/${workspaceId}/project/${projectId}/template/${template.id}`)
  }

  return (
    <Container onClick={handlePreview}>
      <Thumbnail background={template.themeSettings?.theme?.background}>
        {imageUrl && (
          <LazyLoad height={148} once>
            <img src={imageUrl} />
          </LazyLoad>
        )}
      </Thumbnail>
      <Name>{template.name}</Name>
      {/*<PreviewButton*/}
      {/*  type="primary"*/}
      {/*  size="small"*/}
      {/*  block={true}*/}
      {/*  onClick={handlePreview}*/}
      {/*>*/}
      {/*  Preview*/}
      {/*</PreviewButton>*/}
    </Container>
  )
}

const Name = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
  height: 40px;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  cursor: default;
`

// const PreviewButton = styled(Button)`
//   height: 40px;
//   border-radius: 15px;
// `

const Container = styled.div`
  position: relative;
  width: 218px;
  height: 236px;
  margin: 0 10px 20px 10px;
  padding: 16px;
  background: #ffffff;
  border-radius: 3px;
  transition: box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
  }
`

const Thumbnail = styled.div<{
  background?: string
}>`
  background: #fafbfc;

  &,
  img {
    width: 100%;
    height: 120px;
    border-radius: 3px;
  }

  img {
    object-fit: cover;
  }

  ${({ background, theme }) => `background: ${background ? background : theme.deepBackground}`};
`
