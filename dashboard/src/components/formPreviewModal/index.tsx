import { useLockBodyScroll } from '@/legacy_pages/pages/FormBuilder/utils/hook'
import { useStore } from '@/store'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { insertThemeStyle, insertWebFont, Renderer } from '@heyforms/form-component'
import { type IFormModel } from '@heyforms/form-component/types/typings'
import { Modal, Switch } from '@heyforms/ui'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import './index.scss'

export const FormPreviewModal: FC = observer(() => {
  const appStore = useStore('appStore')
  const formStore = useStore('formStore')
  const [value, setValue] = useState('mobile')

  function handleClose() {
    appStore.isFormPreviewOpen = false
  }

  function handleChange(newValue: any) {
    setValue(newValue)
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
            <div className="flex-1 flex items-center justify-center">
              <Switch.Group
                className="text-sm"
                value={value}
                options={[
                  { value: 'desktop', label: 'Desktop' },
                  { value: 'mobile', label: 'Mobile' }
                ]}
                onChange={handleChange}
              />
            </div>
          </div>

          <div
            className={clsx('form-preview-body', {
              'form-preview-mobile': value === 'mobile'
            })}
          >
            <Renderer form={formStore.current as IFormModel} autoSave={false} />
          </div>
        </Modal>
      )}
    </>
  )
})
