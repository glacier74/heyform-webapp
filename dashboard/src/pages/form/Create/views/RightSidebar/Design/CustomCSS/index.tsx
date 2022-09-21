import { Button, Form, Input } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

export const CustomCSS: FC = observer(() => {
  return (
    <div>
      <Form>
        <div className="right-sidebar-group">
          <Form.Item name="customCSS">
            <Input.Textarea />
          </Form.Item>
        </div>

        <Form.Item className="right-sidebar-group">
          <Button className="ml-4 flex-1" type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})
