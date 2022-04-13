import type { FC } from 'react'
import { useState } from 'react'
import { CountrySelect, FormField, Input } from '../components'
import { useStore } from '../store'
import type { BlockProps } from './Block'
import { Block } from './Block'
import { Form } from './Form'

export const Address: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state } = useStore()
  const [isDropdownShown, setIsDropdownShown] = useState(false)

  return (
    <Block className="heyform-address" field={field} isScrollable={!isDropdownShown} {...restProps}>
      <Form initialValues={state.values[field.id]} field={field}>
        <div className="space-y-4">
          <FormField
            name="address1"
            rules={[
              {
                required: field.validations?.required,
                message: 'This field is required'
              }
            ]}
          >
            <Input placeholder="Address Line 1" />
          </FormField>

          <FormField name="address2">
            <Input placeholder="Address Line 2 (optional)" />
          </FormField>

          <div className="flex items-start justify-items-stretch w-full space-x-4">
            <FormField
              className="flex-1"
              name="city"
              rules={[
                {
                  required: field.validations?.required,
                  message: 'This field is required'
                }
              ]}
            >
              <Input placeholder="City" />
            </FormField>

            <FormField
              className="flex-1"
              name="state"
              rules={[
                {
                  required: field.validations?.required,
                  message: 'This field is required'
                }
              ]}
            >
              <Input placeholder="State/Province" />
            </FormField>
          </div>

          <div className="flex items-start justify-items-stretch w-full space-x-4">
            <FormField
              className="flex-1"
              name="zip"
              rules={[
                {
                  required: field.validations?.required,
                  message: 'This field is required'
                }
              ]}
            >
              <Input placeholder="Zip/Postal Code" />
            </FormField>

            <FormField
              className="flex-1"
              name="country"
              rules={[
                {
                  required: field.validations?.required,
                  message: 'This field is required'
                }
              ]}
            >
              <CountrySelect placeholder="Country" onDropdownVisibleChange={setIsDropdownShown} />
            </FormField>
          </div>
        </div>
      </Form>
    </Block>
  )
}
