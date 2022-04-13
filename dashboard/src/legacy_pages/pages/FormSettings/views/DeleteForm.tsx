import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { Button, ComponentProps, Flex, message } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const DeleteForm: FC<ComponentProps> = observer(({ ...restProps }) => {
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()

  const navigate = useNavigate()
  const workspaceStore = useStore('workspaceStore')
  const formStore = useStore('formStore')
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await FormService.moveToTrash(formId)
      workspaceStore.deleteForm(workspaceId, formId)
      formStore.selectForm(undefined)
      navigate(`/workspace/${workspaceId}/project/${projectId}`, {
        replace: true
      })
    } catch (err: any) {
      setLoading(false)
      console.error(err)
      message.error('Failed to delete the form')
    }
  }

  return (
    <Container {...restProps}>
      <Header>{t('formSettings.deleteForm')}</Header>
      <Body>
        <Description>{t('formSettings.deleteFormText')}</Description>
        <Button type="error" size="small" loading={loading} onClick={handleClick}>
          {t('submissions.Delete')}
        </Button>
      </Body>
    </Container>
  )
})

const Container = styled.div`
  margin-bottom: 24px;
`

const Header = styled.div`
  color: #4e5d78;
`

const Body = styled(Flex)`
  margin-top: 4px;
`

const Description = styled.div`
  flex: 1;
  margin-right: 16px;
  color: #8a94a6;
  font-size: 13px;
`
