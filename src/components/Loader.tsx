import { FC } from 'react'

import Icon from '@/assets/loader.svg?react'
import { cn } from '@/utils'

export const Loader: FC<Omit<ComponentProps<SVGSVGElement>, 'children'>> = ({
  className,
  ...restProps
}) => {
  return <Icon className={cn('h-5 w-5 animate-spin', className)} {...restProps} />
}
