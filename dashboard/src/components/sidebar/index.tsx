import { XIcon } from '@heroicons/react/outline'
import { CSSTransition } from '@heyforms/ui'
import type { FC } from 'react'
import { Navbar } from './Navbar'
import { UserAccount } from './UserAccount'
import { WorkspaceSwitch } from './WorkspaceSwitch'

interface SidebarProps {
  isOpen?: boolean
  onSidebarClose: () => void
  onCreateWorkspace: () => void
  onWorkspaceSettingsOpen: () => void
  onUserSettingsOpen: () => void
}

export const Sidebar: FC<SidebarProps> = ({
  isOpen = false,
  onSidebarClose,
  onCreateWorkspace,
  onWorkspaceSettingsOpen,
  onUserSettingsOpen
}) => {
  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={0}
        mountOnEnter={true}
        classNames="sidebar-popup"
        unmountOnExit={false}
        onExited={onSidebarClose}
      >
        <div className="sidebar fixed inset-0 flex z-40 md:hidden">
          <div
            className="sidebar-overlay fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-in-out"
            aria-hidden="true"
          />
          <div className="sidebar-wrapper relative flex flex-col flex-1 max-w-xs w-full h-full bg-white transform-gpu transition-transform duration-300 ease-in-out">
            <div className="flex flex-1 flex-col h-0 pt-5">
              <WorkspaceSwitch onCreateWorkspace={onCreateWorkspace} />
              <Navbar onWorkspaceSettingsOpen={onWorkspaceSettingsOpen} />
            </div>

            <UserAccount onUserSettingsOpen={onUserSettingsOpen} />

            <div className="absolute top-0 right-0 -mr-12 pt-2 md:hidden">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={onSidebarClose}
              >
                <span className="sr-only">Close sidebar</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>

      {/* Sidebar for desktop */}
      <div className="sidebar hidden md:flex md:flex-shrink-0">
        <div className="relative flex flex-col flex-1 w-64 h-full border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col h-0 pt-5">
            <WorkspaceSwitch onCreateWorkspace={onCreateWorkspace} />
            <Navbar onWorkspaceSettingsOpen={onWorkspaceSettingsOpen} />
          </div>
          <UserAccount onUserSettingsOpen={onUserSettingsOpen} />
        </div>
      </div>
    </>
  )
}
