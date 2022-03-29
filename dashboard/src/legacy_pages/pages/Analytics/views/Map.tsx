import { SubHeading } from '@/legacy_pages/components'
import countryMaps from '@/legacy_pages/pages/Analytics/views/WorldMap/countryMaps'
import { useAsyncEffect } from '@/legacy_pages/utils'
import { SubmissionService } from '@/service'
import { useParam } from '@/utils'
import { Flex } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { WorldMap } from './WorldMap'

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
    <CountryContainer align="center">
      <Dot
        style={{
          backgroundColor: color
        }}
      />
      <Name>{region}</Name>
      <Count>{total}</Count>
    </CountryContainer>
  )
}

const CountryContainer = styled(Flex)``

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`

const Name = styled.div`
  margin-left: 6px;
  margin-right: 6px;
  flex: 1;
  color: #8a94a6;
`

const Count = styled.div`
  width: 40px;
  text-align: right;
`

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
    <Container>
      <SubHeading>{t('analytics.topAudience')}</SubHeading>
      <StyledFlex justify="space-between">
        <Left>
          <LeftWrapper>
            {records.map(row => (
              <CountryItem key={row.code} {...row} />
            ))}
          </LeftWrapper>
        </Left>
        <WorldMap width={650} height={400} data={records}/>
      </StyledFlex>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 48px;
`

const StyledFlex = styled(Flex)`
  padding: 24px;
  background: #fff;
  border-radius: 3px;
`

const Left = styled.div`
  width: 300px;
  margin: 30px 0;
  padding: 0 30px 0 20px;
  border-right: 1px solid #f3f3f3;
`

const LeftWrapper = styled.div``
