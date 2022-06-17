import { AddIcon, DeleteIcon } from '@/legacy_pages/components/Icons'
import { UnsplashPicker } from '@/legacy_pages/components/ImagePicker/UnsplashPicker'
import { Uploader } from '@/legacy_pages/components/ImagePicker/Uploader'
import { Dropdown, Flex, Image, InputStyle, stopPropagation, TabPane, Tabs } from '@heyui/component'
import { FC, useState } from 'react'
import styled from 'styled-components'

interface ImageUploaderProps {
  value?: string
  onChange?: (value?: string) => void
  onClose?: () => void
}

export const ImageUploader: FC<ImageUploaderProps> = ({ value, onChange, onClose }) => {
  const [visible, setVisible] = useState(false)

  function handleRemove() {
    onChange && onChange(undefined)
    onClose && onClose()
  }

  function handleSelect(src: string) {
    onChange && onChange(src)
  }

  function handleUpload(src: string) {
    onChange && onChange(src)
    onClose && onClose()
  }

  const Overlay = (
    <OverlayContainer onClick={stopPropagation}>
      <Tabs>
        <TabPane key="unsplash" tab="Unsplash">
          <UnsplashPicker onSelect={handleSelect} />
        </TabPane>
        <TabPane key="upload" tab="Upload a image">
          <Uploader onUpload={handleUpload} />
        </TabPane>
      </Tabs>
    </OverlayContainer>
  )

  return (
    <Container align="center">
      {value ? (
        <StyledFlex align="center" justify="space-between" onClick={handleRemove}>
          <StyledImage url={value} width={60} height={60} fit="cover" />
          <DeleteIcon />
        </StyledFlex>
      ) : (
        <Dropdown
          placement="right"
          offset={{
            left: 12
          }}
          visible={visible}
          overlay={Overlay}
          onVisibleChange={setVisible}
        >
          <StyledFlex align="center">
            <AddIcon />
            <span>Add</span>
          </StyledFlex>
        </Dropdown>
      )}
    </Container>
  )
}

const Container = styled(Flex)`
  ${InputStyle};
  position: relative;
  width: auto;
  height: 38px;
  margin-right: 12px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 150ms;

  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.theme.disabled};
  }
`

const StyledImage = styled(Image)`
  margin-right: 8px;
  width: 26px;
  height: 26px;

  img {
    border-radius: ${props => props.theme.borderRadius};
    background: ${props => props.theme.deepBackground};
  }
`

const OverlayContainer = styled.div`
  width: 440px;
  background: #fff;
  box-shadow: 0 3px 12px 2px rgb(55 60 67 / 12%);
  overflow: hidden auto;

  .hey-tab-list {
    margin: 20px;
    padding: 6px;
    background-color: #f5f6f7;
  }

  .hey-tab-nav {
    flex: 1;
    border: none;
    background: none;
    color: #8a94a6;
    padding: 6px 0;
    text-align: center;
    font-weight: 400;

    &:hover {
      color: #4e5d78;
    }
  }

  .hey-tab-nav-active {
    background: #fff;
    color: #4e5d78;
  }

  .hey-tab-pane-list {
    margin-top: 0;
    color: #4e5d78;
  }
`

const StyledFlex = styled(Flex)`
  width: 3.75rem;

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    margin-left: 8px;
  }
`
