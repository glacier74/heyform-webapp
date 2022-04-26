import { AlipayIcon, WechatPayIcon } from '@/components'
import { ZhCnPaymentMethodEnum } from '@/models'
import { Switch } from '@heyforms/ui'
import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface PaymentMethodSwitchProps {
  value: ZhCnPaymentMethodEnum
  onChange: (paymentMethod: ZhCnPaymentMethodEnum) => void
}

export const PaymentMethodSwitch: FC<PaymentMethodSwitchProps> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const WechatPayLabel = (
    <div className="flex items-center">
      <WechatPayIcon className="w-5 h-5" style={{ color: '#09BB07' }} />
      <span className="ml-2">{t('billing.wechatPay')}</span>
    </div>
  )

  const AlipayLabel = (
    <div className="flex items-center">
      <AlipayIcon className="w-5 h-5" style={{ color: '#226BF3' }} />
      <span className="ml-2">{t('billing.alipay')}</span>
    </div>
  )

  return (
    <div className="flex justify-between items-center text-sm text-gray-500">
      <span>{t('billing.PaymentMethod')}</span>
      <Switch.Group
        className="text-sm"
        value={value}
        options={
          [
            { value: ZhCnPaymentMethodEnum.WECHAT_PAY, label: WechatPayLabel as ReactNode },
            { value: ZhCnPaymentMethodEnum.ALIPAY, label: AlipayLabel as ReactNode }
          ] as any
        }
        onChange={onChange as any}
      />
    </div>
  )
}
