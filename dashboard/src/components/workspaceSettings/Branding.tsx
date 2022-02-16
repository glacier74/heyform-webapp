import { SwitchField } from '@/components/SwitchField'
import { Button, Form, Input } from '@heyforms/ui'
import type { FC } from 'react'

export const Branding: FC = () => {
  return (
    <div>
      <Form className="form-inline">
        <Form.Item name="name" label="Workspace name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button className="mt-6 ml-3">Update</Button>
      </Form>

      <SwitchField
        className="mt-6"
        label="Remove HeyForm branding"
        description={
          <>
            To make HeyForm feel like it's completely owned by your brand, remove the HeyForm Logo
            in the form footer.{' '}
            <a href="https://help.heyform.net" className="text-gray-900 hover:underline">
              Learn more about remove branding in docs
            </a>
            .
          </>
        }
      />
    </div>
  )
}
