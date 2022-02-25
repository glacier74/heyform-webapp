import { UserService } from '@/service'
import { useStore } from '@/store'
import { Form, Input } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

export const UserName: FC = observer(() => {
  const userStore = useStore('userStore')

  async function handleFinish(values: IMapType) {
    await UserService.update(values)
    userStore.update(values)
  }

  return (
    <div>
      <Form.Custom
        inline
        initialValues={{
          name: userStore.user.name
        }}
        submitText="Update"
        submitOptions={{
          className: 'mt-6 ml-3'
        }}
        request={handleFinish}
      >
        <Form.Item name="name" label="Your name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form.Custom>
    </div>
  )
})
