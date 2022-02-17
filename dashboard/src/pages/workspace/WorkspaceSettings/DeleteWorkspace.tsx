import { Button } from '@heyforms/ui'
import type { FC } from 'react'

export const DeleteWorkspace: FC = () => {
  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Dissolve workspace</div>
      <p className="mt-1 text-sm text-gray-500">
        By dissolving the team, all the forms and data will be erased and cannot be restored! Be
        cautious!
      </p>
      <div className="mt-3">
        <Button type="danger">Dissolve workspace</Button>
      </div>
    </div>
  )
}
