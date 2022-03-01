import { SettingsIcon, UploadCloudIcon } from '@/legacy_pages/components/Icons'
import { useStore } from '@/legacy_pages/utils'
import { FormModel } from '@heyforms/shared-types-enums'
import { Button, Flex } from '@heyui/component'
import { EyeIcon } from '@heyui/icon'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { useParam } from '@/utils'
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
  const history = useHistory()
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()
  const appStore = useStore('appStore')

  function handleClick() {
    appStore.toggleFormPreview(true)
  }

  function handleSettings() {
    history.push(`/workspace/${workspaceId}/project/${projectId}/form/${formId}/settings`)
  }

  return (
    <Container align="center">
      <Button size="small" ghost={true} icon={<EyeIcon />} onClick={handleClick}>
        {t('Preview')}
      </Button>

      <Button size="small" ghost={true} icon={<SettingsIcon />} onClick={handleSettings}>
        {t('Settings')}
      </Button>
    </Container>
  )
})

const Container = styled(Flex)`
  margin-right: 12px;

  button {
    margin-right: 12px;
    border: none;
    background: #f3f3f3;

    &:hover {
      box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
    }

    svg {
      width: 22px;
      height: 22px;
      margin-left: -2px;
      padding: 2px;
      color: #8a94a6;
    }
  }
`
