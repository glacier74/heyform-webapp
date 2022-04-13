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
      <Heading title={t('audiences.Title')} description={t('audiences.subText')} />

      <div className="py-4">
        <Navbar className="mt-4">
          <NavLink to={`/workspace/${workspaceId}/audience`}>
            {t('audiences.groups.contact')}
          </NavLink>
          <NavLink to={`/workspace/${workspaceId}/audience/group`}>
            {t('audiences.contact.addContact.groups')}
          </NavLink>
        </Navbar>

        {children}
      </div>
    </div>
  )
}
