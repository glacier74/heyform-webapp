import type { DataGridProps } from '@/legacy_pages/pages/Submissions/views/Sheet/DataGrid'
import type { CalculatedColumn, Filters } from '@/legacy_pages/pages/Submissions/views/Sheet/types'

import { getCellStyle } from '@/legacy_pages/pages/Submissions/views/Sheet/utils'
import clsx from 'clsx'
import { memo } from 'react'

type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, SR>, 'filters' | 'onFiltersChange'>

interface FilterRowProps<R, SR> extends SharedDataGridProps<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[]
}

function FilterRow<R, SR>({ columns, filters, onFiltersChange }: FilterRowProps<R, SR>) {
  function onChange(key: string, value: unknown) {
    const newFilters: Filters = { ...filters }
    newFilters[key] = value
    onFiltersChange?.(newFilters)
  }

  return (
    <div className="heygrid-filter-row">
      {columns.map(column => {
        const { key } = column
        const className = clsx('heygrid-cell', {
          'heygrid-cell-frozen': column.frozen,
          'heygrid-cell-frozen-last': column.isLastFrozenColumn
        })

        return (
          <div key={key} className={className} style={getCellStyle(column)}>
            {column.filterRenderer && (
              <column.filterRenderer
                column={column}
                value={filters?.[column.key]}
                onChange={value => onChange(key, value)}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default memo(FilterRow) as <R, SR>(props: FilterRowProps<R, SR>) => JSX.Element
