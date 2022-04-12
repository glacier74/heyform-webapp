import { useStoreContext } from '@/pages/form/Create/store'
import { XIcon } from '@heroicons/react/outline'
import { Button, Input, KeyCode } from '@heyforms/ui'
import { nanoid } from '@hpnp/utils/nanoid'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

interface MultipleChoiceItemProps {
  id: string
  index: number
  label?: string
  enableRemove?: boolean
  onRemove: (id: string) => void
  onChange: (id: string, label: string) => void
}

const MultipleChoiceItem: FC<MultipleChoiceItemProps> = ({
  id,
  index,
  label,
  enableRemove,
  onRemove,
  onChange
}) => {
  const [isFocused, setIsFocused] = useState(false)

  function handleRemove() {
    onRemove(id)
  }

  function handleChange(value: any) {
    onChange(id, value)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  function handleFocus() {
    setIsFocused(true)
  }

  return (
    <div className="heyform-radio">
      <div className="heyform-radio-container">
        <div className="heyform-radio-content">
          <div className="heyform-radio-hotkey">{String.fromCharCode(KeyCode.A + index)}</div>
          <div className="heyform-radio-label">
            <Input
              value={label}
              placeholder={isFocused ? 'choice' : undefined}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleChange}
            />
          </div>
          {enableRemove && (
            <div className="heyform-radio-remove" onClick={handleRemove}>
              <XIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const MultipleChoice: FC<BlockProps> = ({ field, ...restProps }) => {
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
    <Block className="heyform-multiple-choice" field={field} {...restProps}>
      <div className="heyform-multiple-choice-list">
        {field.properties?.choices?.map((choice, index) => (
          <MultipleChoiceItem
            key={choice.id}
            id={choice.id}
            index={index}
            enableRemove={field.properties!.choices!.length > 1}
            onRemove={handleChoiceRemoveCallback}
            onChange={handleLabelChangeCallback}
          />
        ))}
      </div>
      <div className="heyform-add-choice">
        <Button.Link onClick={handleAddChoiceCallback}>Add choice</Button.Link>
      </div>
    </Block>
  )
}
