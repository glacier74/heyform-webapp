import { BoldIcon, ItalicIcon, LinkIcon, UnderlineIcon, UnlinkIcon } from '@/components'
import { Button, Portal } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import type { CSSProperties, FC } from 'react'
import { useEffect, useState } from 'react'
import { getRangeSelection, getStyleFromRect } from './utils'

interface FloatingToolbarProps extends Omit<IComponentProps, 'onChange'>, IModalProps {
  range?: Range
  onChange: () => void
}

export const FloatingToolbar: FC<FloatingToolbarProps> = ({
  visible,
  range,
  onChange,
  onClose,
  ...restProps
}) => {
  const [portalStyle, setPortalStyle] = useState<CSSProperties>()

  function handleBold() {
    document.execCommand('bold')
    onChange()
  }

  function handleItalic() {
    document.execCommand('italic')
    onChange()
  }

  function handleUnderline() {
    document.execCommand('underline')
    onChange()
  }

  function handleLinkOpen() {}

  function handleLink({ url }: any) {
    const sel = getRangeSelection(range!)
    const node = document.createElement('a')

    node.setAttribute('href', url)
    node.setAttribute('target', '_blank')
    node.innerText = sel!.toString()

    range!.deleteContents()
    range!.insertNode(node)

    onChange()
  }

  function handleUnlink() {
    document.execCommand('unlink')
    onChange()
  }

  useEffect(() => {
    if (isValid(range) && range instanceof Range) {
      setPortalStyle(getStyleFromRect(range!.getBoundingClientRect()))
    }
  }, [range])

  return (
    <Portal visible={visible}>
      <div className="floating-toolbar">
        <div className="floating-toolbar-mask" onClick={onClose} />
        <div
          className="floating-toolbar-container flex items-center px-1 py-0.5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={portalStyle}
          {...restProps}
        >
          <Button.Link leading={<BoldIcon className="text-gray-700" />} onClick={handleBold} />
          <Button.Link leading={<ItalicIcon className="text-gray-700" />} onClick={handleItalic} />
          <Button.Link
            leading={<UnderlineIcon className="text-gray-700" />}
            onClick={handleUnderline}
          />
          {/* TODO - add link support */}
          {/*<Button.Link leading={<LinkIcon className="text-gray-700" />} />*/}
          {/*<Button.Link leading={<UnlinkIcon className="text-gray-700" />} />*/}
        </div>
      </div>
    </Portal>
  )
}
