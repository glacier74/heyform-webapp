import type { EditorProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus()
  input?.select()
}

export default function TextEditor<TRow, TSummaryRow = unknown>({
  row,
  column,
  onRowChange,
  onClose
}: EditorProps<TRow, TSummaryRow>) {
  return (
    <input
      className="heygrid-text-editor"
      ref={autoFocusAndSelect}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={event => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true)}
    />
  )
}
