import clsx from 'clsx'
import type { ReactNode } from 'react'

export interface TableColumn<T extends IMapType> {
  key: string
  name: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  scOnly?: boolean
  render?: (record: T, column: TableColumn<T>) => ReactNode
}

export interface TableProps<T> extends IComponentProps {
  columns: TableColumn<T>[]
  data?: T[]
  onRowClick?: (record: T) => void
}

function Table<T extends IMapType>({
  className,
  columns,
  data = [],
  onRowClick,
  ...restProps
}: TableProps<T>) {
  function handleRowClick(record: T) {
    onRowClick && onRowClick(record)
  }

  return (
    <div className={clsx('table-container', className)}>
      <table className="table" {...restProps}>
        <colgroup>
          {columns.map(column => (
            <col key={column.key} width={column.width} />
          ))}
        </colgroup>
        <thead className="table-head">
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                className={clsx({
                  [`table-cell-${column.align}`]: column.align
                })}
              >
                <span
                  className={clsx({
                    'sr-only': column.scOnly
                  })}
                >
                  {column.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.map(record => (
            <tr key={record.id} onClick={() => handleRowClick(record)}>
              {columns.map(column => (
                <td
                  key={column.key}
                  className={clsx({
                    [`table-cell-${column.align}`]: column.align
                  })}
                >
                  {column.render ? column.render(record, column) : record[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
