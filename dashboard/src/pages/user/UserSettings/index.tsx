import { Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { Account } from './Account'
import { Avatar } from './Avatar'
import { EmailAddress } from './EmailAddress'
import { Password } from './Password'
import { UserName } from './UserName'

const UserSettings: FC<IModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Changes to account settings will apply to all of your workspaces.
          </p>
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
        <Account />
      </div>
    </Modal>
  )
}

export default UserSettings
