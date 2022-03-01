import { Input, InputProps } from '@heyui/component'
import { FC } from 'react'

export const NumberInput: FC<InputProps> = ({ value, onChange, ...restProps }) => {
  function handleChange(value: any) {
    onChange && onChange(Number(value))
  }

  return <Input type="number" value={value} onChange={handleChange} {...restProps} />
}
