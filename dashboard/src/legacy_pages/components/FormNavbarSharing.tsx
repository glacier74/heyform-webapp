import { SettingsIcon } from '@/legacy_pages/components/Icons'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { FormModel } from '@heyforms/shared-types-enums'
import { Button, Flex, message } from '@heyui/component'
import { EyeIcon } from '@heyui/icon'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface FormNavbarSharingProps {
  form?: FormModel
}

const SyncStatusContainer = styled(Flex)`
  margin-right: 12px;

  svg {
    width: 16px;
    height: 16px;
    color: ${props => props.theme.disabled};
  }
`

export const FormNavbarSharing: FC<FormNavbarSharingProps> = observer(({ form }) => {
  const { t } = useTranslation()
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
    } catch (err: any) {
      message.error('Failed to publish form')
    }

    setLoading(false)
  }

  return (
    <Container align="center">
      <Button size="small" ghost={true} icon={<EyeIcon />} onClick={handleClick}>
        {t('Preview')}
      </Button>

      {formStore.current?.settings?.active ? (
        <Button size="small" ghost={true} disabled={true}>
          {t('Published')}
        </Button>
      ) : (
        <Button size="small" type="primary" loading={loading} onClick={handlePublish}>
          {t('Publish')}
        </Button>
      )}
    </Container>
  )
})

const Container = styled(Flex)`
  margin-right: 12px;

  button {
    margin-right: 12px;
    border: none;

    &:hover {
      box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
    }

    &.hey-button-ghost {
      background: #f3f3f3;

      svg {
        width: 22px;
        height: 22px;
        margin-left: -2px;
        padding: 2px;
        color: #8a94a6;
      }

      &[disabled] {
        color: #37352f;
      }
    }
  }
`
