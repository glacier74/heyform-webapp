import { useQueryURL } from '@/utils'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

interface RedirectUriLinkProps extends IComponentProps {
  href: string
}

export const RedirectUriLink: FC<RedirectUriLinkProps> = ({ href, children, ...restProps }) => {
  const to = useQueryURL(href)

  return (
    <Link to={to} {...restProps}>
      {children}
    </Link>
  )
}
