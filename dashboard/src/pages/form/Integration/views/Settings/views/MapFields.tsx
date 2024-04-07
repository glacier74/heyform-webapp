/**
 * @program: dashboard-next
 * @extra: MapFields
 * @author: Mufeng
 * @date: 2021-06-17 11:55
 **/
import { Form, Input, Select } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { IconArrowRight, IconPlus, IconX } from '@tabler/icons-react'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface MapFieldsProps {
  name: string
  label: string
  required?: boolean
  extra?: ReactNode
  leftLoading?: boolean
  leftOptions?: any[]
  leftValueKey?: string
  leftLabelKey?: string
  leftPlaceholder?: string
  leftTipText?: string
  rightLoading?: boolean
  rightOptions?: any[]
  rightValueKey?: string
  rightLabelKey?: string
  rightPlaceholder?: string
  rightTipText?: string
}

export const MapFields: FC<MapFieldsProps> = ({
  name,
  label,
  required = true,
  extra,
  leftLoading,
  leftOptions = [],
  leftValueKey,
  leftLabelKey,
  leftPlaceholder,
  leftTipText,
  rightLoading,
  rightOptions,
  rightValueKey,
  rightLabelKey,
  rightPlaceholder,
  rightTipText
}) => {
  const { t } = useTranslation()

  return (
    <Form.List
      name={name}
      validateTrigger="onSubmit"
      rules={
        required
          ? [
              {
                validator: async (_, value) => {
                  if (value.length < 1) {
                    throw new Error('Please setup Map fields')
                  }

                  if (!value.every((row: string[]) => isValid(row[0]) && row[1])) {
                    throw new Error('Some field is empty')
                  }
                }
              }
            ]
          : undefined
      }
    >
      {(fields, { add, remove }, { errors }) => {
        function handleAddField() {
          add([])
        }

        return (
          <div className="relative pb-6">
            <div className="mb-1">{t(label)}</div>
            <div className="hey-form-item-content mb-3 text-sm text-gray-500">
              {t(extra as any)}
            </div>

            {fields.map((field, index) => (
              <Form.Field {...field}>
                {({ value, onChange }) => {
                  function handleLeftChange(left: any) {
                    value[0] = left
                    onChange(value)
                  }

                  function handleRightChange(right: any) {
                    value[1] = right
                    onChange(value)
                  }

                  function handleRemoveField() {
                    remove(index)
                  }

                  return (
                    <div className="mb-1 flex items-center">
                      <Select
                        className="flex-1 placeholder:text-[#b0b7c3]"
                        value={value[0]}
                        options={leftOptions}
                        valueKey={leftValueKey}
                        labelKey={leftLabelKey}
                        placeholder={t(leftPlaceholder as any)}
                        loading={leftLoading}
                        disabled={leftLoading}
                        onChange={handleLeftChange}
                      />

                      <IconArrowRight className="mx-3 h-5 w-5 text-[#8a94a6]" />

                      {rightOptions ? (
                        <Select
                          className="w-1/2 flex-1"
                          value={value[1]}
                          options={rightOptions}
                          valueKey={rightValueKey}
                          labelKey={rightLabelKey}
                          placeholder={t(rightPlaceholder as any)}
                          loading={rightLoading}
                          disabled={rightLoading}
                          onChange={handleRightChange}
                        />
                      ) : (
                        <Input
                          className="w-1/2 flex-1"
                          value={value[1]}
                          placeholder={t(rightPlaceholder as any)}
                          onChange={handleRightChange}
                        />
                      )}

                      {fields.length > 1 && (
                        <IconX
                          className="ml-3 h-4 w-4 cursor-pointer text-[#b0b7c3]"
                          onClick={handleRemoveField}
                        />
                      )}
                    </div>
                  )
                }}
              </Form.Field>
            ))}

            <div
              className="mt-2 flex cursor-pointer items-center text-sm text-[#8a94a6]"
              onClick={handleAddField}
            >
              <IconPlus className="text-[#8a94a6]" /> {t('integration.AddField')}
            </div>

            {errors.length > 0 && (
              <div className={`absolute bottom-0 text-xs text-red-500`}>{errors[0]}</div>
            )}
          </div>
        )
      }}
    </Form.List>
  )
}
