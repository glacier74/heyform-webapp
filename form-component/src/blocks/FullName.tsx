import type { FC } from 'react'
import { FormField, Input } from '../components'
import { useStore } from '../store'
import type { BlockProps } from './Block'
import { Block } from './Block'
import { Form } from './Form'

export const FullName: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state } = useStore()

  return (
    <Block className="heyform-full-name" field={field} {...restProps}>
      <Form initialValues={state.values[field.id]} field={field}>
        <div className="flex items-start justify-items-stretch w-full space-x-4">
          <FormField
            className="flex-1"
            name="firstName"
            rules={[
              {
                required: field.validations?.required,
                message: 'This field is required'
              }
            ]}
          >
            <Input placeholder="First Name" />
          </FormField>

          <FormField
            className="flex-1"
            name="lastName"
            rules={[
              {
                required: field.validations?.required,
                message: 'This field is required'
              }
            ]}
          >
            <Input placeholder="Last Name" />
          </FormField>
        </div>
      </Form>
    </Block>
  )
}
