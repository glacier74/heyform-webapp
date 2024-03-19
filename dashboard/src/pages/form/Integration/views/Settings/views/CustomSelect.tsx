/**
 * @program: dashboard-next
 * @description: Custom Select
 * @author: Mufeng
 * @date: 2021-06-16 15:56
 **/
import { Select } from '@heyforms/ui'
import { SelectProps } from '@heyforms/ui/types/select/Native'
import { isEqual, isNil } from '@hpnp/utils/helper'
import { FC, useState } from 'react'

import { useAsyncEffect } from '@/utils'

interface CustomSelectProps extends Omit<SelectProps, 'options'> {
  deps: any[]
  fetch: () => Promise<any[]>
  value?: any
  returnObjectValue?: boolean
  disabled?: boolean
  onChange?: (value: any) => void
}

export const CustomSelect: FC<CustomSelectProps> = ({
  value,
  deps,
  fetch,
  labelKey = 'label',
  valueKey = 'id',
  returnObjectValue = true,
  disabled,
  onChange,
  ...restProps
}) => {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<any[]>([])

  useAsyncEffect(async () => {
    if (deps.some(isNil) || disabled) {
      return
    }

    setLoading(true)

    try {
      const options = await fetch()
      setOptions(options)
    } catch (err: any) {
      console.error(err)
    }

    setLoading(false)
  }, deps)

  function handleChange(value: any) {
    if (!onChange) {
      return
    }

    if (returnObjectValue) {
      const option = options.find(o => isEqual(o[valueKey], value))
      onChange(option)
    } else {
      onChange(value)
    }
  }

  return (
    <Select
      {...restProps}
      options={options}
      value={value ? (returnObjectValue ? value[valueKey] : value) : undefined}
      labelKey={labelKey}
      valueKey={valueKey}
      loading={loading}
      disabled={disabled || loading}
      onChange={handleChange}
    />
  )
}