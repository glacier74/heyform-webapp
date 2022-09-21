import { useVisible } from '@/utils'
import { Modal, Switch } from '@heyforms/ui'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface SubmissionArchiveProps {
  value?: boolean
  onChange?: (value: boolean) => void
}

export const SubmissionArchive: FC<SubmissionArchiveProps> = ({ value, onChange }) => {
  const { t } = useTranslation()
  const [visible, openModal, closeModal] = useVisible()

  function handleChange(newValue: boolean) {
    if (!newValue) {
      openModal()
    } else {
      onChange?.(newValue)
    }
  }

  function handleConfirm() {
    closeModal()
    onChange?.(false)
  }

  return (
    <>
      <Switch value={value} onChange={handleChange} />

      <Modal.Confirm
        type="danger"
        visible={visible}
        title={t('formSettings.archive')}
        description={t('formSettings.archiveConfirm')}
        cancelLabel={t('formSettings.Cancel')}
        confirmLabel={t('formSettings.Confirm')}
        onClose={closeModal}
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
    </>
  )
}
