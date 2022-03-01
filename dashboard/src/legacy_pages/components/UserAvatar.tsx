import { clearAuthState, useStore } from '@/legacy_pages/utils'
import { Avatar, ComponentProps, Dropdown, Menu } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

export const UserAvatar: FC<ComponentProps> = observer(({ className, style }) => {
  const history = useHistory()
  const userStore = useStore('userStore')

  const DropdownOverlay = (
    <StyledMenu onClick={handleClick}>
      <Menu.Item name="profile">
        <span>My Profile</span>
      </Menu.Item>
      <Menu.Item name="help">
        <span>Help Center</span>
      </Menu.Item>
      <Menu.Item name="contact">
        <span>Contact Us</span>
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
        history.push(`/user/profile?next=${encodeURIComponent(window.location.pathname)}`)
        break

      case 'logout':
        clearAuthState()
        window.location.href = '/login'
        break
    }
  }

  return (
    <Container className={className} style={style}>
      <StyledDropdown
        placement="bottom-end"
        offset={{
          top: 14
        }}
        overlay={DropdownOverlay}
      >
        <StyledAvatar
          image={userStore.details?.avatar}
          text={userStore.details?.name}
          imageWidth={60}
          imageHeight={60}
          round={true}
        />
      </StyledDropdown>
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

const StyledDropdown = styled(Dropdown)`
  padding: 0;
  border: none;
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
