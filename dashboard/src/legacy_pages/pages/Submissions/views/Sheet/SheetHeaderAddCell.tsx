import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { Popup } from '@heyui/component'
import { AddIcon } from '@heyui/icon'
import { nanoid } from '@hpnp/utils/nanoid'
import { useState } from 'react'
import styled from 'styled-components'
import { SheetOptionsForm } from './SheetOptions'
import { Column, ColumnOptions, OnColumnOptionsUpdate, SheetColumn } from './types'
import { stopPropagation } from './utils'

export const Add_COLUMN_KEY = 'add-row'

function getInitialColumn(): SheetColumn {
  return {
    key: nanoid(12),
    name: 'Custom column',
    kind: FieldKindEnum.CUSTOM_TEXT,
    width: 200,
    minWidth: 80,
    properties: {
      choices: []
    },
    hide: false,
    frozen: false
  }
}

export const SheetHeaderAddCell = (onColumnAdd: OnColumnOptionsUpdate): Column<any> => {
  function HeaderCellRenderer() {
    const [visible, setVisible] = useState(false)
    const [referenceRef, setReferenceRef] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [column, setColumn] = useState<SheetColumn | null>(null)

    async function handleRequest(column: SheetColumn, options: ColumnOptions) {
      setLoading(true)

      try {
        await onColumnAdd(column, options)
        handleClose()
      } catch (err: any) {
        setLoading(false)
        throw err
      }
    }

    function handleClick() {
      setVisible(true)
      setColumn(getInitialColumn())
    }

    function handleClose() {
      setLoading(false)
      setVisible(false)
      setColumn(null)
    }

    return (
      <>
        <Container ref={setReferenceRef} onClick={handleClick}>
          <AddIcon />
        </Container>
        <Popup
          visible={visible}
          style={{
            marginLeft: -12
          }}
          mask={true}
          zIndex={10}
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
          <SheetOptionsForm column={column!} loading={loading} onRequest={handleRequest} />
        </Popup>
      </>
    )
  }

  return {
    key: Add_COLUMN_KEY,
    cellClass: 'heygrid-add-cell',
    headerCellClass: 'heygrid-header-add-cell',
    name: 'Add',
    width: 68,
    maxWidth: 68,
    resizable: false,
    // @ts-ignore
    headerRenderer: HeaderCellRenderer,
    formatter() {
      return <div onClick={stopPropagation} />
    }
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`
