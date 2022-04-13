import type { FC } from 'react'
import { FormField, Input } from '../components'
import { useStore } from '../store'
import type { BlockProps } from './Block'
import { Block } from './Block'
import { Form } from './Form'

export const Website: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state } = useStore()

  function getValues(values: any) {
    return values.input
  }

  return (
    <Block className="heyform-website" field={field} {...restProps}>
      <Form
        initialValues={{
          input: state.values[field.id]
        }}
        field={field}
        getValues={getValues}
      >
        <FormField
          name="input"
          rules={[
            {
              required: field.validations?.required,
              type: 'url',
              message: 'This field is required'
            }
          ]}
        >
          <Input placeholder="https://example.com" />
        </FormField>
      </Form>
    </Block>
  )
}
