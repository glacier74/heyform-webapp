import { useParam } from '@/utils'
import { Heading, Navbar } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export const AudienceLayout: FC<IComponentProps> = ({ children }) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()

  return (
    <div>
      <Heading title="Audience" description="Create the right audience for accurate results"/>

      <div className="py-4">
        <Navbar className="mt-4">
          <NavLink to={`/workspace/${workspaceId}/audience`} exact>
            {t('audiences.groups.contact')}
          </NavLink>
          <NavLink to={`/workspace/${workspaceId}/audience/group`}>{t('audiences.contact.addContact.groups')}</NavLink>
        </Navbar>

        {children}
      </div>
    </div>
  )
}
