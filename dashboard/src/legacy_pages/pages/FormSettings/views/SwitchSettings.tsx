import { FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { ComponentProps, Flex, Switch, message } from '@heyui/component'
import { FC, ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

interface SwitchSettingsProps extends ComponentProps {
  value?: boolean
  name: string
  title: string
  description: ReactNode
}

export const SwitchSettings: FC<SwitchSettingsProps> = ({
  value,
  name,
  title,
  description,
  ...restProps
}) => {
  const { formId } = useParam()

  const formStore = useStore('formStore')
  const [loading, setLoading] = useState(false)

  async function handleChange(value: boolean) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const updates = {
        [name]: value
      }

      await FormService.update(formId, updates)
      formStore.updateSettings(updates)

      message.success('Form settings have been successfully updated')
    } catch (err: any) {
      message.error('Failed to update form settings')
    }

    setLoading(false)
  }

  return (
    <Container {...restProps}>
      <Header>{title}</Header>
      <Body>
        <Description>{description}</Description>
        <Switch value={value} loading={loading} disabled={loading} onChange={handleChange} />
      </Body>
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
