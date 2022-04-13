import type { FC } from 'react'
import type { BlockProps } from './Block'
import { EmptyState } from './EmptyState'

export const ThankYou: FC<BlockProps> = ({ field, className, children, ...restProps }) => {
  function handleClick() {
    window.location.href = 'https://heyform.net'
  }

  return (
    <EmptyState {...restProps} className="heyform-thank-you" field={field} onClick={handleClick} />
  )
}
