import { PlanCheck } from '@/components'
import { PlanGradeEnum } from '@/models'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import {
  CogIcon,
  CreditCardIcon,
  DocumentTextIcon,
  GiftIcon,
  HomeIcon,
  MailIcon,
  PlayIcon,
  QuestionMarkCircleIcon,
  UsersIcon
} from '@heroicons/react/outline'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

interface SidebarNavProps {
  onWorkspaceSettingsOpen: () => void
}

export const Navbar: FC<SidebarNavProps> = observer(({ onWorkspaceSettingsOpen }) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const { t } = useTranslation()
  return (
    <nav className="scrollbar flex-1 mt-5 px-2 pb-4">
      <div className="space-y-1">
        <NavLink
          to={`/workspace/${workspaceId}`}
          end={true}
          className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <HomeIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
          {t('other.labelList.Dashboard')}
        </NavLink>
        <PlanCheck permission={PlanGradeEnum.BASIC}>
          <NavLink
            to={`/workspace/${workspaceId}/member`}
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            <UsersIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
            {t('other.labelList.TeamMembers')}
          </NavLink>
        </PlanCheck>
        <NavLink
          to={`/workspace/${workspaceId}/audience`}
          className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <MailIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
          {t('other.labelList.Audiences')}
        </NavLink>
        {workspaceStore.workspace?.isOwner && (
          <>
            <NavLink
              to={`/workspace/${workspaceId}/billing`}
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <CreditCardIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
              {t('other.labelList.Billing')}
            </NavLink>
            <div
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
              onClick={onWorkspaceSettingsOpen}
            >
              <CogIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
              {t('other.labelList.Workspace')}
            </div>
          </>
        )}
      </div>

      {/* Projects */}
      <div className="mt-8">
        <h3
          className="px-3 text-xs font-semibold text-gray-900 uppercase tracking-wider"
          id="projects-headline"
        >
          {t('other.labelList.Projects')}
        </h3>
        <div className="mt-1 space-y-1" aria-labelledby="projects-headline">
          {workspaceStore.workspace?.projects.map(project => (
            <NavLink
              key={project.id}
              to={`/workspace/${workspaceId}/project/${project.id}`}
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              {project.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Resources links */}
      <div className="mt-8">
        <h3
          className="px-3 text-xs font-semibold text-gray-900 uppercase tracking-wider"
          id="resources-headline"
        >
          {t('other.labelList.Resources')}
        </h3>
        <div className="mt-1 space-y-1" aria-labelledby="resources-headline">
          <a
            href="https://help.heyform.net/create-your-first-heyform"
            target="_blank"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <PlayIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
            <span className="truncate">{t('other.labelList.GettingStarted')}</span>
          </a>
          <a
            href="https://help.heyform.net"
            target="_blank"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <QuestionMarkCircleIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
            <span className="truncate">{t('other.labelList.Help')}</span>
          </a>
          <a
            href="https://heyform.net/templates"
            target="_blank"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <DocumentTextIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
            <span className="truncate">{t('other.labelList.Template')}</span>
          </a>
          <a
            href="https://heyform.net/changelog"
            target="_blank"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <GiftIcon className="text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
            <span className="truncate">{t('other.labelList.Changelog')}</span>
          </a>
        </div>
      </div>
    </nav>
  )
})
