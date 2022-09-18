import { CheckIcon, MinusIcon } from '@heroicons/react/outline'
import { isBoolean } from '@hpnp/utils/helper'
import type { FC } from 'react'

interface SectionProps {
  title: string
  values: Array<Array<any>>
}

export const Section: FC<SectionProps> = ({ title, values }) => {
  return (
    <>
      <tr>
        <th
          className="bg-slate-50 py-3 text-sm font-medium text-slate-900 text-left"
          colSpan={5}
          scope="colgroup"
        >
          {title}
        </th>
      </tr>

      {values.map((row, i) => (
        <tr key={i}>
          {row.map((value, k) => (
            <td key={k} className="py-5 text-sm font-normal text-slate-500 text-left" scope="row">
              {isBoolean(value) ? (
                value ? (
                  <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                ) : (
                  <MinusIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                )
              ) : (
                value
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
