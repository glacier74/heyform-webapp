import { ExpandIcon } from '@/legacy_pages/components/Icons'
import { SelectCellFormatter } from '@/legacy_pages/pages/Submissions/views/Sheet/formatters'
import type { Column } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { stopPropagation } from '@/legacy_pages/pages/Submissions/views/Sheet/utils/domUtils'
import { Checkbox, Flex } from '@heyui/component'
import styled from 'styled-components'

export const SELECT_COLUMN_KEY = 'select-row'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectColumn: Column<any, any> = {
  key: SELECT_COLUMN_KEY,
  headerCellClass: 'heygrid-header-select-cell',
  cellClass: 'heygrid-select-cell',
  name: '',
  width: 90,
  maxWidth: 90,
  resizable: false,
  sortable: false,
  frozen: true,
  headerRenderer(props) {
    return (
      <StyledFlex align="center">
        <StyledCheckbox
          className="heygrid-checkbox"
          ariaLabel="Select All"
          checked={props.allRowsSelected}
          value={true}
          onChange={props.onAllRowsSelectionChange}
        />
      </StyledFlex>
    )
  },
  formatter(props) {
    function handleExpand() {
      props.onRowExpand(props.row)
    }

    function handleChange(checked: boolean, _: any, event: React.ChangeEvent<HTMLInputElement>) {
      props.onRowSelectionChange(checked, (event.nativeEvent as MouseEvent).shiftKey)
    }

    return (
      <StyledFlex align="center" justify="space-between" onClick={stopPropagation}>
        <Left align="center">
          <RowIdx className="heygrid-rowidx">{props.rowIdx + 1}</RowIdx>
          <StyledCheckbox
            className="heygrid-checkbox"
            ariaLabel="Select"
            checked={props.isRowSelected}
            value={true}
            onChange={handleChange}
          />
        </Left>
        <Right align="center" onClick={handleExpand}>
          <ExpandIcon className="heygrid-row-expand" />
          {/*<StyledMaximizeIcon*/}
          {/*  className="heygrid-row-expand"*/}
          {/*  onClick={handleExpand}*/}
          {/*/>*/}
        </Right>
      </StyledFlex>
    )
  },
  groupFormatter(props) {
    return (
      <SelectCellFormatter
        aria-label="Select Group"
        tabIndex={-1}
        isCellSelected={props.isCellSelected}
        value={props.isRowSelected}
        onChange={props.onRowSelectionChange}
        // Stop propagation to prevent row selection
        onClick={stopPropagation}
      />
    )
  }
}

const StyledFlex = styled(Flex)`
  height: 100%;
`

const RowIdx = styled.span`
  width: 20px;
  text-align: center;
  opacity: 1;
`

const StyledCheckbox = styled(Checkbox)`
  border-radius: 4px;
  background: #fafbfc;

  &,
  span {
    width: 20px !important;
    height: 20px !important;
  }
`

const Left = styled(Flex)`
  position: relative;

  ${StyledCheckbox} {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
  }
`

const Right = styled(Flex)``
