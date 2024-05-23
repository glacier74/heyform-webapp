import { Avatar, Dropdown, Menus } from '@heyforms/ui'
import { IconChevronRight } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { LOCALES_OPTIONS } from '@/consts'
import i18n from '@/locales'
import { useStore } from '@/store'
import { clearAuthState, cropImage } from '@/utils'

export const UserAccount: FC = observer(() => {
  const userStore = useStore('userStore')
  const appStore = useStore('appStore')
  const { t } = useTranslation()

  function handleMenuClick(name?: IKeyType) {
    switch (name) {
      case 'accountSettings':
        appStore.isUserSettingsOpen = true
        break

      case 'logout':
        clearAuthState()
        window.location.href = '/logout'
        break
    }
  }

  const Overlay = (
    <Menus className="bottom-12" onClick={handleMenuClick}>
      <Menus.Item value="accountSettings" label={t('other.labelList.Account')} />
      <Menus.Item
        className="sidebar-submenu !p-0"
        label={
          <div className="group relative">
            <button className="flex w-full items-center justify-between px-4 py-2">
              <span>{t('other.language')}</span>
              <IconChevronRight />
            </button>
            <Menus className="absolute left-[220px] -top-[96px] !my-0 hidden w-[140px] group-hover:block">
              {LOCALES_OPTIONS.map(row => (
                <Menus.Item
                  key={row.value}
                  label={row.label}
                  isChecked={i18n.language === row.value}
                  onClick={() => i18n.changeLanguage(row.value)}
                />
              ))}
            </Menus>
          </div>
        }
      />
      <Menus.Item value="logout" label={t('other.labelList.Logout')} />
      <Menus.Divider />
      <Menus.Item
        className="cursor-default text-slate-400 hover:bg-transparent"
        label={`${t('other.labelList.Version')} ${import.meta.env.PACKAGE_VERSION}`}
      />
    </Menus>
  )

  return (
    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
      <Dropdown
        className="group block w-full flex-shrink-0"
        placement="top-start"
        overlay={Overlay}
      >
        <div className="flex cursor-pointer items-center">
          <div>
            <Avatar
              className="inline-block h-8 w-8"
              src={cropImage(userStore.user.avatar, 100, 100)}
              circular
              rounded
            />
          </div>
          <div className="ml-3">
            <p className="truncate text-sm font-medium text-slate-700 group-hover:text-slate-900">
              {userStore.user.name}
            </p>
            <p className="text-xs text-slate-500 group-hover:text-slate-700">
              {t('other.labelList.View')}
            </p>
          </div>
        </div>
      </Dropdown>
    </div>
  )
})
