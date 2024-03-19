import { FC, ReactNode } from 'react'

interface HeadingProps extends IComponentProps {
  description?: ReactNode
}

export const Heading: FC<HeadingProps> = ({ description, children, ...restProps }) => {
  return (
    <div className="mb-6" {...restProps}>
      <div className="heading-title text-[30px] font-semibold leading-[1.4] text-[#323b4b]">
        {children}
      </div>
      {description && (
        <div className="heading-description mt-2 text-base leading-6 text-[#000000]">
          {description}
        </div>
      )}
    </div>
  )
}
