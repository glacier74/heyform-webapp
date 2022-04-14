import { FormError } from '@/legacy_pages/components'
import { CUSTOM_COLUMN_CHOICE_KINDS, CUSTOM_COLUMN_KINDS } from '@heyforms/shared-types-enums'
import { Dropdown } from '@heyforms/ui'
import { Button, Flex, Form, FormItem, Input, Menu, Select } from '@heyui/component'
// @ts-ignore
import { COLOR_PALETTE } from '@heyui/component/esm/constants'
import { ArrowDownSFillIcon, CheckIcon, CloseIcon } from '@heyui/icon'
import { isDarkColor } from '@hpnp/utils/color'
import { nanoid } from '@hpnp/utils/nanoid'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { COLUMN_TYPE_OPTIONS } from './constants'
import { randomColor } from './helper'
import { ColorSelectorProps, ColumnOptions, SheetOptionsFormProps } from './types'

const ColorSelector: FC<ColorSelectorProps> = ({ color, onChange }) => {
  const Overlay = (
    <Menu>
      <PaletteContainer wrap="wrap">
        {COLOR_PALETTE.map((row: any, index: number) => (
          <PaletteItem
            key={index}
            align="center"
            justify="center"
            fillColor={row}
            isDark={isDarkColor(row)}
            onClick={() => onChange(row)}
          >
            {color === row && <CheckIcon />}
          </PaletteItem>
        ))}
      </PaletteContainer>
    </Menu>
  )

  return (
    <Dropdown placement="right" mask={true} overlay={Overlay}>
      <ColorContainer fillColor={color} isDark={isDarkColor(color)}>
        <ArrowDownSFillIcon />
      </ColorContainer>
    </Dropdown>
  )
}

const SheetOptionsChoices: FC = () => {
  return (
    <Form.List name="choices">
      {(fields, { add, remove }) => {
        function handleAdd() {
          add({
            id: nanoid(12),
            label: '',
            color: randomColor()
          })
        }

        return (
          <>
            <Title>Options</Title>

            {fields.map((field, index) => (
              <Form.Field {...field}>
                {({ value, onChange }) => {
                  function handleLabelChange(label: string) {
                    onChange({
                      ...value,
                      label
                    })
                  }

                  function handleColorChange(color: string) {
                    onChange({
                      ...value,
                      color
                    })
                  }

                  return (
                    <ChoiceContainer align="center">
                      <ColorSelector color={value?.color} onChange={handleColorChange} />
                      <ChoiceInput size="small" value={value?.label} onChange={handleLabelChange} />
                      {fields.length > 1 && (
                        <RemoveChoice align="center" justify="center" onClick={() => remove(index)}>
                          <CloseIcon />
                        </RemoveChoice>
                      )}
                    </ChoiceContainer>
                  )
                }}
              </Form.Field>
            ))}
            <AddChoiceButton role="button" aria-label="Add an option" onClick={handleAdd}>
              Add an option
            </AddChoiceButton>
          </>
        )
      }}
    </Form.List>
  )
}

export const SheetOptionsForm: FC<SheetOptionsFormProps> = ({ column, loading, onRequest }) => {
  const [error, setError] = useState<Error | null>(null)
  const [options, setOptions] = useState<ColumnOptions>({
    name: column?.name,
    kind: column?.kind,
    choices: column?.properties?.choices || []
  })
  const isCustomColumn = column && CUSTOM_COLUMN_KINDS.includes(options.kind! as any)

  async function handleFinish(options: ColumnOptions) {
    if (loading) {
      return
    }

    setError(null)

    try {
      await onRequest(column!, options)
    } catch (err: any) {
      setError(err)
    }
  }

  function handleValuesChange(changes: any) {
    setOptions({
      ...options,
      ...changes
    })
  }

  return (
    <StyledMenu>
      <Form initialValues={options} onValuesChange={handleValuesChange} onFinish={handleFinish}>
        <FormItem
          name="name"
          label="Title"
          hideRequiredMark={true}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input size="small" />
        </FormItem>
        <FormItem
          name="kind"
          label="Column Type"
          hideRequiredMark={true}
          rules={[
            {
              required: true
            }
          ]}
        >
          <StyledSelect
            size="small"
            options={COLUMN_TYPE_OPTIONS}
            allowClear={false}
            disabled={!isCustomColumn}
          />
        </FormItem>
        {isCustomColumn && CUSTOM_COLUMN_CHOICE_KINDS.includes(options.kind! as any) && (
          <SheetOptionsChoices />
        )}
        {error && <FormError error={error} />}
        <FormItem>
          <Button type="primary" htmlType="submit" loading={loading} block={true}>
            Confirm
          </Button>
        </FormItem>
      </Form>
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  width: 320px;
  max-height: 480px;
  padding: 16px 16px 4px 16px;
  overflow-y: auto;
`

const StyledSelect = styled(Select)`
  &,
  button {
    width: 100%;
  }
`

const Title = styled.div`
  margin-bottom: 4px;
  font-weight: 500;
`

const ChoiceContainer = styled(Flex)`
  margin-bottom: 4px;
`

const ChoiceInput = styled(Input)`
  flex: 1;
`

const AddChoiceButton = styled.div`
  margin-bottom: 16px;
  color: ${props => props.theme.primary};
  cursor: pointer;
`

const RemoveChoice = styled(Flex)`
  width: 40px;
  height: 40px;
  margin-right: -5px;
  color: ${props => props.theme.disabled};
  cursor: pointer;
  transition: color 150ms;

  &:hover {
    color: ${props => props.theme.text};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const ColorContainer = styled.div<{
  fillColor: string
  isDark: boolean
}>`
  margin-right: 12px;
  border-radius: 50%;
  background-color: ${props => props.fillColor};

  ${({ isDark, theme }) =>
    isDark &&
    `
    color: ${theme.white};
  `};

  &,
  svg {
    width: 18px;
    height: 18px;
  }
`

const PaletteContainer = styled(Flex)`
  position: relative;
  width: 288px;
  padding: 8px 12px;
`

const PaletteItem = styled(Flex)<{
  fillColor: string
  isDark: boolean
}>`
  margin: 4px 2px;
  width: 20px;
  height: 20px;
  background-color: ${props => props.fillColor};
  cursor: pointer;

  ${({ isDark, theme }) =>
    isDark &&
    `
    color: ${theme.white};
  `};

  svg {
    width: 16px;
    height: 16px;
  }
`
