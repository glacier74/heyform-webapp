import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { FormModel } from '@heyforms/shared-types-enums'
import { Flex, message } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface FormNavbarSharingProps {
  form?: FormModel
}

export const FormNavbarSharing: FC<FormNavbarSharingProps> = observer(({ form }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const appStore = useStore('appStore')
  const formStore = useStore('formStore')
  const [loading, setLoading] = useState(false)

  function handleClick() {
    appStore.isFormPreviewOpen = true
  }

  async function handlePublish() {
    if (loading) {
      return
    }
    setLoading(true)

    try {
      await FormService.update(form!.id, {
        active: true
      })
      formStore.updateSettings({
        active: true
      })
      navigate(`/workspace/${form?.teamId}/project/${form?.projectId}/form/${form?.id}/share`)
    } catch (err: any) {
      message.error('Failed to publish form')
    }

    setLoading(false)
  }

  return (
    <Container align="center">
      <div className="text-xs mx-6 text-slate-700">
        <button onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mx-auto mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <p>Preview</p>
        </button>
      </div>

      {formStore.current?.settings?.active ? (
        <div className="text-xs mx-6 text-slate-300">
          <button disabled={true}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-auto mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <p>{t('form.published')}</p>
          </button>
        </div>
      ) : (
        <div className="text-xs mx-6 text-slate-700">
          <button loading={loading} onClick={handlePublish}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-auto mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <p>{t('form.publish')}</p>
          </button>
        </div>
      )}
    </Container>
  )
})

const Container = styled(Flex)`
  margin-right: 12px;
`
