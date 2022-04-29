import { useStore } from '@/store'
import { Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from './Avatar'
import { DeleteAccount } from './DeleteAccount'
import { EmailAddress } from './EmailAddress'
import { Password } from './Password'
import { UserName } from './UserName'

const UserSettings: FC = () => {
  const appStore = useStore('appStore')
  const { t } = useTranslation()

  function handleClose() {
    appStore.isUserSettingsOpen = false
  }

  return (
    <Modal visible={appStore.isUserSettingsOpen} onClose={handleClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            {t('user.settings.account')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t('user.settings.accountText')}</p>
        </div>

        {/* User avatar */}
        <Avatar />

        {/* User name */}
        <UserName />

        {/* Email address */}
        <EmailAddress />

        {/* Password */}
        <Password />

        {/* Delete account */}
        <DeleteAccount />
      </div>
    </Modal>
  )
}

export default observer(UserSettings)
