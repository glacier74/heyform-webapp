/**
 * @program: dashboard-next
 * @description: MapFields
 * @author: Mufeng
 * @date: 2021-06-17 11:55
 **/

import { Flex, Form, Input, Select } from '@heyui/component'
import { AddIcon, ArrowRightIcon, CloseIcon } from '@heyui/icon'
import { isValid } from '@hpnp/utils/helper'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface MapFieldsProps {
  name: string
  label: string
  required?: boolean
  description?: ReactNode
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
                                                description,
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
          <Fields>
            <Label>{t(label)}</Label>
            <Description className="hey-form-item-content">{t(description as any)}</Description>

            {fields.map((field, index) => (
              <Form.Field {...field}>
                {({ value, onChange }) => {
                  function handleLeftChange(left: string) {
                    value[0] = left
                    onChange(value)
                  }

                  function handleRightChange(right: string) {
                    value[1] = right
                    onChange(value)
                  }

                  function handleRemoveField() {
                    remove(index)
                  }

                  return (
                    <FieldContainer align="center">
                      <StyledSelect
                        value={value[0]}
                        options={leftOptions}
                        valueKey={leftValueKey}
                        labelKey={leftLabelKey}
                        placeholder={t(leftPlaceholder as any)}
                        tipText={t(leftTipText as any)}
                        loading={leftLoading}
                        disabled={leftLoading}
                        onChange={handleLeftChange}
                      />

                      <StyledArrowRightIcon/>

                      {rightOptions ? (
                        <StyledSelect
                          value={value[1]}
                          options={rightOptions}
                          valueKey={rightValueKey}
                          labelKey={rightLabelKey}
                          placeholder={t(rightPlaceholder as any)}
                          tipText={t(rightTipText as any)}
                          loading={rightLoading}
                          disabled={rightLoading}
                          onChange={handleRightChange}
                        />
                      ) : (
                        <StyledInput
                          value={value[1]}
                          placeholder={t(rightPlaceholder as any)}
                          onChange={handleRightChange}
                        />
                      )}

                      {fields.length > 1 && <StyledCloseIcon onClick={handleRemoveField}/>}
                    </FieldContainer>
                  )
                }}
              </Form.Field>
            ))}

            <AddContainer align="center" onClick={handleAddField}>
              <StyledAddIcon/> {t('integration.AddField')}
            </AddContainer>

            {errors.length > 0 && <FormError>{errors[0]}</FormError>}
          </Fields>
        )
      }}
    </Form.List>
  )
}

const Label = styled.div`
  margin-bottom: 10px;
`

const Description = styled.div`
  margin-bottom: 10px;
  color: #8a94a6;
`

const Fields = styled.div`
  position: relative;
  padding-bottom: 24px;
`

const FieldContainer = styled(Flex)`
  margin-bottom: 4px;
`

const StyledSelect = styled(Select)`
  flex: 1;

  .hey-select-placeholder {
    color: #b0b7c3;
  }

  &:hover .hey-button {
    border-color: #377dff;
  }
`

const StyledArrowRightIcon = styled(ArrowRightIcon)`
  margin-left: 12px;
  margin-right: 12px;
  width: 20px;
  height: 20px;
  color: #8a94a6;
`

const StyledInput = styled(Input)`
  flex: 1;
`

const StyledCloseIcon = styled(CloseIcon)`
  width: 18px;
  height: 18px;
  margin-left: 12px;
  color: #b0b7c3;
  cursor: pointer;
`

const AddContainer = styled(Flex)`
  margin-top: 8px;
  cursor: pointer;
  color: #8a94a6;
`

const StyledAddIcon = styled(AddIcon)`
  color: #8a94a6;
`

const FormError = styled.div`
  position: absolute;
  bottom: 0;
  color: ${props => props.theme.error};
  font-size: 12px;
  line-height: 16px;
`
