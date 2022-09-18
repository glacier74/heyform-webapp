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
          <h1 className="text-lg leading-6 font-extrabold text-slate-900">
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
