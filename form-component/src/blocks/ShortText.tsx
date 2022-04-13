import type { FC } from 'react'
import { FormField, Input } from '../components'
import { useStore } from '../store'
import type { BlockProps } from './Block'
import { Block } from './Block'
import { Form } from './Form'

export const ShortText: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state, dispatch } = useStore()

  function getValues(values: any) {
    return values.input
  }

  return (
    <Block className="heyform-short-text" field={field} {...restProps}>
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
              message: 'This field is required'
            }
          ]}
        >
          <Input placeholder="Your answer here" />
        </FormField>
      </Form>
    </Block>
  )
}
