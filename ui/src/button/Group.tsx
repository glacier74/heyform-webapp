import type { FC } from 'react'

export type ButtonGroupProps = IComponentProps

const Group: FC<ButtonGroupProps> = ({ children, ...restProps }) => {
  return (
    <span className="button-group" {...restProps}>
      {children}
    </span>
  )
}

export default Group
