import type { FC } from 'react'

export const WechatIcon: FC<IComponentProps<HTMLOrSVGElement>> = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M6 1C2.686 1 0 3.239 0 6c0 1.592.898 3.004 2.291 3.918L1.5 11.5l2.155-.923c.462.164.942.299 1.455.362A4.187 4.187 0 0 1 5 10c0-2.757 2.691-5 6-5 .303 0 .599.025.891.061C11.363 2.749 8.928 1 6 1zM4 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm4 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"
      />
      <path
        fill="currentColor"
        d="M16 10c0-2.209-2.239-4-5-4s-5 1.791-5 4 2.239 4 5 4c.454 0 .886-.064 1.305-.155L15 15l-.932-1.863C15.236 12.405 16 11.279 16 10zm-6.5-.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm3 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"
      />
    </svg>
  )
}
