import { Button } from '@heyforms/ui'
import type { FC } from 'react'

export const EmailAddress: FC = () => {
  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Email address</div>
      <p className="mt-1 text-sm text-gray-500">
        john.doe@example.com{' '}
        <Button.Link className="text-blue-500">Change email address</Button.Link>
      </p>
    </div>
  )
}
