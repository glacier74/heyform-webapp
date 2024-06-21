import { FC } from 'react'

import { cn } from '@/utils'

import { Button } from './Button'

interface EmptyStateProps extends ComponentProps {
  headline: string
  subHeadline?: string
  buttonTitle?: string
}

export const EmptyState: FC<EmptyStateProps> = ({
  className,
  headline,
  subHeadline,
  buttonTitle,
  onClick
}) => {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <h3 className="text-xl/8 font-semibold sm:text-lg/8" data-slot="headline">
        {headline}
      </h3>

      {subHeadline && (
        <p className="mt-1 text-sm text-secondary" data-slot="subheadline">
          {subHeadline}
        </p>
      )}

      {buttonTitle && (
        <Button className="mt-6" size="md" data-slot="button" onClick={onClick}>
          {buttonTitle}
        </Button>
      )}
    </div>
  )
}
