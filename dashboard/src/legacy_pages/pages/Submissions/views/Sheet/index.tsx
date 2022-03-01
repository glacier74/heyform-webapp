import { InternalColumnKindEnum } from '@/legacy_pages/constants'
import { FieldKindEnum, STATEMENT_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { copyObjectValues } from '@hpnp/utils/object'
import { FC, useEffect, useRef, useState } from 'react'
import { SelectColumn } from './Columns'
import DataGrid, { DataGridHandle } from './DataGrid'
import { useLatestFunc } from './hooks'
import { SheetCell } from './sheetCells'
import { SheetHeaderAddCell } from './SheetHeaderAddCell'
import { SheetHeaderCell } from './SheetHeaderCell'
import { SheetRowModal } from './SheetRowModal'
import { Column, ColumnOptions, SheetColumn, SheetProps } from './types'

export const Sheet: FC<SheetProps> = ({
  className,
  style,
  loading,
  width = 200,
  formFields,
  selectedRows,
  onSelectedRowsChange,
  submissions,
  onColumnResize,
  onColumnHide,
  onColumnPin,
  onColumnUnpin,
  onColumnAdd,
  onColumnUpdate,
  onColumnDelete,
  onCellValueChange
}) => {
  const dataGridRef = useRef<DataGridHandle | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [rowIdx, setRowIdx] = useState(0)
  const [expandRow, setExpandRow] = useState<Record<string, any> | null>(null)

  const [columns, setColumns] = useState<Column<any>[]>([])
  const [rows, setRows] = useState<any[]>([])

  function handleColumnResize(column: SheetColumn, width: number) {
    setColumns(columns =>
      columns.map((col: any) => {
        if (col.key === column.key) {
          col.width = width
          onColumnResize!(column, width)
        }
        return col
      })
    )
  }

  function handleRowExpand(rowIdx: number, row: Record<string, any>) {
    setModalVisible(true)
    setRowIdx(rowIdx)
    setExpandRow(row)
  }

  function handleCellValueChange(rowIdx: number, column: SheetColumn, value: any) {
    onCellValueChange && onCellValueChange(rowIdx, column, value)

    setRows(rows => {
      return rows.map((row, index) => {
        if (index === rowIdx) {
          return {
            ...row,
            [column.key]: value
          }
        }
        return row
      })
    })

    if (column.kind === FieldKindEnum.CUSTOM_SINGLE) {
      dataGridRef.current?.deselectCell()
    }
  }

  function handleColumnPin(column: SheetColumn) {
    setColumns(columns =>
      columns.map((col: any) => {
        if (col.key === column.key) {
          col.frozen = true
          onColumnPin!(col)
        }
        return col
      })
    )
  }

  function handleColumnUnpin(column: SheetColumn) {
    setColumns(columns =>
      columns.map((col: any) => {
        if (col.key === column.key) {
          col.frozen = false
          onColumnUnpin!(col)
        }
        return col
      })
    )
  }

  function handleColumnHide(column: SheetColumn) {
    setColumns(columns => columns.filter(col => col.key !== column.key))
    onColumnHide!(column)
  }

  function cellHeaderRenderer(props: any) {
    return (
      <SheetHeaderCell
        {...props}
        onColumnPin={columnPin}
        onColumnUnpin={columnUnpin}
        onColumnHide={columnHide}
        onColumnDelete={handleColumnDelete}
        onColumnOptionsUpdate={handleColumnOptionsUpdate}
      />
    )
  }

  function cellFormatter(props: any) {
    return (
      <SheetCell
        rowIdx={props.rowIdx}
        row={props.row}
        column={props.column}
        isCellSelected={props.isCellSelected}
        onCellValueChange={cellValueChange}
      />
    )
  }

  async function handleColumnAdd(column: SheetColumn, options: ColumnOptions) {
    column.name = options.name!
    column.kind = options.kind!
    column.properties!.choices = options.choices!
    column.headerRenderer = cellHeaderRenderer
    column.formatter = cellFormatter

    setColumns(columns => {
      return [...columns.slice(0, columns.length - 1), column, ...columns.slice(-1)]
    })

    await onColumnAdd!(column, options)
  }

  async function handleColumnOptionsUpdate(column: SheetColumn, options: ColumnOptions) {
    setColumns(columns =>
      columns.map((col: any) => {
        if (col.key === column.key) {
          copyObjectValues(options, col, ['name', 'kind', ['choices', 'properties.choices']])
        }
        return col
      })
    )

    await onColumnUpdate!(column, options)
  }

  function handleColumnDelete(column: SheetColumn) {
    onColumnDelete!(column)
  }

  function handleNext() {
    const nextIdx = rowIdx + 1
    setRowIdx(nextIdx)
    setExpandRow(rows[nextIdx])
  }

  function handlePrevious() {
    const previousIdx = rowIdx - 1
    setRowIdx(previousIdx)
    setExpandRow(rows[previousIdx])
  }

  /**
   * The identity of the wrapper function is stable so it won't break memoization
   */
  const columnResize = useLatestFunc(handleColumnResize)
  const rowExpand = useLatestFunc(handleRowExpand)
  const cellValueChange = useLatestFunc(handleCellValueChange)
  const columnPin = useLatestFunc(handleColumnPin)
  const columnUnpin = useLatestFunc(handleColumnUnpin)
  const columnHide = useLatestFunc(handleColumnHide)

  useEffect(() => {
    const internalColumns: any = [
      {
        key: InternalColumnKindEnum.CONTACT,
        name: 'Contact',
        kind: InternalColumnKindEnum.CONTACT,
        width: 180,
        minWidth: 80,
        properties: {},
        frozen: true,
        resizable: true,
        headerRenderer: cellHeaderRenderer,
        formatter: cellFormatter
      },
      {
        key: InternalColumnKindEnum.SUBMIT_DATE,
        name: 'Submit Date',
        kind: InternalColumnKindEnum.SUBMIT_DATE,
        width: 160,
        minWidth: 80,
        properties: {},
        frozen: true,
        resizable: true,
        headerRenderer: cellHeaderRenderer,
        formatter: cellFormatter
      }
    ]

    const fields = formFields.filter(row => !STATEMENT_FIELD_KINDS.includes(row.kind))
    const fieldColumns: any[] = fields.map(row => ({
      key: row.id,
      name: row.title,
      kind: row.kind,
      width: row.width || width,
      minWidth: 80,
      properties: row.properties,
      frozen: row.frozen,
      resizable: true,
      headerRenderer: cellHeaderRenderer,
      formatter: cellFormatter
    }))

    const columns: Column<any>[] = [
      SelectColumn,
      ...internalColumns,
      ...fieldColumns,
      SheetHeaderAddCell(handleColumnAdd)
    ]

    setColumns(columns)
  }, [])

  useEffect(() => {
    const rows = submissions.map(row => {
      const values: IMapType = {
        id: row.id,
        contact: row.contact,
        endAt: row.endAt
      }

      row.answers.forEach(row2 => {
        values[row2.id] = row2.value
      })

      row.columns?.forEach(row2 => {
        values[row2.id] = row2.value
      })

      return values
    })

    setRows(rows)
  }, [submissions])

  return (
    <>
      <DataGrid
        ref={dataGridRef}
        className={className}
        style={style}
        loading={loading}
        rowKeyGetter={row => row.id}
        columns={columns}
        rows={rows}
        selectedRows={selectedRows}
        onSelectedRowsChange={onSelectedRowsChange}
        onRowExpand={rowExpand}
        onColumnResize={columnResize as any}
      />
      <SheetRowModal
        visible={modalVisible}
        columns={columns as SheetColumn[]}
        rowIdx={rowIdx}
        rowCount={rows.length}
        row={expandRow}
        onClose={() => setModalVisible(false)}
        onNextSubmission={handleNext}
        onPrevSubmission={handlePrevious}
        onColumnOptionsUpdate={handleColumnOptionsUpdate}
        onCellValueChange={cellValueChange}
      />
    </>
  )
}
