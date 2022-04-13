import { preventDefault, stopPropagation } from '@heyforms/ui'
import type { ClipboardEvent, FC, KeyboardEvent } from 'react'
import { startTransition, useCallback, useRef, useState, useEffect } from 'react'

interface TextareaProps {
  disabled?: boolean
  value?: any
  placeholder?: string
  onChange?: (value?: any) => void
}

export const Textarea: FC<TextareaProps> = ({
  value: rawValue,
  disabled,
  onChange,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [value] = useState(rawValue)
  const [isCompositing, setIsCompositing] = useState(false)

  function handleUpdate() {
    startTransition(() => {
      onChange?.(ref.current?.innerText)
    })
  }

  function handleComposition(event: any) {
    switch (event.type) {
      case 'compositionstart':
        setIsCompositing(true)
        break

      case 'compositionend':
        setIsCompositing(false)
        handleUpdate()
        break
    }
  }

  function handlePaste(event: ClipboardEvent) {
    preventDefault(event)

    const text = event.clipboardData!.getData('text/plain')
    document.execCommand('insertText', false, text)

    handleUpdate()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      preventDefault(event)

      if (e.shiftKey) {
        stopPropagation(event)
        document.execCommand('insertText', false, '\n')
      }
    }
  }

  const handleUpdateCallback = useCallback(handleUpdate, [])
  const handleCompositionCallback = useCallback(handleComposition, [isCompositing])
  const handleKeyDownCallback = useCallback(handleKeyDown, [])
  const handlePasteCallback = useCallback(handlePaste, [])

  useEffect(() => {
    if (ref.current && value) {
      ref.current.innerText = value
    }
  }, [value])

  return (
    <>
      <div
        ref={ref}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="heyform-textarea"
        placeholder="Your answer here"
        onCompositionStart={handleCompositionCallback}
        onCompositionEnd={handleCompositionCallback}
        onInput={handleUpdateCallback}
        onKeyDown={handleKeyDownCallback}
        onPaste={handlePasteCallback}
        {...restProps}
      />
      <div className="heyform-textarea-hit">Hit Shift ⇧ + Enter ↵ for new line</div>
    </>
  )
}
