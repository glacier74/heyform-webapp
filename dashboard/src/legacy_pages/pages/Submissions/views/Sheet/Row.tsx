import Cell from '@/legacy_pages/pages/Submissions/views/Sheet/Cell'
import EditCell from '@/legacy_pages/pages/Submissions/views/Sheet/EditCell'
import type {
  RowRendererProps,
  SelectedCellProps
} from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { CalculatedColumn } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import clsx from 'clsx'
import type { RefAttributes } from 'react'
import { forwardRef, memo } from 'react'

function Row<R, SR = unknown>(
  {
    cellRenderer: CellRenderer = Cell,
    className,
    rowIdx,
    isRowSelected,
    copiedCellIdx,
    draggedOverCellIdx,
    row,
    viewportColumns,
    totalColumnWidth,
    totalFrozenColumnWidth,
    selectedCellProps,
    onRowClick,
    rowClass,
    setDraggedOverRowIdx,
    onMouseEnter,
    top,
    onRowChange,
    onRowExpand,
    selectCell,
    selectRow,
    ...props
  }: RowRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) {
  function handleDragEnter(event: React.MouseEvent<HTMLDivElement>) {
    setDraggedOverRowIdx?.(rowIdx)
    onMouseEnter?.(event)
  }

  function renderCell(column: CalculatedColumn<R, SR>) {
    const isCellSelected = selectedCellProps?.idx === column.idx

    if (selectedCellProps?.mode === 'EDIT' && isCellSelected) {
      return (
        <EditCell<R, SR>
          key={column.key}
          rowIdx={rowIdx}
          column={column}
          row={row}
          onKeyDown={selectedCellProps.onKeyDown}
          editorProps={selectedCellProps.editorProps}
        />
      )
    }

    return (
      <CellRenderer
        key={column.key}
        rowIdx={rowIdx}
        column={column}
        row={row}
        isCopied={copiedCellIdx === column.idx}
        isDraggedOver={draggedOverCellIdx === column.idx}
        isCellSelected={isCellSelected}
        isRowSelected={isRowSelected}
        dragHandleProps={
          isCellSelected ? (selectedCellProps as SelectedCellProps).dragHandleProps : undefined
        }
        onFocus={isCellSelected ? (selectedCellProps as SelectedCellProps).onFocus : undefined}
        onKeyDown={isCellSelected ? selectedCellProps!.onKeyDown : undefined}
        onRowClick={onRowClick}
        onRowChange={onRowChange}
        onRowExpand={onRowExpand}
        selectCell={selectCell}
        selectRow={selectRow}
      />
    )
  }

  const rowSelected = isRowSelected || (selectedCellProps && selectedCellProps?.idx > -1)

  className = clsx(
    'heygrid-row',
    {
      'heygrid-row-selected': rowSelected,
      'heygrid-group-row-selected': selectedCellProps?.idx === -1
    },
    rowClass?.(row),
    className
  )

  return (
    <div
      role="row"
      ref={ref}
      className={className}
      onMouseEnter={handleDragEnter}
      style={{ top, width: totalColumnWidth }}
      {...props}
    >
      <div
        className="heygrid-frozen-pane"
        style={{
          width: totalFrozenColumnWidth
        }}
      >
        {viewportColumns.filter(column => column.frozen).map(renderCell)}
      </div>
      {viewportColumns.filter(column => !column.frozen).map(renderCell)}
    </div>
  )
}

export default memo(forwardRef(Row)) as <R, SR = unknown>(
  props: RowRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element
