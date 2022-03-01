import EditorContainer from '@/legacy_pages/pages/Submissions/views/Sheet/editors/EditorContainer'
import type {
  CellRendererProps,
  Omit,
  SharedEditorProps
} from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { getCellStyle } from '@/legacy_pages/pages/Submissions/views/Sheet/utils'
import clsx from 'clsx'
import { useCallback, useState } from 'react'

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'rowIdx' | 'row' | 'column'>

interface EditCellProps<R, SR>
  extends SharedCellRendererProps<R, SR>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  editorProps: SharedEditorProps<R>
}

export default function EditCell<R, SR>({
  className,
  column,
  row,
  rowIdx,
  editorProps,
  ...props
}: EditCellProps<R, SR>) {
  const [dimensions, setDimensions] = useState<{
    left: number
    top: number
  } | null>(null)

  const cellRef = useCallback(node => {
    if (node !== null) {
      const { left, top } = node.getBoundingClientRect()
      setDimensions({ left, top })
    }
  }, [])

  const { cellClass } = column
  className = clsx(
    'heygrid-cell',
    {
      'heygrid-cell-frozen': column.frozen,
      'heygrid-cell-frozen-last': column.isLastFrozenColumn
    },
    'heygrid-cell-selected',
    'heygrid-cell-editing',
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  )

  function getCellContent() {
    if (dimensions === null) return
    const { scrollTop: docTop, scrollLeft: docLeft } =
      document.scrollingElement ?? document.documentElement
    const { left, top } = dimensions
    const gridLeft = left + docLeft
    const gridTop = top + docTop

    return (
      <EditorContainer
        {...editorProps}
        rowIdx={rowIdx}
        column={column}
        left={gridLeft}
        top={gridTop}
      />
    )
  }

  return (
    <div ref={cellRef} className={className} style={getCellStyle(column)} {...props}>
      {getCellContent()}
    </div>
  )
}
