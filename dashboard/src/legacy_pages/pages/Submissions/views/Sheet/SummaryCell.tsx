import type { CellRendererProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'

import { getCellStyle } from '@/legacy_pages/pages/Submissions/views/Sheet/utils'
import clsx from 'clsx'
import { memo } from 'react'

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'column'>

interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  row: SR
}

function SummaryCell<R, SR>({ column, row }: SummaryCellProps<R, SR>) {
  const { summaryFormatter: SummaryFormatter, summaryCellClass } = column
  const className = clsx(
    'heygrid-cell',
    {
      'heygrid-cell-frozen': column.frozen,
      'heygrid-cell-frozen-last': column.isLastFrozenColumn
    },
    typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass
  )

  return (
    <div className={className} style={getCellStyle(column)}>
      {SummaryFormatter && <SummaryFormatter column={column} row={row} />}
    </div>
  )
}

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element
