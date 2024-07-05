import { excludeObject } from '@heyform-inc/utils'
import {
  Close,
  Content,
  Description,
  DialogContentProps,
  DialogOverlayProps,
  Overlay,
  Portal,
  Root,
  Title
} from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { IconX } from '@tabler/icons-react'
import { Rule } from 'rc-field-form/es/interface'
import { FC, ReactNode, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { cn, useFormState } from '@/utils'

import { Button, ButtonProps } from './Button'
import { Form } from './Form'
import { Input, InputProps } from './Input'

interface ModalProps extends DOMProps {
  open?: boolean
  loading?: boolean
  overlayProps?: DialogOverlayProps
  contentProps?: DialogContentProps
  onOpenChange?: (open: boolean) => void
}

const ModalComponent: FC<ModalProps> = ({
  open,
  loading,
  overlayProps,
  contentProps,
  onOpenChange,
  children
}) => {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!loading) {
        onOpenChange?.(open)
      }
    },
    [loading, onOpenChange]
  )

  return (
    <Root open={open} onOpenChange={handleOpenChange}>
      <Portal>
        <Overlay
          className={cn(
            'fixed inset-0 z-10 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            overlayProps?.className
          )}
        />
        <Content
          onOpenAutoFocus={e => e.preventDefault()}
          onCloseAutoFocus={e => e.preventDefault()}
          {...contentProps}
          className={cn(
            'scrollbar fixed bottom-0 left-0 right-0 z-10 max-h-[80vh] w-full max-w-xl overflow-y-auto rounded-lg border border-input bg-foreground p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-lg duration-200 data-[state=closed]:duration-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-0 data-[state=open]:slide-in-from-bottom-[80%] sm:bottom-auto sm:left-[50%] sm:right-auto sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] data-[state=closed]:sm:zoom-out-95 data-[state=open]:sm:zoom-in-95 data-[state=closed]:sm:slide-out-to-left-1/2 data-[state=closed]:sm:slide-out-to-top-[48%] data-[state=open]:sm:slide-in-from-left-1/2 data-[state=open]:sm:slide-in-from-top-[48%]',
            contentProps?.className
          )}
        >
          <Title>
            <VisuallyHidden />
          </Title>
          <Description>
            <VisuallyHidden />
          </Description>
          {open && children}
        </Content>
      </Portal>
    </Root>
  )
}

interface SimpleModalProps extends ModalProps {
  isCloseShow?: boolean
  title?: ReactNode
  description?: ReactNode
}

const SimpleModal: FC<SimpleModalProps> = ({
  isCloseShow = false,
  title,
  description,
  children,
  ...restProps
}) => {
  const { t } = useTranslation()

  return (
    <ModalComponent {...restProps}>
      {isCloseShow && (
        <Close asChild>
          <Button.Link
            className="absolute right-[1.2rem] top-[1.2rem]"
            size="sm"
            iconOnly
            onClick={() => restProps?.onOpenChange?.(false)}
          >
            <span className="sr-only">{t('components.close')}</span>
            <IconX className="h-6 w-6 sm:h-5 sm:w-5" />
          </Button.Link>
        </Close>
      )}
      <Title className="text-balance text-xl/6 font-semibold text-primary sm:text-lg/6">
        {title}
      </Title>
      <Description className="mt-2 whitespace-pre-line text-base text-secondary empty:mt-0 sm:text-sm">
        {description}
      </Description>
      <div className="mt-6">{children}</div>
    </ModalComponent>
  )
}

export interface AlertModalProps extends Omit<SimpleModalProps, 'isCloseShow' | 'children'> {
  fetch?: () => Promise<void>
  showFetchError?: boolean
  cancelProps?: Omit<ButtonProps, 'onClick'> & {
    label?: string
  }
  confirmProps?: Omit<ButtonProps, 'onClick'> & {
    label?: string
  }
  onCancel?: () => void
  onConfirm?: () => void
  onFinish?: () => void
  onClose?: () => void
}

const AlertModal: FC<AlertModalProps> = ({
  title,
  fetch,
  showFetchError = true,
  description,
  cancelProps,
  confirmProps,
  contentProps,
  onCancel,
  onConfirm,
  onFinish,
  onClose,
  onOpenChange,
  ...restProps
}) => {
  const [loading, error, { setTrue, setFalse, setError }] = useFormState()

  const handleConfirm = useCallback(async () => {
    onConfirm?.()

    if (fetch) {
      setTrue()

      try {
        await fetch()
        onFinish?.()
      } catch (err: Any) {
        setError(err)
      }

      setFalse()
    } else {
      onFinish?.()
    }
  }, [fetch, onConfirm, onFinish, setError, setFalse, setTrue])

  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose?.()
    }

    onOpenChange?.(open)
  }

  return (
    <ModalComponent
      contentProps={{
        className: 'max-w-lg',
        ...contentProps
      }}
      loading={loading}
      onOpenChange={handleOpenChange}
      {...restProps}
    >
      <Title className="text-lg/6 font-semibold text-primary sm:text-base/6">{title}</Title>
      <Description className="mt-2 whitespace-pre-line text-base text-secondary sm:text-sm">
        {description}
      </Description>

      {(cancelProps?.label || confirmProps?.label) && (
        <div className="mt-6">
          {showFetchError && error && !loading && (
            <div className="text-sm/6 text-error" data-slot="form-error">
              {error.message}
            </div>
          )}

          <div className="mt-2 flex items-center justify-end gap-x-3">
            {cancelProps?.label && (
              <Close asChild>
                <Button.Ghost
                  size="md"
                  {...excludeObject(cancelProps, ['label'])}
                  className={cn('min-w-20', cancelProps?.className)}
                  onClick={onCancel}
                >
                  {cancelProps.label}
                </Button.Ghost>
              </Close>
            )}

            {confirmProps?.label && (
              <Button
                size="md"
                loading={loading}
                {...excludeObject(confirmProps, ['label'])}
                className={cn('min-w-20', confirmProps?.className)}
                onClick={handleConfirm}
              >
                {confirmProps.label}
              </Button>
            )}
          </div>
        </div>
      )}
    </ModalComponent>
  )
}

export interface PromptModalProps extends Omit<SimpleModalProps, 'isCloseShow' | 'children'> {
  value?: Any
  fetch?: (values: Any) => Promise<void>
  showFetchError?: boolean
  inputProps?: InputProps & {
    name: string
    label?: string
    rules?: Rule[]
  }
  submitProps?: Omit<ButtonProps, 'onClick'> & {
    label: string
  }
  onConfirm?: () => void
  onChange?: (values: Any) => void
}

const PromptModal: FC<PromptModalProps> = ({
  value,
  title,
  fetch,
  showFetchError = true,
  description,
  inputProps,
  submitProps,
  contentProps,
  onConfirm,
  onChange,
  ...restProps
}) => {
  const [loading, error, { setTrue, setFalse, setError }] = useFormState()

  const handleFinish = useCallback(
    async (values: Any) => {
      onConfirm?.()

      if (fetch) {
        setTrue()

        try {
          await fetch(values)
          onChange?.(values)
        } catch (err: Any) {
          console.error(err)
          setError(err)
        }

        setFalse()
      } else {
        onChange?.(values)
      }
    },
    [fetch, onConfirm, onChange, setError, setFalse, setTrue]
  )

  return (
    <ModalComponent
      contentProps={{
        className: 'max-w-lg',
        ...contentProps
      }}
      loading={loading}
      {...restProps}
    >
      <Title className="text-lg/6 font-semibold text-primary sm:text-base/6">{title}</Title>
      <Description className="mt-2 whitespace-pre-line text-base text-secondary sm:text-sm">
        {description}
      </Description>

      <Form className="mt-4" initialValues={value} onFinish={handleFinish}>
        <Form.Item name={inputProps?.name} label={inputProps?.label} rules={inputProps?.rules}>
          <Input {...excludeObject(inputProps as AnyMap, ['name', 'label', 'rules'])} />
        </Form.Item>

        {showFetchError && error && !loading && (
          <div className="text-sm/6 text-error" data-slot="form-error">
            {error.message}
          </div>
        )}

        <Button
          size="md"
          type="submit"
          loading={loading}
          {...excludeObject(submitProps as AnyMap, ['label'])}
        >
          {submitProps?.label}
        </Button>
      </Form>
    </ModalComponent>
  )
}

export const Modal = Object.assign(ModalComponent, {
  Simple: SimpleModal,
  Alert: AlertModal,
  Prompt: PromptModal
})
