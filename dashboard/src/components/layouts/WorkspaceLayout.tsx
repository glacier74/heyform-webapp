import UserSettings from '@/pages/user/UserSettings'
import CreateWorkspace from '@/pages/workspace/CreateWorkspace'
import WorkspaceSettings from '@/pages/workspace/WorkspaceSettings'
import { MenuIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useState } from 'react'
import { Sidebar } from '../sidebar'
import { WorkspaceGuard } from './WorkspaceGuard'

export const WorkspaceLayout: FC<IComponentProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [workspaceSettingsOpen, setWorkspaceSettingsOpen] = useState(false)
  const [userSettingsOpen, setUserSettingsOpen] = useState(false)
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false)

  function handleSidebarOpen() {
    setSidebarOpen(true)
  }

  function handleSidebarClose() {
    setSidebarOpen(false)
  }

  function handleWorkspaceSettingsOpen() {
    setWorkspaceSettingsOpen(true)
  }

  function handleWorkspaceSettingsClose() {
    setWorkspaceSettingsOpen(false)
  }

  function handleUserSettingsOpen() {
    setUserSettingsOpen(true)
  }

  function handleUserSettingsClose() {
    setUserSettingsOpen(false)
  }

  function handleCreateWorkspaceOpen() {
    setCreateWorkspaceOpen(true)
  }

  function handleCreateWorkspaceClose() {
    setCreateWorkspaceOpen(false)
  }

  return (
    <WorkspaceGuard>
      <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar
          isOpen={sidebarOpen}
          onSidebarClose={handleSidebarClose}
          onWorkspaceSettingsOpen={handleWorkspaceSettingsOpen}
          onUserSettingsOpen={handleUserSettingsOpen}
          onCreateWorkspace={handleCreateWorkspaceOpen}
        />

        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={handleSidebarOpen}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>

      {/* Workspace settings modal */}
      <WorkspaceSettings visible={workspaceSettingsOpen} onClose={handleWorkspaceSettingsClose} />

      {/* User settings modal */}
      <UserSettings visible={userSettingsOpen} onClose={handleUserSettingsClose} />

      {/* Create workspace modal */}
      <CreateWorkspace visible={createWorkspaceOpen} onClose={handleCreateWorkspaceClose} />
    </WorkspaceGuard>
  )
}
