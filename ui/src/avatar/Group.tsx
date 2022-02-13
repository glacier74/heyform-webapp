import clsx from 'clsx'
import type { FC, HTMLAttributes } from 'react'
import type { AvatarProps } from './Avatar'
import Avatar from './Avatar'

export type AvatarOptionType = Partial<Pick<AvatarProps, 'src' | 'text' | 'circular' | 'rounded'>>

export interface AvatarGroupProps
  extends Partial<Pick<AvatarProps, 'size' | 'circular' | 'rounded'>>,
    HTMLAttributes<HTMLElement> {
  options?: AvatarOptionType[]
}

const Group: FC<AvatarGroupProps> = ({
  className,
  options,
  size,
  circular,
  rounded,
  children,
  ...restProps
}) => {
  return (
    <span className={clsx('avatar-group', className)} {...restProps}>
      {options?.map((option, index) => (
        <Avatar
          key={index}
          src={option.src}
          text={option.text}
          size={size}
          circular={circular ?? option.circular}
          rounded={rounded ?? option.rounded}
        />
      ))}
      {children}
    </span>
  )
}

export default Group
