import { PhotoPickerField } from '@/components'
import { UserService } from '@/service'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export const Avatar: FC = observer(() => {
  const userStore = useStore('userStore')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleChange(avatar: string) {
    setLoading(true)
    setError(null)

    try {
      await UserService.update({
        avatar
      })

      userStore.update({
        avatar
      })
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <PhotoPickerField
        value={userStore.user?.avatar}
        label="Avatar"
        description="Gravatar is used by default as your HeyForm avatar, you can upload your custom avatar here"
        changeLoading={loading}
        onChange={handleChange}
      />

      {error && <div className="form-item-error">{error.message}</div>}
    </div>
  )
})
