import { Button } from '@heyforms/ui'
import type { FC } from 'react'

export const Password: FC = () => {
  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Password</div>
      <p className="mt-1 text-sm text-gray-500">
        <Button.Link className="text-blue-500">Change password</Button.Link>
      </p>
    </div>
  )
}
