/**
 * @program: dashboard
 * @description:
 * @author: mufeng
 * @date: 1/4/22 11:21 AM
 **/
import { Button, Modal } from '@heyforms/ui'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useParam } from '@/utils'

export const SuspendedModal: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { workspaceId, projectId } = useParam()

  function handleClose() {
    navigate(`/workspace/${workspaceId}/project/${projectId}`, {
      replace: true
    })
  }

  function handleClick() {
    window.location.href = 'https://heyform.net/f/E4MKK2hx'
  }

  return (
    <Modal
      className="relative w-[480px] px-9 pt-12 pb-8"
      visible={true}
      maskClosable={false}
      onClose={handleClose}
    >
      <div>
        <h1 className="text-lg font-medium leading-6 text-slate-900">
          {t('The form is suspended')}
        </h1>
        <p className="mt-1 text-sm text-slate-700">
          If you have any questions about suspend, please click the button below to contact us.
        </p>
      </div>
      <Button type="primary" className="mt-15" block={true} onClick={handleClick}>
        {t('Contact us')}
      </Button>
    </Modal>
  )
}
