import { Button, Form, Input } from '@heyforms/ui'
import type { FC } from 'react'

export const UserName: FC = () => {
  return (
    <div>
      <Form className="form-inline">
        <Form.Item name="name" label="Your name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button className="mt-6 ml-3">Update</Button>
      </Form>
    </div>
  )
}
