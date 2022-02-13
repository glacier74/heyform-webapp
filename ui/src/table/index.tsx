import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

export interface TableColumn {
  key: string
  name: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  scOnly?: boolean
  render?: (row: IMapType, column: TableColumn) => ReactNode
}

export interface TableProps extends IComponentProps {
  columns: TableColumn[]
  data?: IMapType[]
}

const Table: FC<TableProps> = ({ className, columns, data = [], ...restProps }) => {
  return (
    <table className={clsx('table', className)} {...restProps}>
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
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(column => (
              <td
                key={column.key}
                className={clsx({
                  [`table-cell-${column.align}`]: column.align
                })}
              >
                {column.render ? column.render(row, column) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
