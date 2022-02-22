import { diff } from '@hpnp/utils'
import { isEmpty } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FormProps as RcFieldFormProps } from 'rc-field-form'
import RcFieldForm from 'rc-field-form'
import type { FC } from 'react'
import { useState } from 'react'
import type { ButtonProps } from '../button/Button'
import Button from '../button/Button'

export interface CustomFormProps extends Partial<RcFieldFormProps> {
  inline?: boolean
  enableOnValuesChange?: boolean
  showRequestError?: boolean
  submitText?: string
  submitOptions?: Partial<ButtonProps>
  request: (values: IMapType) => Promise<any>
}

const CustomForm: FC<CustomFormProps> = ({
  className,
  inline,
  enableOnValuesChange = false,
  showRequestError = true,
  submitText,
  request,
  submitOptions,
  children,
  ...restProps
}) => {
  const [disabled, setDisabled] = useState(enableOnValuesChange)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleFinish(values: IMapType) {
    if (loading) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      await request(values)
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  function handleValuesChange(_: IMapType, values: IMapType) {
    if (enableOnValuesChange) {
      console.log(diff(restProps.initialValues!, values))
      setDisabled(isEmpty(diff(restProps.initialValues!, values)))
    }
  }

  return (
    <RcFieldForm
      className={clsx(className, {
        'form-inline': inline
      })}
      onValuesChange={handleValuesChange}
      onFinish={handleFinish}
      {...restProps}
    >
      {children}

      <Button htmlType="submit" loading={loading} disabled={loading || disabled} {...submitOptions}>
        {submitText}
      </Button>

      {showRequestError && error && <div className="form-item-error">{error.message}</div>}
    </RcFieldForm>
  )
}

export default CustomForm
