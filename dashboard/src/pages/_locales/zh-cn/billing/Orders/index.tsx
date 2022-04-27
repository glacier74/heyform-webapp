import { Async } from '@/components'
import type { InvoiceModel } from '@/models'
import { unitConversion } from '@/pages/_locales/zh-cn/billing/Subscription/views/UpgradePlan'
import { Skeleton } from '@/pages/audiences/Groups/Skeleton'
import { PaymentService } from '@/service'
import { useParam } from '@/utils'
import { CreditCardIcon } from '@heroicons/react/outline'
import { EmptyStates, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/types/table'
import { unixDate } from '@hpnp/utils/date'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BillingLayout } from '../views/BillingLayout'

const ORDER_STATUS = {
  0: 'billing.unpaid',
  1: 'billing.paid',
  2: 'billing.expired',
  3: 'billing.cancelled'
}

const Orders = () => {
  const { workspaceId } = useParam()
  const [orders, setOrders] = useState<InvoiceModel[]>([])
  const { t } = useTranslation()

  async function request() {
    const result = await PaymentService.orders(workspaceId)
    setOrders(result)
    return result.length > 0
  }

  // Table columns
  const columns: TableColumn<InvoiceModel>[] = [
    {
      key: 'paidAt',
      name: t('billing.BillDate'),
      render: record => unixDate(record.paidAt!).format('YYYY年MM月DD日')
    },
    {
      key: 'note',
      name: t('billing.ChargeTo')
    },
    {
      key: 'amount',
      name: t('billing.Amount'),
      render(record) {
        return '¥' + unitConversion(record.total)
      }
    },
    {
      key: 'status',
      name: t('billing.Status'),
      render(record) {
        return t(ORDER_STATUS[record.status])
      }
    }
  ]

  return (
    <BillingLayout>
      <Async
        request={request}
        deps={[]}
        skeleton={<Skeleton />}
        emptyState={
          <EmptyStates
            className="empty-states-fit"
            icon={<CreditCardIcon className="non-scaling-stroke" />}
            title={t('billing.billed')}
            description={t('billing.send')}
          />
        }
      >
        <Table<InvoiceModel> className="mt-8" columns={columns} data={orders} />
      </Async>
    </BillingLayout>
  )
}

export default Orders
