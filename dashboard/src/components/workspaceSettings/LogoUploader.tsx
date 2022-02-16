import { Avatar, Button } from '@heyforms/ui'
import type { FC } from 'react'

export const LogoUploader: FC = () => {
  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Logo</div>
      <p className="mt-1 text-sm text-gray-500">Pick a logo for your workspace</p>
      <div className="mt-3 flex items-center">
        <Avatar src="" size={48} circular rounded />
        <div className="ml-4 flex flex-auto items-center">
          <Button>Change</Button>
          <Button className="ml-3">Remove</Button>
        </div>
      </div>
    </div>
  )
}
