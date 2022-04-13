import { useLockBodyScroll } from '@/legacy_pages/pages/FormBuilder/utils/hook'
import { useStore } from '@/store'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { Renderer } from '@heyforms/form-component'
import { Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import './index.scss'

export const FormPreviewModal: FC = observer(() => {
  const appStore = useStore('appStore')
  const formStore = useStore('formStore')

  function handleClose() {
    appStore.isFormPreviewOpen = false
  }

  useLockBodyScroll(appStore.isFormPreviewOpen)

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
            <Renderer form={formStore.current} autoSave={false} />
          </div>
        </Modal>
      )}
    </>
  )
})
