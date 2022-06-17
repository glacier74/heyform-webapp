import { useStoreContext } from '@/pages/form/Create/store'
import { RichText } from '@/pages/form/Create/views/RichText'
import { questionNumber } from '@heyforms/form-component'
import { FieldLayoutAlignEnum, FormField, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { isURL } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC } from 'react'
import { RefObject, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../Layout'

export interface BlockProps extends IComponentProps {
  field: FormField
  parentField?: FormField
}

export const Block: FC<BlockProps> = ({
  className,
  field,
  parentField,
  children,
  ...restProps
}) => {
  const { dispatch } = useStoreContext()
  const { t } = useTranslation()

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
        <Layout className={`builder-layout-${field.layout?.align}`} layout={field.layout} />
      )}

      {parentField && (
        <div className="heyform-block-group">
          <div className="heyform-block-group-container">
            <label className="builder-block-label">
              {t('formBuilder.question')} {questionNumber(parentField!.index)}
            </label>
            <div className="builder-block-title">{parentField.title}</div>
          </div>
        </div>
      )}

      <div
        className={clsx('builder-block-container', {
          [`builder-block-${field.layout?.align}`]: field.layout?.align
        })}
      >
        <div className="flex flex-col items-center justify-center min-h-full">
          <div className={clsx('builder-block', className)} {...restProps}>
            <div className="mb-10">
              {isLabelShow && (
                <label className="builder-block-label">
                  {t('formBuilder.question')} {questionNumber(field.index, parentField?.index)}{' '}
                  {field.validations?.required && '*'}
                </label>
              )}
              <RichText
                className="builder-block-title"
                innerRef={titleRef as RefObject<HTMLDivElement>}
                placeholder={t('formBuilder.questionPlaceholder')}
                onChange={handleTitleChangeCallback}
              />
              <RichText
                className="builder-block-description"
                innerRef={descriptionRef as RefObject<HTMLDivElement>}
                placeholder={t('formBuilder.descriptionPlaceholder')}
                onChange={handleDescriptionChangeCallback}
              />
            </div>

            {isCoverShow && field.layout?.align === FieldLayoutAlignEnum.INLINE && (
              <div className="builder-block-image">
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
