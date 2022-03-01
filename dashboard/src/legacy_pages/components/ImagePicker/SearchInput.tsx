import { SearchIcon } from '@/legacy_pages/components/Icons'
import { ComponentProps, Flex } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

interface SearchInputProps extends ComponentProps {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  placeholder,
  onChange,
  ...restProps
}) => {
  function handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      const value = event.target.value
      onChange && onChange(value)
    }
  }

  return (
    <Container align="center" {...restProps}>
      <SearchIcon />
      <Input placeholder={placeholder} value={value} onKeyDown={handleKeyDown} />
    </Container>
  )
}

const Container = styled(Flex)`
  color: #4e5d78;
  line-height: 22px;
  font-weight: 400;
  background: #fff;
  border: 1px solid #f3f3f3;
  padding: 8px 24px 8px 8px;

  svg {
    margin-left: 8px;
    width: 20px;
    height: 20px;
    color: #c1c7d0;
  }
`

const Input = styled.input`
  flex: 1;
  margin-left: 8px;
  margin-right: 8px;
  border: none;
  background: none;
  outline: none;

  &::placeholder {
    color: #b0b7c3;
  }
`
