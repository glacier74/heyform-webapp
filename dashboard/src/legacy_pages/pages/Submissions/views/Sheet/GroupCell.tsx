import type { GroupRowRendererProps } from '@/legacy_pages/pages/Submissions/views/Sheet/GroupRow'
import type { CalculatedColumn } from '@/legacy_pages/pages/Submissions/views/Sheet/types'

import { getCellStyle } from '@/legacy_pages/pages/Submissions/views/Sheet/utils'
import clsx from 'clsx'
import { memo } from 'react'

type SharedGroupRowRendererProps<R, SR> = Pick<
  GroupRowRendererProps<R, SR>,
  | 'id'
  | 'rowIdx'
  | 'groupKey'
  | 'childRows'
  | 'isExpanded'
  | 'isRowSelected'
  | 'selectRow'
  | 'toggleGroup'
>

interface GroupCellProps<R, SR> extends SharedGroupRowRendererProps<R, SR> {
  column: CalculatedColumn<R, SR>
  isCellSelected: boolean
  groupColumnIndex: number
}

function GroupCell<R, SR>({
  id,
  rowIdx,
  groupKey,
  childRows,
  isExpanded,
  isCellSelected,
  isRowSelected,
  column,
  groupColumnIndex,
  selectRow,
  toggleGroup: toggleGroupWrapper
}: GroupCellProps<R, SR>) {
  function toggleGroup() {
    toggleGroupWrapper(id)
  }

  function onRowSelectionChange(checked: boolean) {
    selectRow({ rowIdx, checked, isShiftClick: false })
  }

  // Only make the cell clickable if the group level matches
  const isLevelMatching = column.rowGroup && groupColumnIndex === column.idx

  return (
    <div
      key={column.key}
      className={clsx('heygrid-cell', {
        'heygrid-cell-frozen': column.frozen,
        'heygrid-cell-frozen-last': column.isLastFrozenColumn,
        'heygrid-cell-selected': isCellSelected
      })}
      style={{
        ...getCellStyle(column),
        cursor: isLevelMatching ? 'pointer' : 'default'
      }}
      onClick={isLevelMatching ? toggleGroup : undefined}
    >
      {(!column.rowGroup || groupColumnIndex === column.idx) && column.groupFormatter && (
        <column.groupFormatter
          groupKey={groupKey}
          childRows={childRows}
          column={column}
          isExpanded={isExpanded}
          isCellSelected={isCellSelected}
          isRowSelected={isRowSelected}
          onRowSelectionChange={onRowSelectionChange}
          toggleGroup={toggleGroup}
        />
      )}
    </div>
  )
}

export default memo(GroupCell) as <R, SR>(props: GroupCellProps<R, SR>) => JSX.Element
