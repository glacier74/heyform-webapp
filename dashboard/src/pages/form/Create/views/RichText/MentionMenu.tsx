import { SearchIcon } from '@heroicons/react/outline'
import type { FormField } from '@heyforms/shared-types-enums'
import { Menus, Portal } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import type { CSSProperties, FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useStoreContext } from '../../store'
import { FieldIcon } from '../FieldIcon'

interface MentionMenuProps extends IModalProps {
  keyword?: string
  portalStyle?: CSSProperties
}

export const MentionMenu: FC<MentionMenuProps> = ({
  visible,
  keyword,
  portalStyle,
  onClose,
  onComplete
}) => {
  const { state } = useStoreContext()
  const [questions, setQuestions] = useState<Partial<FormField>[]>([])

  function handleClose() {
    onClose?.()
  }

  function handleSelect(id?: IKeyType) {
    onComplete?.(state.references.find(r => r.id === id))
    handleClose()
  }

  // Filter questions by keyword
  useEffect(() => {
    if (visible) {
      let result = state.references

      if (isValid(keyword)) {
        result = state.references.filter(row =>
          (row.title as string).toLowerCase().includes(keyword!.toLowerCase())
        )
      }

      setQuestions(result)
    }
  }, [state.references, keyword, visible])

  const memoPortal = useMemo(
    () => (
      <div className="mention-menu">
        <div className="mention-menu-mask" onClick={onClose} />
        <Menus
          className="mention-menu-container scrollbar"
          style={portalStyle}
          onExited={onClose}
          onClick={handleSelect}
        >
          {questions.length > 0 ? (
            <>
              <Menus.Label label="Mention other question" />
              {questions.map(row => (
                <Menus.Item
                  key={row.id}
                  name={row.id}
                  icon={
                    <FieldIcon
                      className="insert-field-item-icon mr-3 flex-shrink-0"
                      kind={row.kind!}
                    />
                  }
                  label={row.title}
                />
              ))}
            </>
          ) : (
            <Menus.Item icon={<SearchIcon />} label="No questions found" />
          )}
          <Menus.Divider />
          <Menus.Item label="Learn about mention" />
        </Menus>
      </div>
    ),
    [portalStyle, questions]
  )

  return <Portal visible={visible}>{memoPortal}</Portal>
}
