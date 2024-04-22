import { Choice } from '@heyforms/shared-types-enums'
import { isObject, isValid, isValidArray } from '@hpnp/utils/helper'
import { FC, useMemo } from 'react'

import { TagGroup } from '@/components'

import { SheetCellProps } from '../types'

export const MultipleChoiceCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = useMemo(() => {
    const v = row[column.key]

    if (isValid(v) && isObject(v)) {
      const choices = column.properties?.choices

      if (isValidArray(choices)) {
        let result: Choice[] = []

        if (isValidArray(v?.value)) {
          result = choices!.filter(choice => v.value.includes(choice.id)) || []
        }

        if (v.other) {
          result.push({
            id: v.other,
            label: v.other
          })
        }

        return result
      }
    }

    return []
  }, [column.key, column.properties?.choices, row])

  return (
    <div className="heygrid-cell-text flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
      <TagGroup tags={value} />
    </div>
  )
}
