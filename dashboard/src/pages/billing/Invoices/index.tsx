import { Async } from '@/components'
import type { InvoiceModel } from '@/models'
import { Skeleton } from '@/pages/audiences/Groups/Skeleton'
import { PaymentService } from '@/service'
import { useParam } from '@/utils'
import { CreditCardIcon } from '@heroicons/react/outline'
import { EmptyStates, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { date } from '@hpnp/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BillingLayout } from '../views/BillingLayout'

const Invoices = () => {
  const { workspaceId } = useParam()
  const [invoices, setInvoices] = useState<InvoiceModel[]>([])
  const { t } = useTranslation()

  async function request() {
    const result = await PaymentService.invoices(workspaceId)
    setInvoices(result)
    return result.length > 0
  }

  // Table columns
  const columns: TableColumn<InvoiceModel>[] = [
    {
      key: 'paidAt',
      name: 'Bill date',
      render: record => date(record.paidAt).format('MMMM DD, YYYY')
    },
    {
      key: 'note',
      name: 'Charge to'
    },
    {
      key: 'amount',
      name: 'Amount',
      render(record) {
        return '$' + (record.total / 100).toFixed(2)
      }
    },
    {
      key: 'invoice',
      name: '',
      render(record) {
        return (
          <a className="text-blue-600" href={record.pdfUrl!} target="_blank" rel="noreferrer">
            {t('billing.View')}
          </a>
        )
      }
    }
  ]

  return (
    <BillingLayout>
      <Async
        request={request}
        deps={[]}
        skeleton={<Skeleton/>}
        emptyState={
          <EmptyStates
            className="empty-states-fit"
            icon={<CreditCardIcon className="non-scaling-stroke"/>}
            title={t('billing.billed')}
            description={t('billing.send')}
          />
        }
      >
        <Table<InvoiceModel> className="mt-8" columns={columns} data={invoices}/>
      </Async>
    </BillingLayout>
  )
}

export default Invoices
