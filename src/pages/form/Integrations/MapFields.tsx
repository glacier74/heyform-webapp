import { helper } from '@heyform-inc/utils'
import { IconArrowRight, IconPlus, IconX } from '@tabler/icons-react'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Form, Input, Select } from '@/components'

interface MapFieldsProps {
  name: string
  label: string
  description?: string
  required?: boolean
  footer?: ReactNode

  leftLoading?: boolean
  leftOptions?: Any[]
  leftValueKey?: string
  leftLabelKey?: string
  leftPlaceholder?: string

  rightLoading?: boolean
  rightOptions?: Any[]
  rightValueKey?: string
  rightLabelKey?: string
  rightPlaceholder?: string
}

export const MapFields: FC<MapFieldsProps> = ({
  name,
  label,
  description,
  required = true,
  leftLoading,
  leftOptions = [],
  leftValueKey,
  leftLabelKey,
  leftPlaceholder,
  rightLoading,
  rightOptions,
  rightValueKey,
  rightLabelKey,
  rightPlaceholder
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
                    throw new Error(t('form.integrations.mapFields.required'))
                  }

                  for (let index = 0; index < value.length; index++) {
                    const row = value[index]
                    const isLeftEmpty = helper.isNil(row[0])
                    const isRightEmpty = helper.isNil(row[1])

                    if (isLeftEmpty || isRightEmpty) {
                      const error = isLeftEmpty
                        ? 'form.integrations.mapFields.requireLeft'
                        : 'form.integrations.mapFields.requireRight'

                      throw new Error(t(error, { index: index + 1 }))
                    }
                  }
                }
              }
            ]
          : undefined
      }
    >
      {(fields, { add, remove }, { errors }) => {
        return (
          <div>
            {label && (
              <label
                htmlFor={name as string}
                className="select-none text-base/6 font-medium sm:text-sm/6"
                data-slot="label"
              >
                {label}
              </label>
            )}

            {description && (
              <div className="text-base/5 text-secondary sm:text-sm/5" data-slot="description">
                {description}
              </div>
            )}

            <div className="mt-2 space-y-1">
              {fields.map((field, index) => (
                <Form.Field {...field} key={field.key}>
                  {({ value, onChange }) => {
                    const handleLeftChange = (left: Any) => {
                      onChange([left, value[1]])
                    }

                    const handleRightChange = (right: Any) => {
                      onChange([value[0], right])
                    }

                    function handleRemoveField() {
                      remove(index)
                    }

                    return (
                      <div className="flex items-center gap-3">
                        <div className="w-[calc(50%-2rem)] flex-1">
                          <Select
                            className="h-11 w-full sm:h-10"
                            value={value[0]}
                            options={leftOptions}
                            valueKey={leftValueKey}
                            labelKey={leftLabelKey}
                            placeholder={t(leftPlaceholder as Any)}
                            loading={leftLoading}
                            disabled={leftLoading}
                            onChange={handleLeftChange}
                          />
                        </div>

                        <IconArrowRight className="h-5 w-5 text-secondary" />

                        <div className="w-[calc(50%-2rem)] flex-1">
                          {rightOptions ? (
                            <Select
                              className="h-11 w-full sm:h-10"
                              value={value[1]}
                              options={rightOptions}
                              valueKey={rightValueKey}
                              labelKey={rightLabelKey}
                              placeholder={rightPlaceholder}
                              loading={rightLoading}
                              disabled={rightLoading}
                              onChange={handleRightChange}
                            />
                          ) : (
                            <Input
                              className="w-full"
                              value={value[1]}
                              placeholder={rightPlaceholder}
                              onChange={handleRightChange}
                            />
                          )}
                        </div>

                        {fields.length > 1 && (
                          <Button.Link className="text-secondary" size="sm" iconOnly>
                            <IconX className="h-5 w-5" onClick={handleRemoveField} />
                          </Button.Link>
                        )}
                      </div>
                    )
                  }}
                </Form.Field>
              ))}
            </div>

            <div className="mt-2">
              <Button.Link size="sm" className="!px-0" onClick={() => add([])}>
                <IconPlus className="h-5 w-5 text-secondary" />
                {t('form.integrations.mapFields.addMore')}
              </Button.Link>
            </div>

            {errors.length > 0 && <div className="text-sm/6 text-error">{errors[0]}</div>}
          </div>
        )
      }}
    </Form.List>
  )
}
