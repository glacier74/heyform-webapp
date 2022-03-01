import { ComponentProps, TabPane, Tabs } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'
import { useLockBodyScroll } from '../../utils'
import { Portal } from '../Portal'
import { FileUploader } from './FileUploader'
import { UnsplashPicker } from './UnsplashPicker'

interface ImageUploaderProps extends ComponentProps {
  visible?: boolean
  onClose: () => void
  onChange: (url: string) => void
}

export const ImageUploader: FC<ImageUploaderProps> = ({
  visible,
  onClose,
  onChange,
  ...restProps
}) => {
  // Prevent scrolling when menu is open
  useLockBodyScroll(visible)

  return (
    <Portal visible={visible}>
      <Overlay onClick={onClose} />
      <Container {...restProps}>
        <Tabs type="bar">
          <TabPane key="upload" tab="Upload">
            <FileUploader onChange={onChange} />
          </TabPane>
          <TabPane key="unsplash" tab="Unsplash">
            <UnsplashPicker onChange={onChange} />
          </TabPane>
        </Tabs>
      </Container>
    </Portal>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(31, 35, 41, 0.6);
`

const Container = styled.div`
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

  .hey-tab-pane-list {
    margin-top: 0;
  }

  @media (max-width: 800px) {
    width: 90vw;
  }
`
