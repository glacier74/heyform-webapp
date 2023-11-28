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
import { NavLink, NavLinkProps } from 'react-router-dom'

interface SidebarNavProps {
  isMobile?: boolean
  onWorkspaceSettingsOpen: () => void
}

interface CustomLinkProps extends NavLinkProps {
  isMobile?: boolean
  onClick: () => void
}

const CustomLink: FC<CustomLinkProps> = ({ isMobile, onClick, children, ...restProps }) => {
  if (isMobile) {
    return (
      <div {...(restProps as any)} onClick={onClick}>
        {children}
      </div>
    )
  }

  return <NavLink {...restProps}>{children}</NavLink>
}

export const Navbar: FC<SidebarNavProps> = observer(
  ({ isMobile = false, onWorkspaceSettingsOpen }) => {
    const { workspaceId } = useParam()
    const workspaceStore = useStore('workspaceStore')
    const appStore = useStore('appStore')
    const { t } = useTranslation()

    function handleCloseSidebar() {
      appStore.isSidebarOpen = false
    }

    return (
      <nav className="sidebar-nav scrollbar flex-1 mt-5 px-2 pb-4">
        <div className="space-y-1">
          <CustomLink
            isMobile={isMobile}
            to={`/workspace/${workspaceId}`}
            end={true}
            className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
            onClick={handleCloseSidebar}
          >
            <HomeIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
            {t('other.labelList.Dashboard')}
          </CustomLink>
          <PlanCheck permission={PlanGradeEnum.PREMIUM}>
            <CustomLink
              isMobile={isMobile}
              to={`/workspace/${workspaceId}/member`}
              className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
              onClick={handleCloseSidebar}
            >
              <UsersIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
              {t('other.labelList.TeamMembers')}
            </CustomLink>
          </PlanCheck>
          {/* <PlanCheck permission={PlanGradeEnum.PREMIUM}>
            <CustomLink
              isMobile={isMobile}
              to={`/workspace/${workspaceId}/audience`}
              className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
              onClick={handleCloseSidebar}
            >
              <MailIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
              {t('other.labelList.Audiences')}
            </CustomLink>
          </PlanCheck> */}
          {workspaceStore.workspace?.isOwner && (
            <>
              <CustomLink
                isMobile={isMobile}
                to={`/workspace/${workspaceId}/billing`}
                className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
                onClick={handleCloseSidebar}
              >
                <CreditCardIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
                {t('other.labelList.Billing')}
              </CustomLink>
              <div
                className="text-slate-600 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
                onClick={onWorkspaceSettingsOpen}
              >
                <CogIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
                {t('other.labelList.Workspace')}
              </div>
            </>
          )}
        </div>

        {/* Projects */}
        <div className="mt-8">
          <h3
            className="px-2 mb-2 text-xs font-semibold text-slate-900 uppercase tracking-wider"
            id="projects-headline"
          >
            {t('other.labelList.Projects')}
          </h3>
          <div className="mt-1 space-y-1" aria-labelledby="projects-headline">
            {workspaceStore.workspace?.projects.map(project => (
              <CustomLink
                key={project.id}
                isMobile={isMobile}
                to={`/workspace/${workspaceId}/project/${project.id}`}
                className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
                onClick={handleCloseSidebar}
              >
                {project.name}
              </CustomLink>
            ))}
          </div>
        </div>

        {/* Resources links */}
        <div className="mt-8">
          <h3
            className="px-2 mb-2 text-xs font-semibold text-slate-900 uppercase tracking-wider"
            id="resources-headline"
          >
            {t('other.labelList.Resources')}
          </h3>
          <div className="mt-1 space-y-1" aria-labelledby="resources-headline">
            <a
              href="https://heyform.net/help/create-your-first-heyform"
              target="_blank"
              className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
            >
              <PlayIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
              <span className="truncate">{t('other.labelList.GettingStarted')}</span>
            </a>
            <a
              href="https://heyform.net/help"
              target="_blank"
              className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
            >
              <QuestionMarkCircleIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
              <span className="truncate">{t('other.labelList.Help')}</span>
            </a>
            <a
              href="https://heyform.net/templates"
              target="_blank"
              className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
            >
              <DocumentTextIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
              <span className="truncate">{t('other.labelList.Template')}</span>
            </a>
            <a
              href="https://heyform.net/changelog"
              target="_blank"
              className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
            >
              <GiftIcon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
              <span className="truncate">{t('other.labelList.Changelog')}</span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
)
