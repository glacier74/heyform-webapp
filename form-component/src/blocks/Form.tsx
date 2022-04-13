import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FormField } from '@heyforms/shared-types-enums'
import type { FormProps as RCFormProps } from 'rc-field-form'
import RCForm, { Field, useForm } from 'rc-field-form'
import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'
import { useKey } from 'react-use'
import { Submit } from '../components'
import { useStore } from '../store'
import { validateFields } from '../utils'

interface FormProps extends RCFormProps {
  field: FormField
  autoSubmit?: boolean
  isSubmitShow?: boolean
  getValues?: (values: any) => any
  children?: ReactNode
}

const NextIcon = <ChevronRightIcon />

export const Form: FC<FormProps> = ({
  field,
  autoSubmit = false,
  isSubmitShow = true,
  getValues,
  children,
  ...restProps
}) => {
  const [form] = useForm<any>()
  const { state, dispatch } = useStore()

  const isLastField = state.scrollIndex! >= state.fields.length - 1
  const validateTrigger = autoSubmit ? 'onChange' : 'onSubmit'

  async function handleFinish(formValue: any) {
    const value = getValues ? getValues(formValue) : formValue

    dispatch({
      type: 'setValues',
      payload: {
        values: {
          [field.id]: value
        }
      }
    })

    // Validate all form fields value
    if (isLastField) {
      const values = { ...state.values, [field.id]: value }

      try {
        validateFields(state.fields, values)

        // Submit form
        await state.onSubmit?.(values)

        dispatch({
          type: 'setIsSubmitted',
          payload: {
            isSubmitted: true
          }
        })
      } catch (err: any) {
        console.warn(err.response)
        dispatch({
          type: 'scrollTo',
          payload: {
            fieldId: err.response.id
          }
        })
      }

      return
    }

    // Navigate to next form field
    dispatch({ type: 'scrollNext' })
  }

  function handleValuesChange(changes: any, values: any) {
    if (autoSubmit && !isLastField) {
      return setTimeout(() => form.submit(), 500)
    }

    // Rc-field-form doesn't provide any way to clear errors,
    // so it can only be done in the following disgraceful way.
    // see https://github.com/ant-design/ant-design/issues/24599#issuecomment-653292811
    Object.keys(values).forEach(name => {
      const error = form.getFieldError(name)

      if (error.length > 0) {
        form.setFields([
          {
            name,
            errors: []
          }
        ])
      }
    })
  }

  useKey('Enter', () => {
    form.submit()
  })

  useEffect(() => {
    if (field.id === state.errorFieldId) {
      form.validateFields()
      dispatch({
        type: 'resetErrorField'
      })
    }
  }, [state.errorFieldId])

  return (
    <RCForm
      className="heyform-form"
      form={form}
      validateTrigger={validateTrigger}
      onValuesChange={handleValuesChange}
      onFinish={handleFinish}
      {...restProps}
    >
      {children}

      {/* Submit */}
      {isLastField ? (
        <>
          <Field shouldUpdate={true}>
            <Submit text="Submit" />
          </Field>
          <div className="heyform-submit-helper">
            Never submit passwords! -{' '}
            <a
              href="https://help.heyform.net/Report-Abuse-fd4cb6bb5d3d4b8ea662bf3d9a9e1e5a"
              target="_blank"
            >
              Report abuse
            </a>
          </div>
        </>
      ) : (
        isSubmitShow && (
          <Field shouldUpdate={true}>
            {() =>
              !form.getFieldsError().some(({ errors }) => errors.length) && (
                <Submit text="Next" icon={NextIcon} />
              )
            }
          </Field>
        )
      )}
    </RCForm>
  )
}
