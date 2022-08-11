import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { ComponentProps, Flex, message, Modal, Switch } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface ArchiveSettingsProps extends ComponentProps {
  value?: boolean
}

export const ArchiveSettings: FC<ArchiveSettingsProps> = ({ value, ...restProps }) => {
  const { t } = useTranslation()
  const { formId } = useParam()

  const formStore = useStore('formStore')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  function handleChange(value: boolean) {
    value ? request(true) : setVisible(true)
  }

  function handleCancel() {
    if (!loading) {
      setVisible(false)
    }
  }

  function handleConfirm() {
    request(false).then(() => setVisible(false))
  }

  async function request(value: boolean) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await FormService.updateArchive(formId, value)
      formStore.updateSettings({
        allowArchive: value
      })
    } catch (err: any) {
      message.error('Failed to update form settings')
    }

    setLoading(false)
  }

  return (
    <Container {...restProps}>
      <Header>{t('formSettings.subArchive')}</Header>
      <Body>
        <Description>{t('formSettings.archiveText')}</Description>
        <Switch value={value} loading={loading} disabled={loading} onChange={handleChange} />
      </Body>

      <Modal.Confirm
        visible={visible}
        title={t('formSettings.archive')}
        description={t('formSettings.archiveConfirm')}
        cancel={t('formSettings.Cancel')}
        confirm={t('formSettings.Disable')}
        confirmType="error"
        confirmLoading={loading}
        onVisibleChange={setVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 24px;
`

const Header = styled.div`
  color: #4e5d78;
`

const Body = styled(Flex)`
  margin-top: 4px;
`

const Description = styled.div`
  flex: 1;
  margin-right: 16px;
  color: #8a94a6;
  font-size: 13px;
`
