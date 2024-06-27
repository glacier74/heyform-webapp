import { Button, CHAR_A_KEY_CODE, Input } from '@heyform-inc/form-renderer'
import type { Choice } from '@heyform-inc/shared-types-enums'
import { clone, helper, nanoid } from '@heyform-inc/utils'
import {
  IconPencil,
  IconPhoto,
  IconPhotoPlus,
  IconPlus,
  IconTrash,
  IconX
} from '@tabler/icons-react'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useStoreContext } from '../../store'
import type { BlockProps } from './Block'
import { Block } from './Block'

interface PictureChoiceItemProps {
  index: number
  choice: Choice
  isOther?: boolean
  enableRemove?: boolean
  onLabelChange?: (id: string, label: string) => void
  onSelectImage?: (id: string) => void
  onRemoveImage?: (id: string) => void
  onRemove: (id: string) => void
}

const PictureChoiceItem: FC<PictureChoiceItemProps> = ({
  choice,
  index,
  isOther,
  enableRemove,
  onLabelChange,
  onSelectImage,
  onRemoveImage,
  onRemove
}) => {
  const { t } = useTranslation()
  const [isFocused, setIsFocused] = useState(false)

  function handleRemove() {
    onRemove(choice.id)
  }

  function handleLabelChange(value: Any) {
    onLabelChange?.(choice.id, value)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  function handleFocus() {
    setIsFocused(true)
  }

  function handleSelectImage() {
    onSelectImage?.(choice.id)
  }

  function handleRemoveImage() {
    onRemoveImage?.(choice.id)
  }

  return (
    <div className="heyform-radio">
      <div className="heyform-radio-container">
        {isOther ? (
          <div className="heyform-radio-trigger">
            <IconPencil />
          </div>
        ) : helper.isURL(choice.image) ? (
          <>
            <div className="heyform-radio-image">
              <img src={choice.image!} alt={choice.label} />
            </div>
            <div className="heyform-radio-actions">
              <Button.Link leading={<IconPhoto />} onClick={handleSelectImage} />
              <Button.Link leading={<IconTrash />} onClick={handleRemoveImage} />
            </div>
          </>
        ) : (
          <div className="heyform-radio-trigger" onClick={handleSelectImage}>
            <IconPhotoPlus />
          </div>
        )}

        <div className="heyform-radio-content">
          <div className="heyform-radio-hotkey">{String.fromCharCode(CHAR_A_KEY_CODE + index)}</div>
          <div className="heyform-radio-label">
            {isOther ? (
              <div className="heyform-radio-label-other">{choice.label}</div>
            ) : (
              <Input
                value={choice.label}
                placeholder={isFocused ? t('builder.choicePlaceholder') : undefined}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleLabelChange}
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

const AddPictureChoice: FC<ComponentProps> = props => {
  return (
    <div className="heyform-radio" {...props}>
      <div className="heyform-radio-container">
        <div className="heyform-radio-image flex-1">
          <IconPlus />
        </div>
      </div>
    </div>
  )
}

export const PictureChoice: FC<BlockProps> = ({ field, locale, ...restProps }) => {
  const { t } = useTranslation()
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
    const updates =
      id === 'other'
        ? {
            allowOther: false
          }
        : {
            choices: field.properties?.choices?.filter(c => c.id !== id)
          }

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

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleClose() {
    setChoiceId(undefined)
  }

  const handleAddChoiceCallback = useCallback(handleAddChoice, [field.properties])
  const handleChoiceRemoveCallback = useCallback(handleChoiceRemove, [field.properties])
  const handleLabelChangeCallback = useCallback(handleLabelChange, [field.properties])
  const handleSelectImageCallback = useCallback(handleSelectImage, [field.properties])
  const handleRemoveImageCallback = useCallback(handleRemoveImage, [field.properties])
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleImageChangeCallback = useCallback(handleImageChange, [field.properties, choiceId])

  return (
    <Block className="heyform-picture-choice" field={field} locale={locale} {...restProps}>
      <div className="heyform-picture-choice-list">
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

        {field.properties?.allowOther && (
          <PictureChoiceItem
            index={field.properties!.choices!.length}
            choice={
              {
                id: 'other',
                label: t('builder.other')
              } as Choice
            }
            isOther={true}
            enableRemove={field.properties!.choices!.length > 1}
            onRemove={handleChoiceRemoveCallback}
          />
        )}

        <AddPictureChoice onClick={handleAddChoiceCallback} />
      </div>

      {/*<PhotoPicker*/}
      {/*  visible={!!choiceId}*/}
      {/*  onClose={handleClose}*/}
      {/*  onChange={handleImageChangeCallback}*/}
      {/*/>*/}
    </Block>
  )
}