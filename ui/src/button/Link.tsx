import clsx from 'clsx'
import type { FC } from 'react'
import Button from './Button'
import type { ButtonProps } from './Button'

const Link: FC<ButtonProps> = ({ className, children, ...restProps }) => {
  return (
    <Button className={clsx('button-link', className)} {...restProps}>
      {children}
    </Button>
  )
}

export default Link
