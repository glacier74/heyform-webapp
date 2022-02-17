import { Avatar as UIAvatar, Button } from '@heyforms/ui'
import type { FC } from 'react'

export const Avatar: FC = () => {
  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Avatar</div>
      <p className="mt-1 text-sm text-gray-500">
        Gravatar is used by default as your HeyForm avatar, you can upload your custom avatar here
      </p>
      <div className="mt-3 flex items-center">
        <UIAvatar src="" size={48} circular rounded />
        <div className="ml-4 flex flex-auto items-center">
          <Button>Change</Button>
          <Button.Link className="ml-3 px-4 py-2">Remove</Button.Link>
        </div>
      </div>
    </div>
  )
}
