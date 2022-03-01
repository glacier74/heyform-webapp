import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const PictureIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path fill="#fff" fillOpacity="0.01" d="M0 0h48v48H0V0z"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M39 6H9a3 3 0 00-3 3v30a3 3 0 003 3h30a3 3 0 003-3V9a3 3 0 00-3-3z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M18 13v-2 2zm13.033 13.272l1.64-1.144-1.64 1.144zm8.775 12.584l1.64-1.143v-.001l-1.64 1.144zM16 42l-1.602-1.197A2 2 0 0016 44v-2zm2-17a7 7 0 007-7h-4a3 3 0 01-3 3v4zm7-7a7 7 0 00-7-7v4a3 3 0 013 3h4zm-7-7a7 7 0 00-7 7h4a3 3 0 013-3v-4zm-7 7a7 7 0 007 7v-4a3 3 0 01-3-3h-4zm18.393 9.416l.064-4a4 4 0 00-3.27 1.608l3.206 2.392zm0 0l3.28-2.288a4 4 0 00-3.216-1.711l-.064 4zm0 0L38.166 40l3.282-2.288-8.776-12.584-3.28 2.288zm8.774 12.583l.006.01c.001.002 0 .001 0 0a.053.053 0 01-.002-.014v-.004a.046.046 0 01-.01.017l.004-.002a.055.055 0 01.013-.006h.002-.012v4c3.232 0 5.128-3.636 3.28-6.287l-3.28 2.286zm.001.001H16v4h22.168v-4zm-20.566 3.197l11.79-15.78-3.204-2.394-11.79 15.78 3.204 2.394z"
      ></path>
    </svg>
  )
}
