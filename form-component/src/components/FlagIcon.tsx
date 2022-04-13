import clsx from 'clsx'
import type { FC } from 'react'

export interface FlagIconProps extends IComponentProps {
  countryCode?: string
}

export const FlagIcon: FC<FlagIconProps> = ({ className, countryCode = 'US' }) => {
  return <span className={clsx(`flag-icon flag-icon-${countryCode?.toLowerCase()}`, className)} />
}
