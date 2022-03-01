import type { DataGridProps } from '@/legacy_pages/pages/Submissions/views/Sheet/DataGrid'

import HeaderCell from '@/legacy_pages/pages/Submissions/views/Sheet/HeaderCell'
import type { CalculatedColumn } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { assertIsValidKeyGetter } from '@/legacy_pages/pages/Submissions/views/Sheet/utils'
import { memo, useCallback } from 'react'

type SharedDataGridProps<R, SR> = Pick<
  DataGridProps<R, SR>,
  'rows' | 'onSelectedRowsChange' | 'sortColumn' | 'sortDirection' | 'onSort' | 'rowKeyGetter'
>

export interface HeaderRowProps<R, SR> extends SharedDataGridProps<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[]
  totalFrozenColumnWidth: number
  allRowsSelected: boolean
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void
}

function HeaderRow<R, SR>({
  columns,
  rows,
  rowKeyGetter,
  onSelectedRowsChange,
  totalFrozenColumnWidth,
  allRowsSelected,
  onColumnResize,
  sortColumn,
  sortDirection,
  onSort
}: HeaderRowProps<R, SR>) {
  const handleAllRowsSelectionChange = useCallback(
    (checked: boolean) => {
      if (!onSelectedRowsChange) return

      assertIsValidKeyGetter(rowKeyGetter)

      const newSelectedRows = new Set<React.Key>(checked ? rows.map(rowKeyGetter) : undefined)
      onSelectedRowsChange(newSelectedRows)
    },
    [onSelectedRowsChange, rows, rowKeyGetter]
  )

  function renderCell(column: CalculatedColumn<R, SR>) {
    return (
      <HeaderCell<R, SR>
        key={column.key}
        column={column}
        onResize={onColumnResize}
        allRowsSelected={allRowsSelected}
        onAllRowsSelectionChange={handleAllRowsSelectionChange}
        onSort={onSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    )
  }

  return (
    <div role="row" className="heygrid-header-row">
      <div
        className="heygrid-header-frozen-pane"
        style={{
          width: totalFrozenColumnWidth
        }}
      >
        {columns.filter(column => column.frozen).map(renderCell)}
      </div>
      {columns.filter(column => !column.frozen).map(renderCell)}
    </div>
  )
}

export default memo(HeaderRow) as <R, SR>(props: HeaderRowProps<R, SR>) => JSX.Element
