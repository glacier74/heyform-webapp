import { useStoreContext } from '@/pages/form/Create/store'
import { RichText } from '@/pages/form/Create/views/RichText'
import { FieldLayoutAlignEnum, FormField, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { isURL } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC } from 'react'
import { RefObject, useCallback, useEffect, useRef } from 'react'
import { Layout } from '../Layout'

export interface BlockProps extends IComponentProps {
  field: FormField
}

export const Block: FC<BlockProps> = ({ className, field, children, ...restProps }) => {
  const { dispatch } = useStoreContext()

  const titleRef = useRef<HTMLDivElement>()
  const descriptionRef = useRef<HTMLDivElement>()

  const isLabelShow = QUESTION_FIELD_KINDS.includes(field.kind)
  const isCoverShow = isURL(field.layout?.mediaUrl)

  function handleTitleChange(title: string) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          title
        }
      }
    })
  }

  function handleDescriptionChange(description: string) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          description
        }
      }
    })
  }

  const handleTitleChangeCallback = useCallback(handleTitleChange, [field.id])
  const handleDescriptionChangeCallback = useCallback(handleDescriptionChange, [field.id])

  // Reset RichText html
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current!.innerHTML = (field.title as string) || ''
    }

    if (descriptionRef.current) {
      descriptionRef.current!.innerHTML = (field.description as string) || ''
    }
  }, [field.id])

  return (
    <>
      <div className="heyform-theme-background" />

      {field.layout?.align !== FieldLayoutAlignEnum.INLINE && (
        <Layout className={`heyform-layout-${field.layout?.align}`} layout={field.layout} />
      )}

      <div
        className={clsx('heyform-block-container', {
          [`heyform-block-${field.layout?.align}`]: field.layout?.align
        })}
      >
        <div className="flex flex-col items-center justify-center min-h-full">
          <div className={clsx('heyform-block', className)} {...restProps}>
            <div className="mb-10">
              {isLabelShow && (
                <label className="heyform-block-label">
                  Question {field.index} {field.validations?.required && '*'}
                </label>
              )}
              <RichText
                className="heyform-block-title"
                innerRef={titleRef as RefObject<HTMLDivElement>}
                placeholder="Type a question"
                onChange={handleTitleChangeCallback}
              />
              <RichText
                className="heyform-block-description"
                innerRef={descriptionRef as RefObject<HTMLDivElement>}
                placeholder="Add description to your question (optional)"
                onChange={handleDescriptionChangeCallback}
              />
            </div>

            {isCoverShow && field.layout?.align === FieldLayoutAlignEnum.INLINE && (
              <div className="heyform-block-image">
                <img src={field.layout?.mediaUrl} />
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </>
  )
}
