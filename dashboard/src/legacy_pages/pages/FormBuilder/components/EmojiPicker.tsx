import { ComponentProps, Flex, TabPane, Tabs } from '@heyui/component'
import { isURL } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { useLockBodyScroll } from '../utils'
import { EMOJI_NAMES } from './BlockOptions'
import { EmojiIcon } from './Icons'
import { Portal } from './Portal'

interface EmojiPickerProps extends ComponentProps {
  value?: string
  onChange?: (value: string) => void
}

interface EmojiImageProps extends ComponentProps {
  name: string
  onClick: (value: string) => void
}

const EmojiImage: FC<EmojiImageProps> = ({ name, onClick }) => {
  const value = `https://cdn.heyformhq.com/emoji/${name}.png`

  function handleClick() {
    onClick(value)
  }

  return (
    <EmojiImageWrapper align="center" justify="center" onClick={handleClick}>
      <img src={`${value}?imageView2/0/w/60/h/60`} />
    </EmojiImageWrapper>
  )
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ value, onChange, ...resetProps }) => {
  const [visible, setVisible] = useState(false)

  function handleClick(value: string) {
    setVisible(false)
    onChange && onChange(value)
  }

  // Prevent scrolling when menu is open
  useLockBodyScroll(visible)

  return (
    <>
      <Container align="center" justify="center" onClick={() => setVisible(true)} {...resetProps}>
        {isURL(value) ? <img src={value} /> : <EmojiIcon />}
      </Container>

      <Portal visible={visible}>
        <Overlay onClick={() => setVisible(false)} />
        <EmojiContainer>
          <Tabs type="bar">
            <TabPane key="emoji" tab="Select Emoji">
              {EMOJI_NAMES.map(name => (
                <EmojiImage key={name} name={name} onClick={handleClick} />
              ))}
            </TabPane>
          </Tabs>
        </EmojiContainer>
      </Portal>
    </>
  )
}

const Container = styled(Flex)`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #f3f3f3;
  }

  img,
  svg {
    width: 80px;
    height: 80px;
  }

  svg {
    color: rgba(0, 0, 0, 0.3);
  }
`

const EmojiImageWrapper = styled(Container)`
  width: 70px;
  height: 70px;
  flex: 0 0 10%;
  padding: 5px;

  img {
    width: 36px;
    height: 36px;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(31, 35, 41, 0.6);
`

const EmojiContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 700px;
  max-height: 90vh;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(60, 66, 87, 0.05) 0px 0px 0px 1px, rgba(60, 66, 87, 0.1) 0px 3px 6px,
    rgba(60, 66, 87, 0.2) 0px 9px 24px;
  overflow-y: auto;
  z-index: 10000;

  .hey-tab-list {
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid rgb(238, 238, 238);
  }

  .hey-tab-nav {
    padding: 10px 0;
    margin-right: 24px;
    color: #000;
    line-height: 20px;
    font-weight: 500;
    transition: all 0.3s;

    &:after {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      content: '';
      background: transparent;
    }

    &:hover {
      color: #3169ea;
    }
  }

  .hey-tab-nav-active {
    color: #3169ea;

    &:after {
      background: #3169ea;
    }
  }

  .hey-tab-pane {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .hey-tab-pane-list {
    margin-top: 0;
    height: 440px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`
