import { useStore } from '@/store'
import { XIcon } from '@heroicons/react/outline'
import { observer } from 'mobx-react-lite'
import { CSSTransition } from 'react-transition-group'
import type { FC } from 'react'
import './index.scss'
import { Navbar } from './Navbar'
import { UserAccount } from './UserAccount'
import { WorkspaceSwitch } from './WorkspaceSwitch'

interface SidebarProps {
  onCreateWorkspace: () => void
  onWorkspaceSettingsOpen: () => void
}

export const Sidebar: FC<SidebarProps> = observer(
  ({ onCreateWorkspace, onWorkspaceSettingsOpen }) => {
    const appStore = useStore('appStore')

    function handleClose() {
      appStore.isSidebarOpen = false
    }

    function handleCreateWorkspace() {
      handleClose()
      onCreateWorkspace()
    }

    function handleOpenWorkspaceSettings() {
      handleClose()
      onWorkspaceSettingsOpen()
    }

    return (
      <>
        <CSSTransition
          in={appStore.isSidebarOpen}
          timeout={0}
          mountOnEnter={true}
          classNames="sidebar-popup"
          unmountOnExit={false}
          onExited={handleClose}
        >
          <div className="sidebar fixed inset-0 flex z-10 md:hidden">
            <div
              className="sidebar-overlay fixed inset-0 bg-slate-600 bg-opacity-75 transition-opacity duration-300 ease-in-out"
              aria-hidden="true"
            />
            <div className="sidebar-wrapper relative flex flex-col flex-1 max-w-xs w-full h-full bg-white transform-gpu transition-transform duration-300 ease-in-out">
              <div className="flex flex-1 flex-col h-0 pt-5">
                <WorkspaceSwitch onCreateWorkspace={handleCreateWorkspace} />
                <Navbar isMobile={true} onWorkspaceSettingsOpen={handleOpenWorkspaceSettings} />
              </div>

              <UserAccount />

              <div className="absolute top-0 right-0 -mr-12 pt-2 md:hidden">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </CSSTransition>

        {/* Sidebar for desktop */}
        <div className="sidebar fixed inset-0 hidden md:flex md:flex-shrink-0">
          <div className="relative flex flex-col flex-1 w-64 h-full bg-slate-100">
            <div className="flex flex-1 flex-col h-0 pt-5">
              <WorkspaceSwitch onCreateWorkspace={onCreateWorkspace} />
              <Navbar onWorkspaceSettingsOpen={onWorkspaceSettingsOpen} />
            </div>
            <UserAccount />
          </div>
        </div>
      </>
    )
  }
)
