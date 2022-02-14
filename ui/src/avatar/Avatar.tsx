import clsx from 'clsx'
import type { FC } from 'react'
import { DefaultAvatarIcon } from '../icons'

export interface AvatarProps extends IComponentProps {
  src?: string
  text?: string
  retainLength?: number
  size?: number
  circular?: boolean
  rounded?: boolean
}

const Avatar: FC<AvatarProps> = ({
  className,
  style,
  src,
  text,
  retainLength = 1,
  size = 60,
  circular,
  rounded,
  children,
  ...restProps
}) => {
  return (
    <span
      className={clsx('avatar', className, {
        'avatar-circular': circular,
        'avatar-rounded': rounded
      })}
      style={{
        width: size,
        height: size,
        ...style
      }}
      {...restProps}
    >
      {src ? (
        <img src={src} />
      ) : text ? (
        <span className="avatar-text">{Array.from(text).slice(0, retainLength).join('')}</span>
      ) : (
        <DefaultAvatarIcon className="avatar-placeholder" />
      )}
    </span>
  )
}

export default Avatar
