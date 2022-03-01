/**
 * @program: dashboard
 * @description:
 * @author: mufeng
 * @date: 12/28/21 4:21 PM
 **/

import { DangerIcon } from '@/legacy_pages/components/DangerIcon'
import { UserService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { Button, message, Modal, ModalProps } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const CancelDeletionModal: FC<ModalProps> = ({ visible, onClose, onVisibleChange }) => {
  const { t } = useTranslation()
  const userStore = useStore('userStore')
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await UserService.cancelUserDeletion()

      userStore.updateDetails({
        isDeletionScheduled: false,
        deletionScheduledAt: 0
      })

      message.success('Your account is no longer scheduled for deletion')
      onClose && onClose()
    } catch (err: any) {
      message.error(err.message)
    }

    setLoading(false)
  }

  return (
    <StyledModal
      icon={<DangerIcon />}
      title={t('Your account has been scheduled for deletion')}
      description={
        <>
          <p>
            {t(
              'All of your account data, including but not limited to workspaces, projects, forms and submissions will be permanently deleted within 48 hours of the deletion request.'
            )}
          </p>
          <p>
            {t('If this was done in error, you can cancel the deletion of your account below.')}
          </p>
        </>
      }
      visible={visible}
      maskClosable={false}
      onVisibleChange={onVisibleChange}
      onClose={onClose}
    >
      <Button type="error" block={true} loading={loading} onClick={handleClick}>
        {t('Cancel scheduled deletion')}
      </Button>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  position: relative;
  width: 480px;
  padding: 48px 36px 32px 36px;
  border-radius: 3px;

  .hey-input input {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`
