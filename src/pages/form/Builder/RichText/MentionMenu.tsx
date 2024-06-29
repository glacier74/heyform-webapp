import { FieldKindEnum, HiddenField, Variable } from '@heyform-inc/shared-types-enums'
import { helper } from '@heyform-inc/utils'
import type { CSSProperties, FC } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { Portal } from '@/components'
import { CUSTOM_FIELDS_CONFIGS, VARIABLE_KIND_CONFIGS } from '@/consts'
import { FormFieldType } from '@/types'

import { QuestionIcon } from '../LeftSidebar/QuestionList'
import { useStoreContext } from '../store'

interface MentionMenuProps {
  visible?: boolean
  keyword?: string
  portalStyle?: CSSProperties
  onClose?: () => void
  onComplete?: (type: string, option: Partial<FormFieldType> | HiddenField | Variable) => void
}

export const MentionMenu: FC<MentionMenuProps> = ({
  visible,
  keyword,
  portalStyle,
  onClose,
  onComplete
}) => {
  const { state } = useStoreContext()
  const [questions, setQuestions] = useState<Partial<FormFieldType>[]>([])
  const [hiddenFields, setHiddenFields] = useState<HiddenField[]>([])
  const [variables, setVariables] = useState<Variable[]>([])

  function handleClose() {
    onClose?.()
  }

  function handleSelect(id: string) {
    let option: Partial<FormFieldType> | HiddenField | Variable | undefined = state.variables?.find(
      v => v.id === id
    )
    let type = 'variable'

    if (!option) {
      option = state.hiddenFields?.find(h => h.id === id)

      if (option) {
        type = 'hiddenfield'
      } else {
        type = 'mention'
        option = state.references.find(r => r.id === id)!
      }
    }

    onComplete?.(type, option)
    handleClose()
  }

  // Filter questions by keyword
  useEffect(() => {
    if (visible) {
      let newQuestions = state.references
      let newVariables = state.variables || []
      let newHiddenFields = state.hiddenFields || []

      if (helper.isValid(keyword)) {
        const lowerKeyword = keyword!.toLowerCase()

        newQuestions = state.references.filter(row =>
          (row.title as string).toLowerCase().includes(lowerKeyword)
        )

        newHiddenFields = state.hiddenFields.filter(row =>
          (row.name as string).toLowerCase().includes(lowerKeyword)
        )

        newVariables = (state.variables || []).filter(row =>
          row.name.toLowerCase().includes(lowerKeyword)
        )
      }

      setQuestions(newQuestions)
      setHiddenFields(newHiddenFields)
      setVariables(newVariables)
    }
  }, [state.references, state.variables, keyword, visible, state.hiddenFields])

  const memoPortal = useMemo(
    () => (
      <div className="mention-menu">
        <div className="mention-menu-mask" onClick={onClose} />
        <div
          className="mention-menu-container scrollbar isolate z-10 w-max min-w-52 overflow-y-auto rounded-xl bg-foreground p-1 shadow-lg outline outline-1 outline-transparent ring-1 ring-accent-light animate-in fade-in-0 zoom-in-95 focus:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          style={portalStyle}
        >
          {questions.length > 0 || variables.length > 0 || hiddenFields.length > 0 ? (
            <div className="space-y-3 py-2">
              {questions.length > 0 && (
                <div>
                  <div className="px-3.5 text-sm/6 text-secondary sm:px-3">Mention a question</div>
                  {questions.map(row => (
                    <div
                      key={row.id}
                      className="flex cursor-pointer items-center gap-x-2 rounded-lg border-0 px-3.5 py-2.5 text-left text-base/6 outline-none hover:bg-input disabled:opacity-60 sm:px-3 sm:py-1.5 sm:text-sm/6"
                      onClick={() => handleSelect(row.id!)}
                    >
                      <QuestionIcon
                        className="insert-field-item-icon mr-3 flex-shrink-0"
                        kind={row.kind!}
                      />
                      <span>{row.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {hiddenFields.length > 0 && (
                <div>
                  <div className="px-3.5 text-sm/6 text-secondary sm:px-3">
                    Mention a hidden field
                  </div>
                  {hiddenFields.map(row => (
                    <div
                      key={row.id}
                      className="flex cursor-pointer items-center gap-x-2 rounded-lg border-0 px-3.5 py-2.5 text-left text-base/6 outline-none hover:bg-input disabled:opacity-60 sm:px-3 sm:py-1.5 sm:text-sm/6"
                      onClick={() => handleSelect(row.id)}
                    >
                      <QuestionIcon
                        className="insert-field-item-icon mr-3 flex-shrink-0"
                        kind={FieldKindEnum.HIDDEN_FIELDS}
                        configs={CUSTOM_FIELDS_CONFIGS}
                      />
                      <span>{row.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {variables.length > 0 && (
                <div>
                  <div className="px-3.5 text-sm/6 text-secondary sm:px-3">Mention a variable</div>
                  {variables.map(row => (
                    <div
                      key={row.id}
                      className="flex cursor-pointer items-center gap-x-2 rounded-lg border-0 px-3.5 py-2.5 text-left text-base/6 outline-none hover:bg-input disabled:opacity-60 sm:px-3 sm:py-1.5 sm:text-sm/6"
                      onClick={() => handleSelect(row.id)}
                    >
                      <QuestionIcon
                        className="insert-field-item-icon mr-3 flex-shrink-0"
                        kind={row.kind as FieldKindEnum}
                        configs={VARIABLE_KIND_CONFIGS}
                      />
                      <span>{row.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>No results found.</div>
          )}
        </div>
      </div>
    ),
    [portalStyle, questions]
  )

  return <Portal visible={visible}>{memoPortal}</Portal>
}
