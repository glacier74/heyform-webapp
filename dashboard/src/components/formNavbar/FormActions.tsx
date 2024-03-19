import { FormModel } from '@heyforms/shared-types-enums'
import { Button, notification } from '@heyforms/ui'
import { IconEye, IconSend2, IconShare } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FormService } from '@/service'
import { useStore } from '@/store'

export const FormActions = observer(() => {
  const { t } = useTranslation()

  const appStore = useStore('appStore')
  const formStore = useStore('formStore')
  const [loading, setLoading] = useState(false)

  function handlePreview() {
    appStore.isFormPreviewOpen = true
  }

  function handleShare() {
    appStore.isFormShareModalOpen = true
  }

  async function handlePublish() {
    if (loading) {
      return
    }
    setLoading(true)

    try {
      await FormService.update(formStore.current!.id, {
        active: true
      })

      formStore.updateSettings({
        active: true
      })
      appStore.isFormShareModalOpen = true
    } catch (err: any) {
      notification.error({
        title: 'Failed to publish form'
      })
    }

    setLoading(false)
  }

  return (
    <div className="mr-3 flex items-center">
      <Button.Link
        className="flex flex-col items-center justify-center !py-1 !px-1.5 !text-xs"
        leading={<IconEye className="-mr-1.5 mb-1" />}
        onClick={handlePreview}
      >
        {t('form.preview')}
      </Button.Link>

      <Button.Link
        className="flex flex-col items-center justify-center !py-1 !px-1.5 !text-xs"
        leading={<IconShare className="-mr-1.5 mb-1" />}
        onClick={handleShare}
      >
        {t('form.share')}
      </Button.Link>

      <Button.Link
        className="flex flex-col items-center justify-center !py-1 !px-1.5 !text-xs"
        leading={<IconSend2 className="-mr-1.5 mb-1" />}
        disabled={formStore.current?.settings?.active}
        onClick={handlePublish}
      >
        {formStore.current?.settings?.active ? t('form.published') : t('form.publish')}
      </Button.Link>
    </div>
  )
})
