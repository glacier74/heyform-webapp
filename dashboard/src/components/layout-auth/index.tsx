import type { FC } from 'react'

export const LayoutAuth: FC<IComponentProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt="HeyForm"
        />
      </div>
    </div>
  )
}
