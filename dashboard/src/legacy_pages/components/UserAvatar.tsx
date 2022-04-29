import { clearAuthState, useStore } from '@/legacy_pages/utils'
import { Avatar, Dropdown } from '@heyforms/ui'
import { ComponentProps, Menu } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const UserAvatar: FC<ComponentProps> = observer(({ className, style }) => {
  const navigate = useNavigate()
  const userStore = useStore('userStore')
  const appStore = useStore('appStore')

  const DropdownOverlay = (
    <StyledMenu onClick={handleClick}>
      <Menu.Item name="profile">
        <span>Account settings</span>
      </Menu.Item>
      <Menu.Item name="help">
        <span>Help center</span>
      </Menu.Item>
      <Menu.Item name="contact">
        <span>Contact us</span>
      </Menu.Item>
      <VersionItem>
        <span>Version {import.meta.env.PACKAGE_VERSION}</span>
      </VersionItem>
      <Menu.Divider />
      <Menu.Item name="logout" type="error" align="center">
        <span>Logout</span>
      </Menu.Item>
    </StyledMenu>
  )

  function handleClick(name: any) {
    switch (name) {
      case 'help':
        window.open('https://help.heyform.net')
        break

      case 'contact':
        window.open('https://heyform.net/contact')
        break

      case 'profile':
        appStore.isUserSettingsOpen = true
        break

      case 'logout':
        clearAuthState()
        window.location.href = '/login'
        break
    }
  }

  return (
    <Container className={className} style={style}>
      <Dropdown placement="bottom-end" overlay={DropdownOverlay}>
        <span className="p-1 cursor-pointer">
          <Avatar className="inline-block h-8 w-8 rounded-full" src={userStore.user.avatar} />
        </span>
      </Dropdown>
    </Container>
  )
})

const Container = styled.div`
  line-height: 1;
`

const StyledAvatar = styled(Avatar)`
  margin-right: 0;

  &,
  .hey-image {
    width: 32px;
    height: 32px;
  }
`

const StyledMenu = styled(Menu)`
  width: 220px;

  .hey-menu-item,
  .hey-menu-divider {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
`

const StyledMenuItem = styled(Menu.Item)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 24px 0;
  cursor: default;

  &:hover {
    background: ${props => props.theme.white};
  }

  ${StyledAvatar} {
    margin-bottom: 8px;

    &,
    .hey-image {
      width: 48px;
      height: 48px;
    }
  }
`

const VersionItem = styled.div`
  padding: 0 20px !important;
  height: 32px;
  line-height: 32px;
  color: ${props => props.theme.disabled};
`
