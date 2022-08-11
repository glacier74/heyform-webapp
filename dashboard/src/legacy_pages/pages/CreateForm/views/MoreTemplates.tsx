import { useParam } from '@/utils'
import { Button } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const MoreTemplates: FC = () => {
  const { t } = useTranslation()
  const { workspaceId, projectId } = useParam()
  const navigate = useNavigate()

  function handlePreview() {
    navigate(`/workspace/${workspaceId}/project/${projectId}/templates`)
  }

  return (
    <Container>
      <Mask>
        <Text>Get access to all the templates of HeyForm</Text>
        <PreviewButton type="primary" size="small" block={true} onClick={handlePreview}>
          {t('Explore')}
        </PreviewButton>
      </Mask>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 218px;
  height: 236px;
  margin: 0 10px 20px 10px;
  background: #0252d7;
  border-radius: 3px;
  transition: all 150ms;

  &:hover {
    box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
  }
`

const Thumbnail = styled.div`
  img {
    width: 100%;
    height: 133px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  background: #0252d7;
  border-radius: 3px;
`

const Text = styled.div`
  margin-top: 30px;
  margin-bottom: 32px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.6;
`

const PreviewButton = styled(Button)`
  height: 40px;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 3px;
`
