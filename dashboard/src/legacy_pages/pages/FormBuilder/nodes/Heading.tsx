import { FC } from 'react'
import { BlockProps, QuestionBlock } from './Block'

interface HeadingProps extends BlockProps {
  level: number
}

export const Heading: FC<HeadingProps> = ({ field, level, ...restProps }) => {
  return (
    <QuestionBlock
      {...restProps}
      className={`block-heading-${level}`}
      field={field}
      placeholder={`Heading ${level}`}
    />
  )
}
