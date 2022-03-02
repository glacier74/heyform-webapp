import CreateWorkspace from '@/pages/workspace/CreateWorkspace'
import WorkspaceSettings from '@/pages/workspace/WorkspaceSettings'
import { useVisible } from '@/utils'
import { MenuIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useState } from 'react'
import { Sidebar } from '../sidebar'
import './index.scss'
import { WorkspaceGuard } from './WorkspaceGuard'

export const WorkspaceLayout: FC<IComponentProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [workspaceSettingsVisible, openWorkspaceSettings, closeWorkspaceSettings] = useVisible()
  const [createWorkspaceVisible, openCreateWorkspace, closeCreateWorkspace] = useVisible()

  function handleSidebarOpen() {
    setSidebarOpen(true)
  }

  function handleSidebarClose() {
    setSidebarOpen(false)
  }

  return (
    <WorkspaceGuard>
      <div className="w-full min-h-screen bg-white">
        <Sidebar
          isOpen={sidebarOpen}
          onSidebarClose={handleSidebarClose}
          onWorkspaceSettingsOpen={openWorkspaceSettings}
          onCreateWorkspace={openCreateWorkspace}
        />

        <div className="workspace-container">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={handleSidebarOpen}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="relative z-0 focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>

      {/* Workspace settings modal */}
      <WorkspaceSettings visible={workspaceSettingsVisible} onClose={closeWorkspaceSettings} />

      {/* Create workspace modal */}
      <CreateWorkspace visible={createWorkspaceVisible} onClose={closeCreateWorkspace} />
    </WorkspaceGuard>
  )
}
