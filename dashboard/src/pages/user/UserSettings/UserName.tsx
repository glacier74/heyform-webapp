import { Button, Form, Input } from '@heyforms/ui'
import type { FC } from 'react'

export const UserName: FC = () => {
  return (
    <div>
      <Form.Custom
        inline
        submitText="Update"
        submitOptions={{
          className: 'mt-6 ml-3'
        }}
        request={console.log as any}
      >
        <Form.Item name="name" label="Your name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form.Custom>
    </div>
  )
}
