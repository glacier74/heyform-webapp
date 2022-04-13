import type { FC } from 'react'
import { useState } from 'react'
import { CountrySelect, FormField } from '../components'
import { useStore } from '../store'
import type { BlockProps } from './Block'
import { Block } from './Block'
import { Form } from './Form'

export const Country: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state } = useStore()
  const [isDropdownShown, setIsDropdownShown] = useState(false)

  function getValues(values: any) {
    return values.input
  }

  return (
    <Block className="heyform-country" field={field} isScrollable={!isDropdownShown} {...restProps}>
      <Form
        initialValues={{
          input: state.values[field.id]
        }}
        autoSubmit={true}
        isSubmitShow={false}
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
          <CountrySelect
            placeholder="Select a country"
            onDropdownVisibleChange={setIsDropdownShown}
          />
        </FormField>
      </Form>
    </Block>
  )
}
