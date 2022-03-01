import { FieldKindEnum, FormField, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { ComponentProps, Flex, Input, Select, Switch } from '@heyui/component'
import { CSSProperties, FC, useRef, useState } from 'react'
import styled from 'styled-components'
import { useStoreContext } from '../store'
import { getStyleFromRect, useLockBodyScroll } from '../utils'
import { DATE_FORMATS, RATING_SHAPES, STYLE_OPTIONS } from './BlockOptions'
import { DragIcon } from './Icons'
import { Portal } from './Portal'

interface BlockSettingsProps extends ComponentProps {
  field: FormField
}

const RequiredSettings: FC<BlockSettingsProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleChange(required: boolean) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          validations: {
            ...field.validations,
            required
          }
        }
      }
    })
  }

  return (
    <Menu align="center" justify="space-between">
      <span>Required</span>
      <Switch value={field.validations?.required} onChange={handleChange} />
    </Menu>
  )
}

const SingleChoiceSettings: FC<BlockSettingsProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleChange(value: any) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            choiceStyle: value
          }
        }
      }
    })
  }

  return (
    <>
      <MenuLabel align="center">Style</MenuLabel>
      <SelectWrapper>
        <Select
          options={STYLE_OPTIONS}
          value={field.properties?.choiceStyle || 'list'}
          optionTooltip="Select style"
          onChange={handleChange}
        />
      </SelectWrapper>
    </>
  )
}

const PictureChoiceSettings: FC<BlockSettingsProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleChange(allowMultiple: boolean) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            allowMultiple
          }
        }
      }
    })
  }

  return (
    <Menu align="center" justify="space-between">
      <span>Multiple selection</span>
      <Switch value={field.properties?.allowMultiple} onChange={handleChange} />
    </Menu>
  )
}

const MultipleChoiceSettings: FC<BlockSettingsProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  const len = field.properties?.choices?.length
  const min = field.validations?.min ?? (field.validations?.required ? 1 : 0)
  const max = field.validations?.max ?? len

  function handleMinChange(value: number) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          validations: {
            ...field.validations,
            min: value
          }
        }
      }
    })
  }

  function handleMaxChange(value: number) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          validations: {
            ...field.validations,
            max: value
          }
        }
      }
    })
  }

  return (
    <>
      <MenuLabel align="center">Minimum selection</MenuLabel>
      <Input
        type="number"
        value={min}
        min={0}
        max={max}
        placeholder={`0 - ${max}`}
        onChange={handleMinChange}
      />
      <MenuLabel align="center">Maximum selection</MenuLabel>
      <Input
        type="number"
        value={max}
        min={min}
        max={len}
        placeholder={`${min} - ${len}`}
        onChange={handleMaxChange}
      />
    </>
  )
}

const ScaleSettings: FC<BlockSettingsProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleTotalChange(total: number) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            total
          }
        }
      }
    })
  }

  return (
    <>
      <MenuLabel align="center">Scale</MenuLabel>
      <Input
        type="number"
        value={field.properties?.total}
        min={1}
        max={10}
        onChange={handleTotalChange}
      />
    </>
  )
}

const RatingSettings: FC<BlockSettingsProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleChange(value: any) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            shape: value
          }
        }
      }
    })
  }

  return (
    <>
      <ScaleSettings field={field} />
      <MenuLabel align="center">Shape</MenuLabel>
      <SelectWrapper>
        <Select
          options={RATING_SHAPES}
          value={field.properties?.shape}
          optionTooltip="Select rating shape"
          onChange={handleChange}
        />
      </SelectWrapper>
    </>
  )
}

const OpinionScaleSettings: FC<BlockSettingsProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleLeftLabelChange(leftLabel: string) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            leftLabel
          }
        }
      }
    })
  }

  function handleCenterLabelChange(centerLabel: string) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            centerLabel
          }
        }
      }
    })
  }

  function handleRightLabelChange(rightLabel: string) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            rightLabel
          }
        }
      }
    })
  }

  return (
    <>
      <ScaleSettings field={field} />
      <MenuLabel align="center">Left label</MenuLabel>
      <Input value={field.properties?.leftLabel} onChange={handleLeftLabelChange} />
      <MenuLabel align="center">Center label</MenuLabel>
      <Input value={field.properties?.centerLabel} onChange={handleCenterLabelChange} />
      <MenuLabel align="center">Right label</MenuLabel>
      <Input value={field.properties?.rightLabel} onChange={handleRightLabelChange} />
    </>
  )
}

const DateSettings: FC<BlockSettingsProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleChange(value: any) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            format: value
          }
        }
      }
    })
  }

  return (
    <>
      <MenuLabel align="center">Date format</MenuLabel>
      <SelectWrapper>
        <Select
          options={DATE_FORMATS}
          value={field.properties?.format}
          optionTooltip="Select date format"
          onChange={handleChange}
        />
      </SelectWrapper>
    </>
  )
}

export const BlockSettingsMenu: FC<BlockSettingsProps> = ({ field, ...restProps }) => {
  const ref = useRef<any>()
  const { dispatch } = useStoreContext()

  const [visible, setVisible] = useState(false)
  const [portalStyle, setPortalStyle] = useState<CSSProperties>()

  function handleClose() {
    setVisible(false)
  }

  function handleClick(event: any) {
    event.preventDefault()
    event.stopPropagation()

    const rect = ref.current!.getBoundingClientRect()

    setVisible(true)
    setPortalStyle(getStyleFromRect(rect))
  }

  function handleDuplicate() {
    dispatch({
      type: 'duplicateField',
      payload: {
        id: field.id
      }
    })
    handleClose()
  }

  function handleDelete() {
    dispatch({
      type: 'deleteField',
      payload: {
        id: field.id
      }
    })
    handleClose()
  }

  // Prevent scrolling when menu is open
  useLockBodyScroll(visible)

  return (
    <>
      <DragButton ref={ref} className="block-drag-handler" onClick={handleClick} {...restProps}>
        <DragIcon />
      </DragButton>

      <Portal visible={visible}>
        <Overlay onClick={handleClose} />
        <Container style={portalStyle} {...restProps}>
          {QUESTION_FIELD_KINDS.includes(field.kind) && (
            <MenuGroup>
              <MenuHeader align="center">Options</MenuHeader>
              <RequiredSettings field={field} />

              {(() => {
                switch (field.kind) {
                  case FieldKindEnum.DATE:
                    return <DateSettings field={field} />

                  case FieldKindEnum.PICTURE_CHOICE:
                    return (
                      <>
                        <PictureChoiceSettings field={field} />
                        {field.properties?.allowMultiple && (
                          <MultipleChoiceSettings field={field} />
                        )}
                      </>
                    )

                  case FieldKindEnum.RATING:
                    return <RatingSettings field={field} />

                  case FieldKindEnum.OPINION_SCALE:
                    return <OpinionScaleSettings field={field} />

                  case FieldKindEnum.MULTIPLE_CHOICE:
                    return <MultipleChoiceSettings field={field} />

                  case FieldKindEnum.SINGLE_CHOICE:
                    return <SingleChoiceSettings field={field} />

                  default:
                    return null
                }
              })()}
            </MenuGroup>
          )}
          <CommonMenu align="center" onClick={handleDuplicate}>
            Duplicate
          </CommonMenu>
          <CommonMenu align="center" onClick={handleDelete}>
            Delete
          </CommonMenu>
        </Container>
      </Portal>
    </>
  )
}

const DragButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #666;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`

const Container = styled.div`
  position: fixed;
  width: 300px;
  height: inherit;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(60, 66, 87, 0.05) 0px 0px 0px 1px, rgba(60, 66, 87, 0.1) 0px 3px 6px,
    rgba(60, 66, 87, 0.2) 0px 9px 24px;
  overflow-y: auto;
  z-index: 10000;
`

const Menu = styled(Flex)`
  padding: 0 14px;
  height: 32px;

  &:hover {
    background-color: #fafafa;
  }
`

const MenuLabel = styled(Flex)`
  padding: 4px 14px;
`

const CommonMenu = styled(Menu)`
  cursor: pointer;
`

const MenuGroup = styled.div`
  padding: 4px 0px 12px 0;
  border-bottom: 1px solid #eee;

  .hey-input {
    padding: 0 14px;

    input {
      padding: 4px 8px;
    }
  }

  .hey-select {
    padding: 4px 8px;
  }
`

const SelectWrapper = styled.div`
  padding: 0 14px;
`

const MenuHeader = styled(Flex)`
  padding: 0px 14px;
  height: 32px;
  font-size: 11px;
  font-weight: bold;
  line-height: 1.5;
  text-transform: uppercase;
  color: rgba(136, 136, 136, 0.8);
`
