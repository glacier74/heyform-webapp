import { Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Branding } from './Branding'
import { CustomDomain } from './CustomDomain'
import { DeleteWorkspace } from './DeleteWorkspace'
import { ExportData } from './ExportData'
import { LogoUploader } from './LogoUploader'

const WorkspaceSettings: FC<IModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation()
  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg font-extrabold leading-6 text-slate-900">
            {t('workspace.settings.WorkSettings')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t('workspace.settings.subTitle')}</p>
        </div>

        {/* Workspace avatar */}
        <LogoUploader />

        {/* Workspace name and branding */}
        <Branding />

        {/* Custom domain */}
        <CustomDomain />

        <div className="border-t-blue-gray-200 mt-6 border-t" />

        {/* Export workspace data */}
        <ExportData />

        {/* Delete workspace */}
        <DeleteWorkspace />
      </div>
    </Modal>
  )
}

export default WorkspaceSettings
