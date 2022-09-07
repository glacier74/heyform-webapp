import { AvatarText, IconText, WorkspaceLink } from '@/legacy_pages/components'
import { AddIcon, LogoutIcon, SettingsIcon, UserIcon } from '@/legacy_pages/components/Icons'
import { clearAuthState, useStore } from '@/legacy_pages/utils'
import { useParam } from '@/utils'
import { Dropdown, Flex, Menu } from '@heyui/component'
import { ArrowDownSIcon } from '@heyui/icon'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const SwitchWorkspace: FC = observer(() => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  function handleClick(name: any) {
    switch (name) {
      case 'createWorkspace':
        return navigate('/workspace/create')

      case 'workspaceSettings':
        return navigate(`/workspace/${workspaceId}/settings`)

      case 'accountSettings':
        return navigate(`/user/profile?next=${encodeURIComponent(window.location.pathname)}`)

      case 'logout':
        clearAuthState()
        window.location.href = '/login'
        return
    }
  }

  const Overlay = (
    <StyledMenu checkmark={true} markAlign="right" onClick={handleClick}>
      {workspaceStore.workspaces.map((row, index) => (
        <WorkspaceLink
          key={index}
          workspace={row}
          activeWorkspaceId={workspaceStore.activeWorkspaceId}
        />
      ))}
      <Menu.Divider />
      {workspaceStore.workspace?.isOwner && (
        <StyledMenuItem name="workspaceSettings">
          <IconText icon={<SettingsIcon />} text={t('Workspace Settings')} />
        </StyledMenuItem>
      )}
      <StyledMenuItem name="createWorkspace">
        <IconText icon={<AddIcon />} text={t('Create Workspace')} />
      </StyledMenuItem>
      <Menu.Divider />
      <StyledMenuItem name="accountSettings">
        <IconText icon={<UserIcon />} text={t('Account Settings')} />
      </StyledMenuItem>
      <StyledMenuItem name="logout">
        <IconText icon={<LogoutIcon />} text={t('Logout')} />
      </StyledMenuItem>
      <Menu.Divider />
      <Version>
        {t('Version')} {import.meta.env.PACKAGE_VERSION}
      </Version>
    </StyledMenu>
  )

  return (
    <Container align="center">
      <StyledDropdown placement="bottom-start" overlay={Overlay} offset={{ top: -40 }}>
        <StyledAvatarText
          text={workspaceStore.workspace?.name}
          image={workspaceStore.workspace?.avatar}
          width={160}
          height={160}
        />
        <ArrowDownSIcon />
      </StyledDropdown>
    </Container>
  )
})

const Container = styled(Flex)`
  margin-top: 10px;
  margin-bottom: 10px;
`

const StyledDropdown = styled(Dropdown)`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  user-select: none;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background: #fafbfc;
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 24px;
    height: 24px;
    padding: 2px;
    background: #fafbfc;
    color: #8a94a6;
    border-radius: 50%;
  }
`

const StyledAvatarText = styled(AvatarText)`
  flex: 1;
  color: #4e5d78;

  .avatar {
    border-radius: 50%;
    line-height: 24px;
    font-weight: 500;
    color: #8a94a6;
    background: #fafbfc;

    &,
    .hey-image {
      width: 24px;
      height: 24px;
    }
  }

  .text {
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const StyledMenu = styled(Menu)`
  min-width: 300px;
  max-height: calc(-80px + 100vh);
  padding: 8px;
  background: #ffffff;
  border: none;
  box-shadow: 0 3px 12px 2px rgb(55 60 67 / 12%);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .hey-menu-item {
    padding-left: 12px;
    padding-right: 12px;
  }

  .hey-menu-divider {
    margin: 8px 12px;
    padding-top: 1px;
    height: 0;
    background-color: #f3f3f3;
  }
`

const StyledMenuItem = styled(Menu.Item)`
  height: 36px;
  color: #4e5d78;

  &:hover {
    background: #fafbfc;
  }

  svg {
    color: #8a94a6;
  }
`

const Version = styled.div`
  padding: 8px 20px;
  color: #b0b7c3;
`
