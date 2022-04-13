import { isDate } from '@heyforms/answer-utils/helper'
import type { FC } from 'react'
import { DateInput, FormField } from '../components'
import { useStore } from '../store'
import type { BlockProps } from './Block'
import { Block } from './Block'
import { Form } from './Form'

export const Date: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state } = useStore()
  const format = field.properties?.format || 'MM/DD/YYYY'

  function getValues(values: any) {
    return values.input
  }

  return (
    <Block className="heyform-date" field={field} {...restProps}>
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
              validator(rule, value) {
                return new Promise<void>((resolve, reject) => {
                  if (isDate(value, format)) {
                    resolve()
                  } else {
                    reject(rule.message)
                  }
                })
              },
              message: 'This field is required'
            }
          ]}
        >
          <DateInput format={format} />
        </FormField>
      </Form>
    </Block>
  )
}
