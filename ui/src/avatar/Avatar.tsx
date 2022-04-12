import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { DefaultAvatarIcon } from '../icons'

export interface AvatarProps extends IComponentProps {
  src?: string
  text?: string
  retainLength?: number
  size?: number
  circular?: boolean
  rounded?: boolean
  defaultIcon?: ReactNode
}

const Avatar: FC<AvatarProps> = ({
  className,
  style,
  src,
  text,
  retainLength = 1,
  size = 32,
  circular,
  rounded,
  defaultIcon,
  children,
  ...restProps
}) => {
  return (
    <span
      style={{
        width: size,
        height: size,
        lineHeight: `${size}px`,
        ...style
      }}
      className={clsx(
        'avatar',
        {
          'avatar-circular': circular,
          'avatar-rounded': rounded
        },
        className
      )}
      {...restProps}
    >
      {src ? (
        <img src={src} width={size * 2} height={size * 2} />
      ) : text ? (
        <span className="avatar-text">{Array.from(text).slice(0, retainLength).join('')}</span>
      ) : (
        defaultIcon || <DefaultAvatarIcon className="avatar-placeholder" />
      )}
    </span>
  )
}

export default Avatar
