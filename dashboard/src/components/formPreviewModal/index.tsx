import { useLockBodyScroll } from '@/legacy_pages/pages/FormBuilder/utils/hook'
import { useStore } from '@/store'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { initI18n, insertThemeStyle, insertWebFont, Renderer } from '@heyforms/form-component'
import { type IFormModel } from '@heyforms/form-component/types/typings'
import { Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect } from 'react'
import './index.scss'

initI18n()

export const FormPreviewModal: FC = observer(() => {
  const appStore = useStore('appStore')
  const formStore = useStore('formStore')

  function handleClose() {
    appStore.isFormPreviewOpen = false
  }

  useLockBodyScroll(appStore.isFormPreviewOpen)

  useEffect(() => {
    if (appStore.isFormPreviewOpen && formStore.current) {
      insertWebFont(formStore.customTheme!.fontFamily)
      insertThemeStyle(formStore.customTheme!)
    }
  }, [appStore.isFormPreviewOpen, formStore.current])

  return (
    <>
      {appStore.isFormPreviewOpen && formStore.current && (
        <Modal
          className="form-preview-modal"
          visible={true}
          maskClosable={false}
          showCloseIcon={false}
        >
          <div className="form-preview-header">
            <div className="flex items-center ml-4 cursor-pointer" onClick={handleClose}>
              <ArrowLeftIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 text-center">Preview</div>
          </div>

          <div className="form-preview-body">
            <Renderer form={formStore.current as IFormModel} autoSave={false} />
          </div>
        </Modal>
      )}
    </>
  )
})
