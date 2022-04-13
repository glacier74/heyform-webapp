import { AddImageIcon, ImageIcon, PhotoPicker } from '@/components'
import { useStoreContext } from '@/pages/form/Create/store'
import { PlusIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import type { Choice } from '@heyforms/shared-types-enums'
import { Button, Input, KeyCode } from '@heyforms/ui'
import { clone } from '@hpnp/utils'
import { isURL } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

interface PictureChoiceItemProps {
  index: number
  choice: Choice
  enableRemove?: boolean
  onLabelChange: (id: string, label: string) => void
  onSelectImage: (id: string) => void
  onRemoveImage: (id: string) => void
  onRemove: (id: string) => void
}

const PictureChoiceItem: FC<PictureChoiceItemProps> = ({
  choice,
  index,
  enableRemove,
  onLabelChange,
  onSelectImage,
  onRemoveImage,
  onRemove
}) => {
  const [isFocused, setIsFocused] = useState(false)

  function handleRemove() {
    onRemove(choice.id)
  }

  function handleLabelChange(value: any) {
    onLabelChange(choice.id, value)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  function handleFocus() {
    setIsFocused(true)
  }

  function handleSelectImage() {
    onSelectImage(choice.id)
  }

  function handleRemoveImage() {
    onRemoveImage(choice.id)
  }

  return (
    <div className="builder-radio">
      <div className="builder-radio-container">
        {isURL(choice.image) ? (
          <>
            <div className="builder-radio-image">
              <img src={choice.image!} alt={choice.label} />
            </div>
            <div className="builder-radio-actions">
              <Button.Link leading={<ImageIcon />} onClick={handleSelectImage} />
              <Button.Link leading={<TrashIcon />} onClick={handleRemoveImage} />
            </div>
          </>
        ) : (
          <div className="builder-radio-trigger" onClick={handleSelectImage}>
            <AddImageIcon />
          </div>
        )}

        <div className="builder-radio-content">
          <div className="builder-radio-hotkey">{String.fromCharCode(KeyCode.A + index)}</div>
          <div className="builder-radio-label">
            <Input
              value={choice.label}
              placeholder={isFocused ? 'choice' : undefined}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleLabelChange}
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

const AddPictureChoice: FC<IComponentProps> = props => {
  return (
    <div className="builder-radio" {...props}>
      <div className="builder-radio-container">
        <div className="builder-radio-image flex-1">
          <PlusIcon />
        </div>
      </div>
    </div>
  )
}

export const PictureChoice: FC<BlockProps> = ({ field, ...restProps }) => {
  const { dispatch } = useStoreContext()
  const [choiceId, setChoiceId] = useState<string>()

  function handleSelectImage(id: string) {
    setChoiceId(id)
  }

  function handleAddChoice() {
    const newChoiceId = nanoid(12)

    // Show image picker modal
    handleSelectImage(newChoiceId)

    // Create new choice
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
                id: newChoiceId,
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

  function handleImageChange(value: string) {
    const choices = field.properties?.choices || []
    const index = choices.findIndex(c => c.id === choiceId)

    choices[index].image = value

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

  function handleRemoveImage(cid: string) {
    const choices = clone(field.properties?.choices || [])
    const index = choices.findIndex(c => c.id === cid)

    delete choices[index].image

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

  function handleClose() {
    setChoiceId(undefined)
  }

  const handleAddChoiceCallback = useCallback(handleAddChoice, [field.properties])
  const handleChoiceRemoveCallback = useCallback(handleChoiceRemove, [field.properties])
  const handleLabelChangeCallback = useCallback(handleLabelChange, [field.properties])
  const handleSelectImageCallback = useCallback(handleSelectImage, [field.properties])
  const handleRemoveImageCallback = useCallback(handleRemoveImage, [field.properties])
  const handleImageChangeCallback = useCallback(handleImageChange, [field.properties, choiceId])

  return (
    <Block className="builder-picture-choice" field={field} {...restProps}>
      <div className="builder-picture-choice-list">
        {field.properties?.choices?.map((choice, index) => (
          <PictureChoiceItem
            key={choice.id}
            index={index}
            choice={choice}
            enableRemove={field.properties!.choices!.length > 1}
            onLabelChange={handleLabelChangeCallback}
            onSelectImage={handleSelectImageCallback}
            onRemoveImage={handleRemoveImageCallback}
            onRemove={handleChoiceRemoveCallback}
          />
        ))}

        <AddPictureChoice onClick={handleAddChoiceCallback} />
      </div>

      <PhotoPicker
        visible={!!choiceId}
        onClose={handleClose}
        onChange={handleImageChangeCallback}
      />
    </Block>
  )
}
