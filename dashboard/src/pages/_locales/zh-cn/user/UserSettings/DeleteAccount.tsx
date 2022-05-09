import { MobilePhoneCode } from '@/components'
import { UserService } from '@/service'
import { useStore } from '@/store'
import { clearAuthState, useAsyncEffect, useVisible } from '@/utils'
import { Button, Form, Input, Modal, notification, useForm } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

const VerifyPhoneNumber: FC<IModalProps> = observer(({ visible, onClose, onComplete }) => {
  const userStore = useStore('userStore')
  const { t } = useTranslation()

  async function handleFinish(values: IMapType) {
    await UserService.verifyDeletionCode(values.code)

    // Clear the auth state and logout the user
    setTimeout(() => {
      clearAuthState()
      window.location.href = '/login'
    }, 10_000)

    onComplete?.()
    onClose?.()
  }

  async function handleSendCode(data: any) {
    // TODO - 发送验证码
  }

  async function handleClick() {
    return true
  }

  useAsyncEffect(async () => {
    if (visible) {
      await UserService.sendDeletionCode()

      notification.success({
        title: `${t('user.settings.deletedAccount.sendEmail')} ${userStore.user.email}.`
      })
    }
  }, [visible])

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            {t('user.settings.deletedAccount.del')}
          </h1>
          <div className="space-y-2">
            <p className="mt-1 text-sm text-gray-500">
              {t('user.settings.deletedAccount.delText')}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {t('user.settings.deletedAccount.delSure')}
            </p>
          </div>
        </div>

        <Form.Custom
          submitText={t('user.settings.deletedAccount.delBottom')}
          submitOptions={{
            type: 'danger'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="code"
            label={t('user.settings.deletedAccount.delCode')}
            rules={[{ required: true }]}
          >
            <Input trailing={<MobilePhoneCode request={handleSendCode} onClick={handleClick} />} />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
})

const DeletionWarning: FC<IModalProps> = ({ visible }) => {
  const { t } = useTranslation()
  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title={t('user.settings.deletedAccount.delAccount')}
      maskClosable={false}
      description={
        <div className="space-y-2">
          <p>{t('user.settings.deletedAccount.delSendEmail')}</p>
          <p>{t('user.settings.deletedAccount.loggedOut')}</p>
        </div>
      }
    />
  )
}

export const DeleteAccount: FC = () => {
  const [verifyPhoneNumberVisible, openVerifyPhoneNumber, closeVerifyPhoneNumber] = useVisible()
  const [deletionWarningVisible, openDeletionWarning] = useVisible()
  const { t } = useTranslation()

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">
        {t('user.settings.deletedAccount.danger')}
      </div>
      <p className="mt-1 text-sm text-gray-500">{t('user.settings.deletedAccount.delText2')}</p>
      <div className="mt-3">
        <Button type="danger" onClick={openVerifyPhoneNumber}>
          {t('user.settings.deletedAccount.del')}
        </Button>
      </div>

      <VerifyPhoneNumber
        visible={verifyPhoneNumberVisible}
        onClose={closeVerifyPhoneNumber}
        onComplete={openDeletionWarning}
      />
      <DeletionWarning visible={deletionWarningVisible} />
    </div>
  )
}