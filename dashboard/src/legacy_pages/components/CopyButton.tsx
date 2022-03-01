import { Button, ComponentProps } from '@heyui/component'
import { FC, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'

interface CopyButtonProps extends ComponentProps {
  text: string
  duration?: number
}

export const CopyButton: FC<CopyButtonProps> = ({ text, duration = 3_000, ...restProps }) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, duration)
  }

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <Button type="primary" {...restProps}>
        {copied ? t('Copied') : t('Copy')}
      </Button>
    </CopyToClipboard>
  )
}
