import { SearchIcon } from '@heroicons/react/outline'
import type { FC, KeyboardEvent } from 'react'
import { KeyCode } from '../utils'
import type { InputProps } from './Input'
import Input from './Input'

export interface InputSearchProps extends Omit<InputProps, 'leading' | 'onKeyDown'> {
  onSearch?: (value: string) => void
}

const Search: FC<InputSearchProps> = ({ onSearch, ...restProps }) => {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === KeyCode.ENTER) {
      onSearch && onSearch((event.target as any).value)
    }
  }

  return <Input leading={<SearchIcon />} onKeyDown={handleKeyDown} {...restProps} />
}

export default Search
