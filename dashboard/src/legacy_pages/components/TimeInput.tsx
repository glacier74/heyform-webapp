/**
 * @program: heyform-dashboard
 * @description:
 * @author: mufeng
 * @date: 11/12/21 10:10 AM
 **/

import { formatHs, hsToSecond } from '@/legacy_pages/utils'
import { Flex, Input, InputProps, Select } from '@heyui/component'
import { OptionType } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

type TimeInputProp = InputProps & {
  options?: OptionType[]
}

const DEFAULT_OPTIONS: OptionType[] = [
  {
    id: 's',
    label: 'Second'
  },
  {
    id: 'm',
    label: 'Minute'
  },
  {
    id: 'h',
    label: 'Hour'
  }
]

export const TimeInput: FC<TimeInputProp> = ({
  type,
  value,
  options = DEFAULT_OPTIONS,
  onChange,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState<number>()
  const [selectValue, setSelectValue] = useState<string>(options[0].id)

  useEffect(() => {
    if (isValid(value)) {
      const [inputValue, selectValue] = formatHs(value)

      setInputValue(inputValue)
      setSelectValue(selectValue)
    }
  }, [])

  useEffect(() => {
    onChange && onChange(hsToSecond(inputValue!, selectValue))
  }, [inputValue, selectValue])

  function handleInputChange(value: string) {
    setInputValue(Number(value))
  }

  return (
    <Container align="center">
      <StyledInput type="number" value={inputValue} onChange={handleInputChange} {...restProps} />
      <StyledSelect
        value={selectValue}
        options={options}
        tipText="Select time format"
        onChange={setSelectValue}
      />
    </Container>
  )
}

const StyledInput = styled(Input)`
  &,
  input {
    width: 60px !important;
  }

  input {
    border-right: none;
  }
`

const StyledSelect = styled(Select)`
  position: relative;
  width: 80px;

  .hey-button {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  .hey-select-label {
    min-width: 0;
  }

  .hey-select-arrow-icon {
    right: 8px;
  }

  &:before {
    position: absolute;
    content: '';
    left: 0;
    top: 10px;
    width: 1px;
    height: 20px;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9;
  }
`

const Container = styled(Flex)`
  ${StyledInput} {
    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  ${StyledSelect} {
    .hey-button {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`
