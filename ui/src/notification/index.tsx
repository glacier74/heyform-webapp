import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  XIcon
} from '@heroicons/react/outline'
import { nanoid } from '@hpnp/utils'
import type { FC, ReactNode, RefObject } from 'react'
import { createRef, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { render } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import Button from '../button'
import Spin from '../spin'

export interface NotificationOptions {
  id?: string
  icon?: ReactNode
  title?: string
  message?: string
  duration?: number
}

export interface NotificationProps extends NotificationOptions {
  onExited?: (id: string) => void
}

export interface NotificationListProps {
  add: (options: NotificationOptions) => void
  delete: (id: string) => void
}

const Notification: FC<NotificationProps> = ({
  id,
  icon,
  title,
  message,
  duration = 8000,
  onExited
}) => {
  const [visible, setVisible] = useState(false)

  function handleClick() {
    setVisible(false)
  }

  function handleExited() {
    onExited && onExited(id!)
  }

  useEffect(() => {
    setVisible(true)

    if (duration > 0) {
      const timer = setTimeout(handleClick, duration)

      return () => {
        if (timer) {
          clearTimeout(timer)
        }
      }
    }
  }, [])

  return (
    <CSSTransition
      classNames="notification-transition"
      in={visible}
      timeout={60}
      unmountOnExit={true}
      onExited={handleExited}
    >
      <div className={`notification`}>
        <div className="notification-wrapper">
          {icon && <div className="notification-icon">{icon}</div>}
          <div className="notification-body">
            <p className="notification-title">{title}</p>
            {message && <p className="notification-message">{message}</p>}
          </div>
          <div className="notification-close">
            <Button.Link leading={<XIcon />} onClick={handleClick} />
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

const NotificationList = forwardRef<NotificationListProps, any>((_, ref) => {
  const [options, setOptions] = useState<NotificationOptions[]>([])

  function handleExited(id: string) {
    setOptions(options.filter(row => row.id !== id))
  }

  useImperativeHandle(ref, () => {
    return {
      add(option: NotificationOptions) {
        const index = options.findIndex(
          row => row.title === option.title && row.message === option.message
        )
        if (index > -1) {
          options.splice(index, 1)
        }
        setOptions([option, ...options])
      },
      delete(id: string) {
        setOptions(options.filter(row => row.id !== id))
      }
    }
  })

  return (
    <div className="notification-list">
      {options.map(row => (
        <Notification key={row.id} onExited={handleExited} {...row} />
      ))}
    </div>
  )
})

let ref: RefObject<NotificationListProps>

function notification(options: NotificationOptions) {
  // Setup the notification list
  if (!ref || !ref.current) {
    const container = document.createElement('div')
    container.className = 'notification-root'
    document.body.appendChild(container)

    ref = createRef<NotificationListProps>()
    render(<NotificationList ref={ref} />, container)
  }

  const id = nanoid(6)

  ref.current?.add({
    id,
    ...options
  })

  return {
    dismiss() {
      ref.current?.delete(id)
    }
  }
}

notification.success = (options: NotificationOptions) => {
  return notification({
    ...options,
    icon: <CheckCircleIcon className="notification-success-icon" />
  })
}

notification.warning = (options: NotificationOptions) => {
  return notification({
    ...options,
    icon: <ExclamationCircleIcon className="notification-warning-icon" />
  })
}

notification.error = (options: NotificationOptions) => {
  return notification({
    ...options,
    icon: <XCircleIcon className="notification-error-icon" />
  })
}

notification.loading = (options: NotificationOptions) => {
  return notification({
    ...options,
    icon: <Spin className="notification-loading-icon" />,
    duration: 0
  })
}

export default notification
