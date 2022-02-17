import { Button } from '@heyforms/ui'
import type { FC } from 'react'

export const Account: FC = () => {
  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Danger zone</div>
      <p className="mt-1 text-sm text-gray-500">
        This will permanently delete your entire account. All your forms, submissions and workspaces
        will be deleted
      </p>
      <div className="mt-3">
        <Button type="danger">Delete account</Button>
      </div>
    </div>
  )
}
