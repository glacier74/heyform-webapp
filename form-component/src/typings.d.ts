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
}