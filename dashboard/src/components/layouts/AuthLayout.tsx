import { AuthGuard, CommonLayout } from '@/components'
import type { FC } from 'react'

export const AuthLayout: FC<IComponentProps> = ({ children }) => {
  return (
    <AuthGuard>
      <CommonLayout>{children}</CommonLayout>
    </AuthGuard>
  )
}
