import { Choice } from '@heyforms/shared-types-enums'
import { isObject, isValid, isValidArray } from '@hpnp/utils/helper'
import { IconPhoto } from '@tabler/icons-react'
import { FC, useMemo } from 'react'

import { TagGroup } from '@/components'

import { SheetCellProps } from '../types'

export const PictureChoiceCell: FC<SheetCellProps> = ({ column, row }) => {
  const { value, other } = useMemo(() => {
    let value: Choice[] = []
    const other: Choice[] = []

    const v = row[column.key]

    if (isValid(v) && isObject(v)) {
      const choices = column.properties?.choices

      if (isValidArray(choices)) {
        if (isValidArray(v?.value)) {
          value = choices!.filter(choice => v.value.includes(choice.id)) || []
        }

        if (v.other) {
          other.push({
            id: v.other,
            label: v.other
          })
        }
      }
    }

    return { value, other }
  }, [column.key, column.properties?.choices, row])

  return (
    <div className="heygrid-cell-text flex items-center px-4">
      {value.map((choice, index) =>
        choice.image ? (
          <img
            className="mr-2 h-5 w-5 object-cover"
            key={index}
            src={choice.image!}
            width={40}
            height={40}
          />
        ) : (
          <IconPhoto key={index} />
        )
      )}

      {other.length > 0 && <TagGroup tags={other} />}
    </div>
  )
}
