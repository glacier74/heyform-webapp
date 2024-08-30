import {
  Button,
  CHAR_A_KEY_CODE,
  Input,
  InputRef,
  preventDefault
} from '@heyform-inc/form-renderer'
import { Choice } from '@heyform-inc/shared-types-enums'
import { clone, helper, nanoid } from '@heyform-inc/utils'
import { IconX } from '@tabler/icons-react'
import { FC, KeyboardEvent, Ref, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { nextTick } from '@/utils'

import { useStoreContext } from '../../store'
import type { BlockProps } from './Block'
import { Block } from './Block'

interface MultipleChoiceItemProps {
  ref?: Ref<InputRef>
  index: number
  choice: Choice
  isOther?: boolean
  enableRemove?: boolean
  onRemove: (id: string) => void
  onChange?: (id: string, label: string) => void
  onEnter?: (id: string) => void
  onUp?: (id: string) => void
  onDown?: (id: string) => void
}

const MultipleChoiceItem: FC<MultipleChoiceItemProps> = ({
  ref,
  index,
  choice,
  isOther,
  enableRemove,
  onRemove,
  onChange,
  onEnter,
  onUp,
  onDown
}) => {
  const { t } = useTranslation()
  const [isFocused, setIsFocused] = useState(false)

  function handleRemove() {
    onRemove(choice.id)
  }

  function handleChange(value: Any) {
    onChange?.(choice.id, value)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  function handleFocus() {
    setIsFocused(true)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, isCompositionStart: boolean) {
    if (!isCompositionStart) {
      switch (event.key) {
        case 'Enter':
          return onEnter?.(choice.id)

        case 'Backspace':
          if ((event.target as HTMLInputElement).value === '') {
            preventDefault(event)
            handleRemove()
          }
          return

        case 'ArrowUp':
          return onUp?.(choice.id)

        case 'ArrowDown':
          return onDown?.(choice.id)
      }
    }
  }

  return (
    <div className="heyform-radio">
      <div className="heyform-radio-container">
        <div className="heyform-radio-content">
          <div className="heyform-radio-hotkey">{String.fromCharCode(CHAR_A_KEY_CODE + index)}</div>
          <div className="heyform-radio-label">
            {isOther ? (
              <div className="heyform-radio-label-other cursor-default">{choice.label}</div>
            ) : (
              <Input
                ref={ref}
                value={choice.label}
                placeholder={isFocused ? t('form.builder.compose.choicePlaceholder') : undefined}
                autoFocus
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            )}
          </div>
          {enableRemove && (
            <div className="heyform-radio-remove" onClick={handleRemove}>
              <IconX />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const MultipleChoice: FC<BlockProps> = ({ field, locale, ...restProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useStoreContext()

  const refs = useRef<AnyMap<string, InputRef | null>>({}).current

  function handleAddChoice(index?: number) {
    const choices = clone(field.properties?.choices || [])
    const id = nanoid()

    choices.splice(index === undefined ? choices.length : index, 0, {
      id,
      label: ''
    })

    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            choices
          }
        }
      }
    })

    nextTick(() => {
      refs[id]?.focus()
    })
  }

  function findChoiceIndex(choices: Choice[] | undefined, id: string) {
    if (helper.isEmpty(choices)) {
      return -1
    }

    return choices!.findIndex(c => c.id === id)
  }

  function handleChoiceRemove(id: string) {
    const isOther = id === 'other'

    const updates = isOther
      ? {
          allowOther: false
        }
      : {
          choices: field.properties?.choices?.filter(c => c.id !== id)
        }

    let prevId: string | undefined = undefined

    if (!isOther) {
      const index = findChoiceIndex(field.properties?.choices, id)

      if (index > -1) {
        prevId = field.properties!.choices![Math.max(0, index - 1)].id
      }
    } else {
      prevId = field.properties!.choices![field.properties!.choices!.length - 1].id
    }

    delete refs[id]
    prevId && refs[prevId]?.focus()

    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            ...updates
          }
        }
      }
    })
  }

  function handleLabelChange(id: string, label: string) {
    const choices = clone(field.properties?.choices || [])
    const index = findChoiceIndex(choices, id)

    choices[index].label = label

    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            choices
          }
        }
      }
    })
  }

  function handleEnter(id: string) {
    const index = findChoiceIndex(field.properties?.choices, id)

    if (index! > -1) {
      handleAddChoice(index! + 1)
    }
  }

  function handleUp(id: string) {
    const index = findChoiceIndex(field.properties?.choices, id)

    if (index > 0) {
      refs[field.properties!.choices![index - 1].id]?.focus()
    }
  }

  function handleDown(id: string) {
    const index = findChoiceIndex(field.properties?.choices, id)

    if (index < field.properties!.choices!.length - 1) {
      refs[field.properties!.choices![index + 1].id]?.focus()
    }
  }

  const handleAddChoiceCallback = useCallback(handleAddChoice, [field.properties])
  const handleChoiceRemoveCallback = useCallback(handleChoiceRemove, [field.properties])
  const handleLabelChangeCallback = useCallback(handleLabelChange, [field.properties])
  const handleEnterCallback = useCallback(handleEnter, [field.properties])
  const handleUpCallback = useCallback(handleUp, [field.properties])
  const handleDownCallback = useCallback(handleDown, [field.properties])

  return (
    <Block className="heyform-multiple-choice" field={field} locale={locale} {...restProps}>
      <div className="heyform-multiple-choice-list">
        {field.properties?.choices?.map((choice, index) => (
          <MultipleChoiceItem
            ref={ref => (refs[choice.id] = ref)}
            key={choice.id}
            index={index}
            choice={choice}
            enableRemove={field.properties!.choices!.length > 1}
            onRemove={handleChoiceRemoveCallback}
            onChange={handleLabelChangeCallback}
            onEnter={handleEnterCallback}
            onUp={handleUpCallback}
            onDown={handleDownCallback}
          />
        ))}

        {field.properties?.allowOther && (
          <MultipleChoiceItem
            index={field.properties!.choices!.length}
            choice={
              {
                id: 'other',
                label: t('form.builder.compose.otherChoice')
              } as Choice
            }
            isOther={true}
            enableRemove={field.properties!.choices!.length > 1}
            onRemove={handleChoiceRemoveCallback}
          />
        )}
      </div>
      <div className="heyform-add-choice">
        <Button.Link className="heyform-add-column" onClick={() => handleAddChoiceCallback()}>
          {t('form.builder.compose.addChoice')}
        </Button.Link>
      </div>
    </Block>
  )
}
