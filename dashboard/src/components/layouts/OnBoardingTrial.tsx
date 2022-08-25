import type { FC } from 'react'

export const OnBoarding: FC<IComponentProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
