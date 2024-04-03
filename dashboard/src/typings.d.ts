/// <reference types="vite/client" />
import type { HTMLAttributes, ReactNode } from 'react'

export {}

declare global {
  type IComponentProps<E = HTMLElement> = HTMLAttributes<E>
  type IKeyType = string | number
  type IValueType = IKeyType | boolean
  type IMapType<V = any> = Record<string | number | symbol, V>
  type IOptionType = IMapType<IValueType> & {
    label: ReactNode
    value: IValueType
    disabled?: boolean
  }

  interface IModalProps {
    visible?: boolean
    onClose?: () => void
    onComplete?: () => void
  }

  interface Window {
    initGeetest4: any
    plausible: any
    DEVICE_INFO: any
    __APOLLO_DEVTOOLS_GLOBAL_HOOK__: boolean
  }
}
