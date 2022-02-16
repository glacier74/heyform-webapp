import { Button } from '@heyforms/ui'
import type { FC } from 'react'

export const ExportData: FC = () => {
  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Export content</div>
      <p className="mt-1 text-sm text-gray-500">
        Get an email with all your forms, settings in one file.
      </p>
      <div className="mt-3">
        <Button>Request you data</Button>
      </div>
    </div>
  )
}
