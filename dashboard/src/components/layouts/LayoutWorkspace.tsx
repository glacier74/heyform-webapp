import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsync, useParam } from '@/utils'
import { Dialog, Transition } from '@headlessui/react'
import {
  CogIcon,
  CreditCardIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  UsersIcon,
  XIcon
} from '@heroicons/react/outline'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { Fragment, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthGuard } from './LayoutAuth'

const Nav: FC = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  return (
    <nav className="mt-5 flex-1 px-2 bg-white">
      <div className="space-y-1">
        <NavLink
          to={`/workspace/${workspaceId}`}
          exact={true}
          className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <HomeIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
          Dashboard
        </NavLink>
        <NavLink
          to={`/workspace/${workspaceId}/members`}
          className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <UsersIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
          Team members
        </NavLink>
        <NavLink
          to={`/workspace/${workspaceId}/audiences`}
          className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <MailIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
          Audiences
        </NavLink>
        <NavLink
          to={`/workspace/${workspaceId}/billing`}
          className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <CreditCardIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
          Billing & Subscription
        </NavLink>
        <NavLink
          to={`/workspace/${workspaceId}/settings`}
          className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <CogIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
          Workspace settings
        </NavLink>
      </div>
      <div className="mt-8">
        <h3
          className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          id="projects-headline"
        >
          Projects
        </h3>
        <div className="mt-1 space-y-1" aria-labelledby="projects-headline">
          {workspaceStore.workspace?.projects.map(project => (
            <Link
              to={`/workspace/${workspaceId}/project/${project.id}`}
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              {project.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3
          className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          id="resources-headline"
        >
          Resources
        </h3>
        <div className="mt-1 space-y-1" aria-labelledby="resources-headline">
          <a
            href="https://help.heyform.net"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span className="truncate">Getting started</span>
          </a>
          <a
            href="https://help.heyform.net"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span className="truncate">Help center</span>
          </a>
          <a
            href="https://heyform.net/templates"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span className="truncate">Template gallery</span>
          </a>
          <a
            href="https://heyform.net/changelog"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span className="truncate">Changelog</span>
          </a>
          <a
            href="https://status.heyform.net"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span className="truncate">System status</span>
          </a>
        </div>
      </div>
    </nav>
  )
})

const User: FC = observer(() => {
  const userStore = useStore('userStore')

  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <div className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img className="inline-block h-10 w-10 rounded-full" src={userStore.user.avatar} />
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
              {userStore.user.name}
            </p>
            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
              View profile
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export const WorkspaceGuard: FC<IComponentProps> = ({ children }) => {
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId, projectId } = useParam()

  useAsync(async () => {
    const result = await WorkspaceService.workspaces()
    workspaceStore.setWorkspaces(result)
  }, [])

  useEffect(() => {
    workspaceStore.selectWorkspace(workspaceId)
  }, [workspaceId])

  useEffect(() => {
    workspaceStore.selectProject(projectId)
  }, [projectId])

  return <AuthGuard>{children}</AuthGuard>
}

export const LayoutWorkspace: FC<IComponentProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <WorkspaceGuard>
      <div className="h-screen flex overflow-hidden bg-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="sidebar fixed inset-0 flex z-40 md:hidden"
            open={sidebarOpen}
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <Nav />
                </div>
                <User />
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="sidebar hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <Nav />
              </div>
              <User />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </WorkspaceGuard>
  )
}
