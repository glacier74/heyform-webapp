/**
 * @program: dashboard
 * @description:
 * @author: mufeng
 * @date: 1/4/22 11:21 AM
 **/

import { DangerIcon } from '@/legacy_pages/components/DangerIcon'
import { Button, Modal } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

export const SuspendedModal: FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { workspaceId, projectId } = useParam()

  function handleClose() {
    history.replace(`/workspace/${workspaceId}/project/${projectId}`)
  }

  function handleClick() {
    window.location.href = 'https://my.heyform.net/f/E4MKK2hx'
  }

  return (
    <StyledModal
      icon={<DangerIcon />}
      title={t('The form is suspended')}
      description="If you have any questions about suspend, please click the button below to contact us."
      visible={true}
      maskClosable={false}
      onClose={handleClose}
    >
      <Button type="primary" block={true} style={{ marginTop: 60 }} onClick={handleClick}>
        {t('Contact us')}
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
