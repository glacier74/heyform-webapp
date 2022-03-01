import { ColorPickerProps } from '@/legacy_pages/components/ColorPicker'
import { AddImageIcon } from '@/legacy_pages/components/Icons'
import { Button, Dropdown, isURL, stopPropagation, TabPane, Tabs } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { UnsplashPicker } from './UnsplashPicker'
import { Uploader } from './Uploader'

interface ImagePickerProps extends ColorPickerProps {
  onSelect: () => void
}

export const ImagePicker: FC<ImagePickerProps> = ({
  value,
  onChange,
  onSelect,
  onClose,
  ...restProps
}) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  function handleSelect(src: string) {
    handleChange(src)
    onSelect()
  }

  function handleUpload(src: string) {
    handleChange(src)
    setVisible(false)
    onSelect()
  }

  function handleRemove() {
    handleChange('')
    setVisible(false)
    onSelect()
  }

  function handleChange(src: string) {
    onChange && onChange(src)
  }

  function handleVisibleChange(visible: boolean) {
    setVisible(visible)

    if (!visible) {
      onClose && onClose()
    }
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
    <>
      {isURL(value) ? (
        <RemoveButton onClick={handleRemove}>{t('Remove')}</RemoveButton>
      ) : (
        <Dropdown
          placement="right"
          offset={{
            left: 12
          }}
          visible={visible}
          overlay={Overlay}
          onVisibleChange={handleVisibleChange}
        >
          <Trigger icon={<AddImageIcon />} {...restProps}>
            {t('Select photo')}
          </Trigger>
        </Dropdown>
      )}
    </>
  )
}

const Trigger = styled(Button)`
  height: 32px;
  padding: 0 12px;
  background: #f3f3f3;
  color: #4e5d78;
  border: none;
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

const RemoveButton = styled(Button)`
  height: 32px;
  padding: 0 12px;
  background: #f3f3f3;
  color: #4e5d78;
  border: none;
`
