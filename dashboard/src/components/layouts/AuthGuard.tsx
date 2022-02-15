import { UserService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect } from '@/utils'
import type { FC } from 'react'

export const AuthGuard: FC<IComponentProps> = ({ children }) => {
  const userStore = useStore('userStore')

  useAsyncEffect(async () => {
    const result = await UserService.user()
    userStore.setUser(result)
  }, [])

  return children
}
