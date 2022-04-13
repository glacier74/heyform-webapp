import type { FormField } from '@heyforms/shared-types-enums'
import { FieldLayoutAlignEnum, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import clsx from 'clsx'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Layout } from '../components'
import { useStore } from '../store'
import { useWheelScroll } from './hook'

export interface BlockProps extends IComponentProps {
  field: FormField
  isScrollable?: boolean
}

export const Block: FC<BlockProps> = ({
  className,
  field,
  isScrollable = true,
  children,
  ...restProps
}) => {
  const { state, dispatch } = useStore()
  const [isEntered, setIsEntered] = useState(false)
  const isQuestion = QUESTION_FIELD_KINDS.includes(field.kind)
  const isInlineLayout = field.layout?.align === FieldLayoutAlignEnum.INLINE

  const handleWheelScroll = useWheelScroll(isScrollable, type => {
    dispatch({ type })
  })

  useEffect(() => {
    if (state.scrollTo) {
      setTimeout(() => {
        setIsEntered(true)
      }, 0)
    }
  }, [state.scrollTo])

  return (
    <div
      className={clsx('heyform-block-container', className)}
      onWheel={handleWheelScroll}
      {...restProps}
    >
      {/* Theme background */}
      <div className="heyform-theme-background" />

      {/* Field layout */}
      {!isInlineLayout && <Layout {...field.layout} />}

      <div
        className={clsx('heyform-block', {
          [`heyform-block-${state.scrollTo}`]: state.scrollTo,
          'heyform-block-entered': isEntered,
          [`heyform-block-${field.layout?.align}`]: field.layout?.align
        })}
      >
        <div className="w-full h-full px-20 overflow-x-hidden scrollbar">
          <div className="flex flex-col items-center justify-center min-h-full">
            <div className="heyform-block-main">
              <div className="mt-20 mb-36">
                <div className="mb-10">
                  {isQuestion && (
                    <div className="heyform-block-label">
                      Question {field.index} {field.validations?.required && '*'}
                    </div>
                  )}
                  {field.title && (
                    <h1
                      className="heyform-block-title"
                      dangerouslySetInnerHTML={{ __html: field.title as string }}
                    />
                  )}
                  {field.description && (
                    <div
                      className="heyform-block-description"
                      dangerouslySetInnerHTML={{ __html: field.description as string }}
                    />
                  )}
                </div>

                {isInlineLayout && <Layout {...field.layout} />}

                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
