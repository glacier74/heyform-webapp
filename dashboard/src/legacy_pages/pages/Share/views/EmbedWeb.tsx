import {
  CodeFillIcon,
  EmbedPopoverIcon,
  EmbedPopupIcon,
  EmbedSideTabIcon,
  EmbedStandardIcon
} from '@/legacy_pages/components/Icons'
import { EmbedModeEnums } from '@/legacy_pages/constants'
import { EmbedWebModal } from '@/legacy_pages/pages/Share/views/EmbedWebModal'
import { Flex } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const EMBED_OPTIONS = [
  {
    mode: EmbedModeEnums.STANDARD,
    title: 'Standard',
    description: 'Present HeyForm as part of your website',
    icon: <EmbedStandardIcon />
  },
  {
    mode: EmbedModeEnums.POPUP,
    title: 'Popup',
    description: 'HeyForm pops up in the center of the screen.',
    icon: <EmbedPopupIcon />
  },
  {
    mode: EmbedModeEnums.POPUP_OVER,
    title: 'Popup over',
    description: 'Floating popover when hits the button on the right corner.',
    icon: <EmbedPopoverIcon />
  },
  {
    mode: EmbedModeEnums.SIDE_TAB,
    title: 'Side tab',
    description: 'Floating panel when hits the button on the right edge.',
    icon: <EmbedSideTabIcon />
  }
]

export const EmbedWeb: FC = () => {
  const { t } = useTranslation()
  const [mode, setMode] = useState(EmbedModeEnums.STANDARD)
  const [visible, setVisible] = useState(false)

  function handleClick(mode: EmbedModeEnums) {
    setMode(mode)
    setVisible(true)
  }

  return (
    <Container>
      <Header align="center">
        <CodeFillIcon />
        <span>{t('Embed in a web page')}</span>
      </Header>

      <ModeWrapper justify="space-between">
        {EMBED_OPTIONS.map(row => (
          <ModeItem key={row.mode} onClick={() => handleClick(row.mode)}>
            {row.icon}
            <ModeTitle>{t(row.title)}</ModeTitle>
            <ModeDescription>{t(row.description)}</ModeDescription>
          </ModeItem>
        ))}
      </ModeWrapper>

      <EmbedWebModal
        mode={mode}
        visible={visible}
        onModeChange={setMode}
        onVisibleChange={setVisible}
      />
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  padding: 34px;
  background: #fff;
`

const Header = styled(Flex)`
  margin-bottom: 32px;

  svg {
    width: 24px;
    height: 24px;
    color: #b0b7c3;
  }

  span {
    margin-left: 12px;
    font-size: 16px;
  }
`

const ModeWrapper = styled(Flex)``

const ModeItem = styled.div`
  width: 220px;
  padding: 20px;
  background: #fafbfc;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
  }

  svg {
    width: 30px;
    height: 30px;
    color: #b0b7c3;
  }
`

const ModeTitle = styled.div`
  margin-top: 12px;
`

const ModeDescription = styled.div`
  margin-top: 8px;
  color: #8a94a6;
`
