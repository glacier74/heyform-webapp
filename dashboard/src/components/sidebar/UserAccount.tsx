import { useStore } from '@/store'
import { clearAuthState } from '@/utils'
import { Dropdown, Menus } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

export const UserAccount: FC = observer(() => {
  const userStore = useStore('userStore')
  const appStore = useStore('appStore')

  function handleMenuClick(name?: IKeyType) {
    switch (name) {
      case 'accountSettings':
        appStore.isUserSettingsOpen = true
        break

      case 'logout':
        clearAuthState()
        window.location.href = '/login'
        break
    }
  }

  const Overlay = (
    <Menus className="bottom-12" onClick={handleMenuClick}>
      <Menus.Item name="accountSettings" label="Account settings" />
      <Menus.Item name="logout" label="Logout" />
      <Menus.Divider />
      <Menus.Item
        className="text-gray-400 hover:bg-transparent cursor-default"
        label={`Version ${import.meta.env.PACKAGE_VERSION}`}
      />
    </Menus>
  )

  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <Dropdown
        className="flex-shrink-0 group block w-full"
        placement="top-start"
        overlay={Overlay}
      >
        <div className="flex items-center cursor-pointer">
          <div>
            <img className="inline-block h-8 w-8 rounded-full" src={userStore.user.avatar} />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 truncate group-hover:text-gray-900">
              {userStore.user.name}
            </p>
            <p className="text-sm text-gray-500 group-hover:text-gray-700">View profile</p>
          </div>
        </div>
      </Dropdown>
    </div>
  )
})
