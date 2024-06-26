import { helper, toBool } from '@heyform-inc/utils'
import * as Popover from '@radix-ui/react-popover'
import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  Root,
  SelectContentProps,
  Trigger,
  Value,
  Viewport
} from '@radix-ui/react-select'
import { IconCheck, IconChevronDown, IconX } from '@tabler/icons-react'
import { useRequest } from 'ahooks'
import { Command } from 'cmdk'
import { ChangeEvent, FC, MouseEvent, ReactNode, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/utils'

import { Loader } from './Loader'

export interface SelectOption {
  icon?: ReactNode
  disabled?: boolean
  [key: string]: Any
}

interface NativeSelectProps extends Omit<ComponentProps, 'onChange'> {
  // Radix-ui can only return string value
  type?: 'string' | 'number' | 'boolean'
  value?: Any
  options: SelectOption[]
  labelKey?: string
  valueKey?: string
  loading?: boolean
  disabled?: boolean
  hasError?: boolean
  placeholder?: string
  multiLanguage?: boolean
  onChange?: (value: Any) => void
}

interface SelectProps extends NativeSelectProps {
  contentProps?: SelectContentProps
}

interface MultiSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
  value?: string[]
  onChange?: (value: string[]) => void
}

interface AsyncSelectProps extends Omit<SelectProps, 'options'> {
  refreshDeps?: Any[]
  fetch: () => Promise<SelectOption[]>
}

const transform = (value: string, type: NativeSelectProps['type']) => {
  switch (type) {
    case 'number':
      return Number(value)

    case 'boolean':
      return toBool(value)

    default:
      return value
  }
}

const NativeSelect: FC<NativeSelectProps> = ({
  className,
  type,
  value,
  options: rawOptions,
  labelKey = 'label',
  valueKey = 'value',
  loading,
  disabled,
  hasError,
  multiLanguage,
  onChange,
  ...restProps
}) => {
  const { t } = useTranslation()

  const options = useMemo(
    () =>
      rawOptions.map(row => {
        const value = row[valueKey]
        const label = row[labelKey]

        return {
          value,
          label: multiLanguage ? t(label) : label,
          disabled: row.disabled
        }
      }),
    [rawOptions, valueKey, labelKey, multiLanguage, t]
  )

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange?.(transform(event.target.value, type))
  }

  return (
    <select
      className={cn(
        'inline-flex appearance-none items-center gap-x-4 rounded-lg border bg-transparent px-3.5 py-2 text-base/[1.4rem] placeholder:text-secondary focus:outline-none sm:px-3 sm:py-1.5 sm:text-sm/[1.4rem] [&_[data-slot=value]]:flex [&_[data-slot=value]]:flex-1 [&_[data-slot=value]]:items-center [&_[data-slot=value]]:gap-x-2.5 [&_[data-slot=value]]:pl-1 [&_[data-slot=value]]:sm:gap-x-2',
        hasError ? 'border-error' : 'border-input',
        className
      )}
      value={value}
      disabled={loading || disabled}
      onChange={handleChange}
      {...restProps}
    >
      {options.map(row => (
        <option key={row.value} value={row.value} disabled={row.disabled}>
          {row.label}
        </option>
      ))}
    </select>
  )
}

const SelectComponent: FC<SelectProps> = ({
  className,
  type,
  value,
  options: rawOptions,
  labelKey = 'label',
  valueKey = 'value',
  loading,
  disabled,
  placeholder,
  hasError,
  multiLanguage,
  contentProps,
  onChange,
  ...restProps
}) => {
  const { t } = useTranslation()

  const options = useMemo(
    () =>
      rawOptions.map(row => {
        const value = row[valueKey]
        const label = row[labelKey]

        return {
          value,
          label: multiLanguage ? t(label) : label,
          icon: row.icon,
          disabled: row.disabled
        }
      }),
    [rawOptions, valueKey, labelKey, multiLanguage, t]
  )

  const handleChange = useCallback(
    (newValue: string) => {
      onChange?.(transform(newValue, type))
    },
    [type, onChange]
  )

  return (
    <Root value={String(value)} disabled={loading || disabled} onValueChange={handleChange}>
      <Trigger
        className={cn(
          'inline-flex max-h-[22rem] appearance-none items-center gap-x-4 rounded-lg border bg-transparent px-3.5 py-2 text-base/[1.4rem] placeholder:text-secondary focus:outline-none sm:max-h-[20rem] sm:px-3 sm:py-1.5 sm:text-sm/[1.4rem] [&_[data-slot=value]]:flex [&_[data-slot=value]]:flex-1 [&_[data-slot=value]]:items-center [&_[data-slot=value]]:gap-x-2.5 [&_[data-slot=value]]:truncate [&_[data-slot=value]]:pl-1 [&_[data-slot=value]]:sm:gap-x-2',
          hasError ? 'border-error' : 'border-input',
          className
        )}
        {...restProps}
      >
        <Value placeholder={placeholder} data-slot="value" />
        <Icon data-slot="icon">
          {loading ? (
            <Loader className="h-[1.125rem] w-[1.125rem] animate-spin" />
          ) : (
            <IconChevronDown className="h-[1.125rem] w-[1.125rem] text-secondary" />
          )}
        </Icon>
      </Trigger>

      <Portal>
        <Content
          position="item-aligned"
          side="bottom"
          sideOffset={8}
          align="end"
          {...contentProps}
          className={cn(
            'isolate z-10 max-h-[18.5rem] rounded-xl bg-white p-1 shadow-lg outline outline-1 outline-transparent ring-1 ring-accent-light focus:outline-none',
            contentProps?.className
          )}
          data-slot="content"
        >
          <Viewport>
            {options.map(row => (
              <Item
                key={row.value}
                value={String(row.value)}
                disabled={row.disabled}
                className="grid cursor-pointer grid-cols-[theme(spacing.5),1fr] items-center gap-x-2.5 rounded-lg py-2.5 pl-2 pr-3.5 text-base/6 text-primary outline-none disabled:opacity-60 data-[disabled]:pointer-events-none data-[highlighted]:bg-accent-light data-[disabled]:opacity-50 sm:grid-cols-[theme(spacing.4),1fr] sm:py-1.5 sm:pl-1.5 sm:pr-3 sm:text-sm/6 [&_[data-slot=item]]:col-start-2 [&_[data-slot=item]]:flex [&_[data-slot=item]]:items-center [&_[data-slot=item]]:gap-x-2.5 [&_[data-slot=item]]:sm:gap-x-2"
              >
                <ItemIndicator>
                  <IconCheck className="h-4 w-4" />
                </ItemIndicator>
                <ItemText data-slot="item">
                  {row.icon}
                  {row.label}
                </ItemText>
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  )
}

const MultiSelect: FC<MultiSelectProps> = ({
  className,
  value = [],
  options: rawOptions,
  labelKey = 'label',
  valueKey = 'value',
  loading,
  disabled,
  hasError,
  multiLanguage,
  placeholder,
  contentProps,
  onChange,
  ...restProps
}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const options = useMemo(
    () =>
      rawOptions.map(row => {
        const value = row[valueKey]
        const label = row[labelKey]

        return {
          value,
          label: multiLanguage ? t(label) : label,
          icon: row.icon,
          disabled: row.disabled
        }
      }),
    [rawOptions, valueKey, labelKey, multiLanguage, t]
  )

  const selected = useMemo(() => options.filter(row => value.includes(row.value)), [options, value])

  const handleSelect = useCallback(
    (itemValue: string) => {
      onChange?.(
        value.includes(itemValue) ? value.filter(v => v !== itemValue) : [...value, itemValue]
      )
    },
    [onChange, value]
  )

  const handleRemove = useCallback(
    (event: MouseEvent<HTMLButtonElement>, itemValue: string) => {
      event.stopPropagation()
      handleSelect(itemValue)
    },
    [handleSelect]
  )

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!loading) {
        setOpen(open)
      }
    },
    [loading]
  )

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger disabled={disabled} asChild>
        <div
          className={cn(
            'inline-flex min-w-36 cursor-pointer appearance-none items-center gap-x-4 rounded-lg border bg-transparent px-2.5 py-1.5 text-base/[1.4rem] placeholder:text-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50 sm:px-2 sm:py-1 sm:text-sm/[1.4rem] [&_[data-slot=value]]:flex [&_[data-slot=value]]:flex-1 [&_[data-slot=value]]:items-center [&_[data-slot=value]]:gap-x-2.5 [&_[data-slot=value]]:pl-1 [&_[data-slot=value]]:sm:gap-x-2',
            hasError ? 'border-error' : 'border-input',
            className
          )}
          {...restProps}
        >
          {selected.length > 0 ? (
            <div className="-ml-1 flex flex-wrap gap-2" data-slot="value">
              {selected.map(row => (
                <div
                  className="flex items-center gap-x-1 rounded-lg bg-accent-light px-2.5 py-0.5 data-[size=sm]:h-[1.625rem] data-[size=sm]:sm:h-[1.625rem]"
                  key={row.value}
                >
                  {row.label}
                  <button
                    className="-mr-0.5 text-secondary hover:text-primary"
                    onClick={e => handleRemove(e, row.value)}
                  >
                    <IconX className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm/6 text-secondary" data-slot="value">
              {placeholder}
            </div>
          )}

          <div data-slot="icon">
            {loading ? (
              <Loader className="h-[1.125rem] w-[1.125rem] animate-spin" />
            ) : (
              <IconChevronDown className="h-[1.125rem] w-[1.125rem] text-secondary" />
            )}
          </div>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          alignOffset={8}
          align="start"
          {...contentProps}
          className={cn(
            'isolate z-10 max-h-[22rem] origin-top-left rounded-xl bg-white p-1 shadow-lg outline outline-1 outline-transparent ring-1 ring-accent-light focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-90 sm:max-h-[20rem]',
            contentProps?.className
          )}
          data-slot="content"
          onEscapeKeyDown={() => handleOpenChange(false)}
        >
          <Command className="focus-visible:outline-none">
            <Command.List className="focus-visible:outline-none">
              {options.map(row => (
                <Command.Item
                  key={row.value}
                  value={row.value}
                  className="grid cursor-pointer grid-cols-[theme(spacing.5),1fr] items-center gap-x-2.5 rounded-lg py-2.5 pl-2 pr-3.5 text-base/6 text-primary outline-none aria-selected:bg-accent-light sm:grid-cols-[theme(spacing.4),1fr] sm:py-1.5 sm:pl-1.5 sm:pr-3 sm:text-sm/6 [&_[data-slot=item]]:col-start-2 [&_[data-slot=item]]:flex [&_[data-slot=item]]:items-center [&_[data-slot=item]]:gap-x-2.5 [&_[data-slot=item]]:sm:gap-x-2"
                  onSelect={handleSelect}
                >
                  {value.includes(row.value) && <IconCheck className="h-4 w-4" />}
                  <div data-slot="item">
                    {row.icon}
                    {row.label}
                  </div>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

const AsyncSelect: FC<AsyncSelectProps> = ({ disabled, fetch, refreshDeps = [], ...restProps }) => {
  const [options, setOptions] = useState<Any[]>([])

  const { loading } = useRequest(
    async () => {
      if (refreshDeps.some(helper.isNil) || disabled) {
        return
      }

      setOptions(await fetch())
    },
    {
      refreshDeps: [...refreshDeps, disabled]
    }
  )

  return <Select {...restProps} options={options} loading={loading} disabled={disabled} />
}

export const Select = Object.assign(SelectComponent, {
  Native: NativeSelect,
  Multi: MultiSelect,
  Async: AsyncSelect
})
