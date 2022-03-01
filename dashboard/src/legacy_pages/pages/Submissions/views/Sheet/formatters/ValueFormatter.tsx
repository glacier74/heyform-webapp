import type { FormatterProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'

export function ValueFormatter<R, SR>(props: FormatterProps<R, SR>) {
  try {
    return <>{props.row[props.column.key as keyof R]}</>
  } catch {
    return null
  }
}
