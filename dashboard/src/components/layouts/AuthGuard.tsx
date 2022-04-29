import { PlanModal } from '@/components'
import { Locale } from '@/locales'
import ZhUserSettings from '@/pages/_locales/zh-cn/user/UserSettings'
import UserSettings from '@/pages/user/UserSettings'
import { UserService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useRouter, useVisible } from '@/utils'
import { Modal, notification } from '@heyforms/ui'
import { timestamp } from '@hpnp/utils'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'

const DeletionWarning: FC = observer(() => {
  const userStore = useStore('userStore')
  const [visible, handleOpen, handleClose] = useVisible()
  const [loading, setLoading] = useState(false)
  const remainingTime = useMemo(() => {
    return Math.ceil((userStore.user.deletionScheduledAt! - timestamp()) / 3600)
  }, [userStore.user.deletionScheduledAt])

  async function handleConfirm() {
    setLoading(true)

    try {
      await UserService.cancelDeletion()

      userStore.update({
        isDeletionScheduled: false,
        deletionScheduledAt: 0
      })

      notification.success({
        title: 'Your account is no longer scheduled for deletion'
      })

      handleClose()
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    if (userStore.user.isDeletionScheduled) {
      handleOpen()
    } else {
      handleClose()
    }
  }, [userStore.user.isDeletionScheduled])

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title="Your account has been scheduled for deletion"
      description={
        <div className="space-y-2">
          <p>
            All of your account data, including but not limited to workspaces, projects, forms and
            submissions will be permanently deleted within {remainingTime} hours of the deletion
            request.
          </p>
          <p>If this was done in error, you can cancel the deletion of your account below.</p>
        </div>
      }
      confirmLabel="Cancel scheduled deletion"
      confirmLoading={loading}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  )
})

export const AuthGuard: FC<IComponentProps> = ({ children }) => {
  const router = useRouter()
  const userStore = useStore('userStore')

  useAsyncEffect(async () => {
    const result = await UserService.userDetail()
    userStore.setUser(result)

    if (!result.isEmailVerified) {
      router.push('/verify-email')
    }
  }, [])

  return (
    <>
      {children}

      {/* Popup a modal to warning the user who has scheduled account deletion */}
      <DeletionWarning />

      {/* Popup a plan modal when user going to access features of premium plans */}
      <PlanModal />

      {/* User settings popup */}
      {Locale.isZhCn ? <ZhUserSettings /> : <UserSettings />}
    </>
  )
}
