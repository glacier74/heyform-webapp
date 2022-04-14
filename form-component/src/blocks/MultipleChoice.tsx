import type { FC } from 'react'
import { FormField, RadioGroup, SelectHelper } from '../components'
import { useStore } from '../store'
import type { BlockProps } from './Block'
import { Block } from './Block'
import { Form } from './Form'
import { useChoicesOption, useSelectionRange } from './hook'

export const MultipleChoice: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state } = useStore()
  const options = useChoicesOption(field.properties?.choices)
  const { min, max, allowMultiple } = useSelectionRange(
    field.properties?.allowMultiple,
    field.validations?.min,
    field.validations?.max
  )

  return (
    <Block className="heyform-multiple-choice" field={field} {...restProps}>
      <SelectHelper min={min} max={max} />

      <Form
        initialValues={state.values[field.id]}
        autoSubmit={!allowMultiple}
        isSubmitShow={allowMultiple}
        field={field}
      >
        <FormField
          name="value"
          rules={[
            {
              required: field.validations?.required,
              type: 'array',
              min,
              max,
              message: 'This field is required'
            }
          ]}
        >
          <RadioGroup
            options={options}
            allowMultiple={field.properties?.allowMultiple}
            max={field.validations?.max}
          />
        </FormField>
      </Form>
    </Block>
  )
}
