import { ArrowDownIcon } from '@/legacy_pages/components/Icons'
import { INTERNAL_COLUMN_KINDS } from '@/legacy_pages/constants'
import { CUSTOM_COLUMN_KINDS } from '@heyforms/shared-types-enums'
import { Dropdown, IconText, Menu, Popup } from '@heyui/component'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { SheetKindIcon } from './SheetKindIcon'
import { SheetOptionsForm } from './SheetOptions'
import { ColumnOptions, HeaderCellAction, SheetColumn, SheetHeaderCellProps } from './types'

export const SheetHeaderCell: FC<SheetHeaderCellProps> = ({
  column,
  onColumnPin,
  onColumnUnpin,
  onColumnHide,
  onColumnDelete,
  onColumnOptionsUpdate
}) => {
  const [visible, setVisible] = useState(false)
  const [referenceRef, setReferenceRef] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const Overlay = (
    <StyledMenu onClick={handleMenuClick as any}>
      {CUSTOM_COLUMN_KINDS.includes(column.kind as any) && (
        <Menu.Item name="EDIT_OPTIONS">Edit column options</Menu.Item>
      )}
      {CUSTOM_COLUMN_KINDS.includes(column.kind as any) && <Menu.Divider />}
      {column.frozen ? (
        <Menu.Item name="UNPIN">Unpin column</Menu.Item>
      ) : (
        <Menu.Item name="PIN">Pin column</Menu.Item>
      )}
      <Menu.Item type="error" name="DELETE">
        Delete column
      </Menu.Item>
    </StyledMenu>
  )

  async function handleRequest(column: SheetColumn, values: ColumnOptions) {
    setLoading(true)

    try {
      await onColumnOptionsUpdate!(column, values)
      handleClose()
    } catch (err: any) {
      setLoading(false)
      throw err
    }
  }

  function handleClose() {
    setLoading(false)
    setVisible(false)
  }

  function handleMenuClick(action: HeaderCellAction) {
    switch (action) {
      case 'EDIT_OPTIONS':
        setVisible(true)
        break

      case 'PIN':
        onColumnPin!(column)
        break

      case 'UNPIN':
        onColumnUnpin!(column)
        break

      case 'HIDE':
        onColumnHide!(column)
        break

      case 'DELETE':
        onColumnDelete!(column)
        break
    }
  }

  return (
    <>
      <HeaderCellContainer ref={setReferenceRef} className="heygrid-header-cell">
        <StyledIconText
          textClassName="heygrid-header-text"
          icon={<SheetKindIcon kind={column.kind!} />}
        >
          {column.name}
        </StyledIconText>
        {!INTERNAL_COLUMN_KINDS.includes(column.kind as any) && (
          <StyledDropdown placement="bottom-end" offset={{ top: 8 }} overlay={Overlay}>
            <ArrowDownIcon />
          </StyledDropdown>
        )}
      </HeaderCellContainer>

      <Popup
        visible={visible}
        mask={true}
        maskClosable={!loading}
        referenceRef={referenceRef}
        popperOptions={{
          placement: 'bottom-start',
          strategy: 'fixed',
          modifiers: [
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: false
              }
            }
          ]
        }}
        onMaskClick={() => (loading ? undefined : setVisible(false))}
      >
        <SheetOptionsForm column={column} loading={loading} onRequest={handleRequest} />
      </Popup>
    </>
  )
}

const HeaderCellContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledIconText = styled(IconText)`
  margin-right: 4px;

  &,
  .heygrid-header-text {
    flex: 1;
  }

  .heygrid-header-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    width: 22px;
    height: 22px;
    margin-left: -4px;
    padding: 2px;
    margin-right: 8px;
    color: #8a94a6;
  }
`

const MenuIconText = styled(IconText)`
  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`

const StyledDropdown = styled(Dropdown)`
  width: 24px;
  height: 24px;
  padding: 7px;
  border-radius: 50%;
  color: #b0b7c3;
  transition: background-color, color 0.3s;

  &:hover {
    background: #fafbfc;
    color: #8a94a6;
  }

  svg {
    width: 10px;
    height: 10px;
  }
`

const StyledMenu = styled(Menu)`
  width: 200px;
`
