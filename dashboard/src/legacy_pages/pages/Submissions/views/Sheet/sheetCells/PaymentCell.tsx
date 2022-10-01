import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { ServerSidePaymentValue } from '@heyforms/shared-types-enums'
import { FC } from 'react'
import styled from 'styled-components'
import Big from 'big.js'
import { CURRENCY_SYMBOLS } from '@heyforms/answer-utils'
import { isValid } from '@hpnp/utils/helper'
import { ClockIcon } from '@heroicons/react/solid'
import { CheckIcon, ExternalLinkIcon } from '@heroicons/react/outline'

export const PaymentCell: FC<SheetCellProps> = ({ column, row }) => {
  const value: ServerSidePaymentValue = row[column.key]
  console.log(value)
  const amount = value.amount || 0
  const amountString = CURRENCY_SYMBOLS[value.currency] + Big(amount).div(100).toFixed(2)
  const isCompleted = isValid(value.paymentIntentId)

  return (
    <Container className="heygrid-cell-text">
      {value && (
        <div className="flex items-center h-full">
          <div className="flex flex-1 items-center h-full truncate overflow-hidden">
            {isCompleted ? (
              <div className="flex items-center h-6 pl-1 pr-2 text-sm bg-green-100 text-green-800 rounded">
                <CheckIcon className="w-4 h-4" />
                <span className="ml-1">Succeeded</span>
              </div>
            ) : (
              <div className="flex items-center h-6 pl-1 pr-2 text-sm bg-gray-100 text-slate-800 rounded">
                <ClockIcon className="w-4 h-4" />
                <span className="ml-1">Incomplete</span>
              </div>
            )}
            <div className="ml-2">{amountString}</div>
          </div>
          {isCompleted && (
            <div className="ml-2">
              <a href={value.receiptUrl} target="_blank">
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
`
