import { SwitchField } from '@/components/SwitchField'
import type { FC } from 'react'

export const CustomDomain: FC = () => {
  return (
    <div>
      <SwitchField
        label="Custom domain"
        description={
          <>
            Custom domains allow you to make form accessible at your own, non-HeyForm domain names.{' '}
            <a href="https://help.heyform.net" className="text-gray-900 hover:underline">
              Learn more about custom domain in docs
            </a>
            .
          </>
        }
      />
    </div>
  )
}
