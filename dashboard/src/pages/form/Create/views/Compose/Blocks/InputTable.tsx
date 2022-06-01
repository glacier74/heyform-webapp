import { useStoreContext } from '@/pages/form/Create/store'
import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import type { Choice } from '@heyforms/shared-types-enums'
import { Button } from '@heyforms/ui'
import { clone } from '@hpnp/utils'
import { nanoid } from '@hpnp/utils/nanoid'
import type { FC } from 'react'
import { startTransition, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

interface TheadProps extends Omit<IComponentProps, 'onChange'> {
  index: number
  column: Partial<Choice>
  deletable?: boolean
  onChange?: (columnId: string, value: any) => void
  onRemove?: (columnId: string) => void
}

const Thead: FC<TheadProps> = ({ index, column, deletable, onChange, onRemove, ...restProps }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(column.label)

  function handleChange(event: any) {
    const newValue = event.target.value

    setValue(newValue)
    startTransition(() => {
      onChange?.(column.id!, newValue)
    })
  }

  function handleRemove() {
    onRemove?.(column.id!)
  }

  return (
    <th>
      <div className="builder-input-table-thead" {...restProps}>
        <div className="builder-radio-remove" onClick={handleRemove}>
          <XIcon />
        </div>
        <input
          type="text"
          value={value}
          placeholder={t('formBuilder.columnPlaceholder', { index: index + 1 })}
          onChange={handleChange}
        />
      </div>
    </th>
  )
}

export const InputTable: FC<BlockProps> = ({ field, ...restProps }) => {
  const { dispatch } = useStoreContext()
  const { t } = useTranslation()

  function handleAddColumn() {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            tableColumns: [
              ...(field.properties?.tableColumns || []),
              {
                id: nanoid(12),
                label: ''
              }
            ]
          }
        }
      }
    })
  }

  function handleLabelChange(columnId: string, label: any) {
    const properties = clone(field.properties)
    const tableColumns = properties?.tableColumns || []
    const index = tableColumns.findIndex(c => c.id === columnId)

    tableColumns[index].label = label

    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...properties,
            tableColumns
          }
        }
      }
    })
  }

  function handleRemoveColumn(columnId: string) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            tableColumns: field.properties?.tableColumns?.filter(c => c.id !== columnId)
          }
        }
      }
    })
  }

  const handleAddColumnCallback = useCallback(handleAddColumn, [field.properties])
  const handleLabelChangeCallback = useCallback(handleLabelChange, [field.properties])
  const handleRemoveColumnCallback = useCallback(handleRemoveColumn, [field.properties])

  return (
    <Block className="builder-input-table" field={field} {...restProps}>
      <div className="flex items-center justify-end mb-2">
        <Button.Link className="builder-add-column" onClick={handleAddColumnCallback}>
          {t('formBuilder.addColumn')}
        </Button.Link>
      </div>
      <div className="builder-table-scrollable">
        <table>
          <thead>
            <tr className="builder-input-table-header">
              {field.properties?.tableColumns?.map((column, index) => (
                <Thead
                  key={column.id}
                  index={index}
                  column={column}
                  deletable={field.properties!.tableColumns!.length > 1}
                  onRemove={handleRemoveColumnCallback}
                  onChange={handleLabelChangeCallback}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="builder-input-table-row">
                {field.properties?.tableColumns?.map(column => (
                  <td key={column.id}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
