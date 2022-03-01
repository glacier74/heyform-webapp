import { FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { Button, ComponentProps, Flex, message } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

export const DeleteForm: FC<ComponentProps> = observer(({ ...restProps }) => {
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()

  const history = useHistory()
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
      history.replace(`/workspace/${workspaceId}/project/${projectId}`)
    } catch (err: any) {
      setLoading(false)
      console.error(err)
      message.error('Failed to delete the form')
    }
  }

  return (
    <Container {...restProps}>
      <Header>{t('Delete this Form')}</Header>
      <Body>
        <Description>
          {t(
            'Deleting the form will erase all traces of this form on our databases, including all the submissions.'
          )}
        </Description>
        <Button type="error" size="small" loading={loading} onClick={handleClick}>
          {t('Delete')}
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
