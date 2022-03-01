import { FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { ComponentProps, Flex, message, Modal, Switch } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
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
      <Header>{t('Submission Archive')}</Header>
      <Body>
        <Description>
          {t("Disable the submission archive if you don't want HeyForm to store your submissions.")}
        </Description>
        <Switch value={value} loading={loading} disabled={loading} onChange={handleChange} />
      </Body>

      <Modal.Confirm
        visible={visible}
        title={t('Are you sure you want to disable Submission Archive?')}
        description={t(
          'Once you confirm to disable Submission Archive, all submissions will be deleted.'
        )}
        cancel={t('Cancel')}
        confirm={t('Disable')}
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
