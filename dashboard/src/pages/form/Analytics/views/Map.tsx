import { isValid } from '@hpnp/utils/helper'
import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SubHeading } from '@/components'
import { SubmissionService } from '@/service'
import { useAsyncEffect, useParam } from '@/utils'

import { WorldMap } from './WorldMap'
import countryMaps from './WorldMap/countryMaps'

const COLORS = [
  '#3370ff',
  '#f65c57',
  '#42aa37',
  '#f2ba01',
  '#7f3bf5',
  '#abcc00',
  '#1dbba5',
  '#ff8800',
  '#0dafea',
  '#f14ba9'
]

interface CountryItemProps {
  color: string
  code: string
  region: string
  total: string
}

const CountryItem: FC<CountryItemProps> = ({ color, region, total }) => {
  return (
    <div className="flex items-center">
      <div
        className="h-3 w-3 rounded-[50%]"
        style={{
          backgroundColor: color
        }}
      />
      <div className="ml-2 mr-2 flex-1 text-[#8a94a6]">{region}</div>
      <div className="w-10 text-right">{total}</div>
    </div>
  )
}

export interface RangeProps {
  start?: string
  end?: string
}

interface MapProps {
  range: RangeProps
}

function getRegion(isoCode: string): string {
  return countryMaps[isoCode] ?? 'Other'
}

export const Map: FC<MapProps> = ({ range }) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const [records, setRecords] = useState<CountryItemProps[]>([])

  const mapSize = useMemo(() => {
    if (window.DEVICE_INFO.mobile) {
      const width = window.innerWidth - 80

      return {
        width,
        height: (400 / 650) * width
      }
    }

    return {
      width: 650,
      height: 400
    }
  }, [])

  useAsyncEffect(async () => {
    if (isValid(range.start) && isValid(range.end)) {
      const result = await SubmissionService.locations({
        formId,
        start: range.start!,
        end: range.end!
      })

      if (isValid(result)) {
        const records = result.map((row: any, index: number) => {
          row.code = row.code.toLowerCase()
          row.color = COLORS[index]
          row.region = getRegion(row.code)
          return row
        })
        setRecords(records)
      }
    }
  }, [range])

  return (
    <div className="mb-12">
      <SubHeading>{t('analytics.topAudience')}</SubHeading>
      <div className="flex flex-col rounded-[3px] bg-white p-6 lg:flex-row lg:justify-between">
        <div className="mb-4 w-auto border-r border-gray-200 pr-8 pl-5 lg:my-8 lg:w-[300px]">
          <div>
            {records.map(row => (
              <CountryItem key={row.code} {...row} />
            ))}
          </div>
        </div>
        <WorldMap {...mapSize} data={records} />
      </div>
    </div>
  )
}
