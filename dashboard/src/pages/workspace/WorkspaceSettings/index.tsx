import { Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { Branding } from './Branding'
import { CustomDomain } from './CustomDomain'
import { DeleteWorkspace } from './DeleteWorkspace'
import { ExportData } from './ExportData'
import { LogoUploader } from './LogoUploader'

interface WorkspaceSettingsProps {
  visible?: boolean
  onClose?: () => void
}

const WorkspaceSettings: FC<WorkspaceSettingsProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Workspace Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your workspace settings</p>
        </div>

        {/* Workspace avatar */}
        <LogoUploader />

        {/* Workspace name and branding */}
        <Branding />

        {/* Custom domain */}
        <CustomDomain />

        <div className="mt-6 border-t border-t-blue-gray-200" />

        {/* Export workspace data */}
        <ExportData />

        {/* Delete workspace */}
        <DeleteWorkspace />
      </div>
    </Modal>
  )
}

export default WorkspaceSettings
