import { FormNavbarSharing } from '@/legacy_pages/components/FormNavbarSharing'
import { UserAvatar } from '@/legacy_pages/components/UserAvatar'
import { useStore } from '@/legacy_pages/utils'
import { useParam } from '@/utils'
import { Button, ComponentProps, Flex } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowLeftIcon } from './Icons'

export const FormNavbar: FC<ComponentProps> = observer(() => {
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const formStore = useStore('formStore')
  const navigate = useNavigate()

  function toProject() {
    navigate(`/workspace/${workspaceId}/project/${projectId}`)
  }

  return (
    <Container align="center" justify="space-between">
      <Left align="center">
        <BackButton icon={<ArrowLeftIcon />} onClick={toProject}>
          {workspaceStore.project?.name}
        </BackButton>
        <Spacer>/</Spacer>
        {formStore.current?.name}
      </Left>
      <Nav role="navigation">
        <NavLink to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/create`}>
          {t('Create')}
        </NavLink>
        <NavLink to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/connect`}>
          {t('Connect')}
        </NavLink>
        <NavLink to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/share`}>
          {t('Share')}
        </NavLink>
        <NavLink to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results`}>
          {t('Results')}
        </NavLink>
        <NavLink to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/settings`}>
          {t('Settings')}
        </NavLink>
      </Nav>
      <Right>
        <FormNavbarSharing form={formStore.current} />
        <UserAvatar />
      </Right>
    </Container>
  )
})

const Container = styled(Flex)`
  height: 60px;
  padding: 0 24px 0 12px;
  background: #fff;
  box-shadow: #f3f3f3 0px -1px inset;
  z-index: 9;

  @media print {
    display: none;
  }
`

const Left = styled(Flex)`
  width: 33.33%;
`

const Spacer = styled.div`
  margin-left: 8px;
  margin-right: 4px;
  color: #b0b7c3;
`

const Nav = styled(Flex)`
  a {
    display: inline-block;
    margin: 0 8px;
    color: ${props => props.theme.text};

    &:hover,
    &.active {
      color: ${props => props.theme.primary};
    }
  }
`

const Right = styled(Flex)`
  width: 33.33%;
  justify-content: flex-end;
`

const BackButton = styled(Button)`
  background: none;
  border: none;
  padding: 0;
  color: #4e5d78;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #377dff;
  }
`

const FormNameInput = styled.input`
  padding: 4px 12px;
  outline: none;
  border: none;
  background: none;
  border-radius: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:hover,
  &:focus {
    background: #f3f3f3;
  }

  &:focus {
    cursor: text;
  }
`
