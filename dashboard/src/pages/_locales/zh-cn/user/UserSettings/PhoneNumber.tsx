import { MobilePhoneCode } from '@/components'
import { useStore } from '@/store'
import { isPhoneNumber, useVisible } from '@/utils'
import { Button, Form, Input, Modal, useForm } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SendCodeProps extends Omit<IModalProps, 'onComplete'> {
  onComplete?: (values: any) => void
}

export const SendCode: FC<SendCodeProps> = ({ visible, onClose, onComplete }) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [phoneNumber, setPhoneNumber] = useState<string>()

  async function handleFinish(values: any) {
    // TODO - 更新手机号码
    onComplete?.(values)
  }

  function handleValuesChange(_: any, values: any) {
    setPhoneNumber(values.phoneNumber)
  }

  async function handleSendCode(data: any) {
    // TODO - 发送验证码
  }

  async function handleClick() {
    try {
      await form.validateFields(['phoneNumber'])
    } catch (err) {
      return false
    }

    return true
  }

  const handleSendCodeCallback = useCallback(handleSendCode, [phoneNumber])
  const handleClickCallback = useCallback(handleClick, [])

  const MemoMobilePhoneCode = (
    <MobilePhoneCode request={handleSendCodeCallback} onClick={handleClickCallback} />
  )

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            {t('user.settings.phoneNumber.change')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t('user.settings.phoneNumber.description')}</p>
        </div>

        <Form.Custom
          form={form}
          submitText={t('user.update')}
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            name="phoneNumber"
            label={t('user.newPhoneNumber')}
            rules={[
              {
                required: true,
                validator: async (rule, value) => {
                  if (!isPhoneNumber(value)) {
                    throw new Error(rule.message as string)
                  }
                },
                message: t('login.PhoneNumberRequired')
              }
            ]}
          >
            <Input type="tel" trailing={MemoMobilePhoneCode} />
          </Form.Item>

          <Form.Item
            name="code"
            label={t('login.Code')}
            rules={[{ required: true, message: t('login.CodeRequired') }]}
          >
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export const PhoneNumber: FC = observer(() => {
  const userStore = useStore('userStore')
  const [sendCodeVisible, openSendCode, closeSendCode] = useVisible()
  const { t } = useTranslation()

  function handleSendComplete(values: any) {
    userStore.update({
      phoneNumber: values.phoneNumber
    })
  }

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">{t('user.phoneNumber')}</div>
      <p className="mt-1 text-sm text-gray-500">
        <span>{userStore.user.phoneNumber}</span>
        <Button.Link className="ml-2 text-blue-500" onClick={openSendCode}>
          {t('user.settings.phoneNumber.change')}
        </Button.Link>
      </p>

      <SendCode visible={sendCodeVisible} onClose={closeSendCode} onComplete={handleSendComplete} />
    </div>
  )
})
