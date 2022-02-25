import { useParam } from '@/utils'
import { Heading, Navbar } from '@heyforms/ui'
import type { FC } from 'react'
import { NavLink } from 'react-router-dom'

const AudienceLayout: FC<IComponentProps> = ({ children }) => {
  const { workspaceId } = useParam()

  return (
    <div>
      <Heading title="Audience" description="Create the right audience for accurate results" />

      <div className="py-4">
        <Navbar className="mt-4">
          <NavLink to={`/workspace/${workspaceId}/audience`} exact>
            Contacts
          </NavLink>
          <NavLink to={`/workspace/${workspaceId}/audience/group`}>Groups</NavLink>
        </Navbar>

        {children}
      </div>
    </div>
  )
}

export default AudienceLayout
