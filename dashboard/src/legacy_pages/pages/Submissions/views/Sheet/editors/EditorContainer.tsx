import { useClickOutside } from '@/legacy_pages/pages/Submissions/views/Sheet/hooks'

import type { EditorProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { createPortal } from 'react-dom'

export default function EditorContainer<R, SR>({
  row,
  column,
  onRowChange,
  ...props
}: EditorProps<R, SR>) {
  const onClickCapture = useClickOutside(() => onRowChange(row, true))
  if (column.editor === undefined) return null

  const editor = (
    <div className="heygrid-editor-container" onClickCapture={onClickCapture}>
      <column.editor row={row} column={column} onRowChange={onRowChange} {...props} />
    </div>
  )

  if (column.editorOptions?.createPortal) {
    return createPortal(editor, props.editorPortalTarget)
  }

  return editor
}
