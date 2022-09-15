import { useStoreContext } from '@/pages/form/Create/store'
import { XIcon } from '@heroicons/react/outline'
import { Choice } from '@heyforms/shared-types-enums'
import { Button, Input, KeyCode } from '@heyforms/ui'
import { nanoid } from '@hpnp/utils/nanoid'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

interface MultipleChoiceItemProps {
  index: number
  choice: Choice
  enableRemove?: boolean
  onRemove: (id: string) => void
  onChange: (id: string, label: string) => void
}

const MultipleChoiceItem: FC<MultipleChoiceItemProps> = ({
  index,
  choice,
  enableRemove,
  onRemove,
  onChange
}) => {
  const { t } = useTranslation()
  const [isFocused, setIsFocused] = useState(false)

  function handleRemove() {
    onRemove(choice.id)
  }

  function handleChange(value: any) {
    onChange(choice.id, value)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  function handleFocus() {
    setIsFocused(true)
  }

  return (
    <div className="builder-radio">
      <div className="builder-radio-container">
        <div className="builder-radio-content">
          <div className="builder-radio-hotkey">{String.fromCharCode(KeyCode.A + index)}</div>
          <div className="builder-radio-label">
            <Input
              value={choice.label}
              placeholder={isFocused ? t('formBuilder.choicePlaceholder') : undefined}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleChange}
            />
          </div>
          {enableRemove && (
            <div className="builder-radio-remove" onClick={handleRemove}>
              <XIcon />
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

  function handleAddChoice() {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            choices: [
              ...(field.properties?.choices || []),
              {
                id: nanoid(12),
                label: ''
              }
            ]
          }
        }
      }
    })
  }

  function handleChoiceRemove(id: string) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            choices: field.properties?.choices?.filter(c => c.id !== id)
          }
        }
      }
    })
  }

  function handleLabelChange(id: string, label: string) {
    const choices = field.properties?.choices || []
    const index = choices.findIndex(c => c.id === id)

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

  const handleAddChoiceCallback = useCallback(handleAddChoice, [field.properties])
  const handleChoiceRemoveCallback = useCallback(handleChoiceRemove, [field.properties])
  const handleLabelChangeCallback = useCallback(handleLabelChange, [field.properties])

  return (
    <Block className="builder-multiple-choice" field={field} locale={locale} {...restProps}>
      <div className="builder-multiple-choice-list">
        {field.properties?.choices?.map((choice, index) => (
          <MultipleChoiceItem
            key={choice.id}
            index={index}
            choice={choice}
            enableRemove={field.properties!.choices!.length > 1}
            onRemove={handleChoiceRemoveCallback}
            onChange={handleLabelChangeCallback}
          />
        ))}
      </div>
      <div className="builder-add-choice">
        <Button.Link className="builder-add-column" onClick={handleAddChoiceCallback}>
          {t('formBuilder.addChoice')}
        </Button.Link>
      </div>
    </Block>
  )
}
