import { FieldKindEnum } from '@/legacy_pages/models'
import { Flex, Progress } from '@heyui/component'
import { isNumeric, isValid } from '@hpnp/utils/helper'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { AnswerList } from './AnswerList'

interface ReportItemProps {
  index: number
  response: any
}

interface ChoicesProps {
  chooses: any[]
}

interface RatingProps extends ChoicesProps {
  length: number
  leftLabel?: string
  rightLabel?: string
}

interface RatingLabelProps {
  index: number
  length: number
  leftLabel?: string
  rightLabel?: string
}

interface RatingAverageProps {
  kind: FieldKindEnum
  average?: number
}

const Choices: FC<ChoicesProps> = ({ chooses }) => {
  const { t } = useTranslation()
  const total = chooses.reduce((prev, next) => prev + next.count, 0)

  return (
    <ChoiceContainer>
      {chooses.map((row, index) => (
        <ChoiceItem key={index}>
          <Flex align="center" justify="space-between" style={{ marginBottom: 8 }}>
            <ChoiceLabel>
              {row.label} · {total > 0 ? Math.round((row.count * 100) / total) : 0}%
            </ChoiceLabel>
            <ChoiceCount>
              {row.count} {t('report.responses')}
            </ChoiceCount>
          </Flex>
          <StyledProgress
            percent={row.count / total}
            barClassName="bar"
            backgroundClassName="background"
          />
        </ChoiceItem>
      ))}
    </ChoiceContainer>
  )
}

const RatingLabel: FC<RatingLabelProps> = ({ index, length, leftLabel, rightLabel }) => {
  return (
    <>
      {(() => {
        if (index === 0 && isValid(leftLabel)) {
          return `${leftLabel} · `
        } else if (index === length - 1 && isValid(rightLabel)) {
          return `${rightLabel} · `
        }
      })()}
    </>
  )
}

const RatingAverage: FC<RatingAverageProps> = ({ kind, average }) => {
  const { t } = useTranslation()
  return kind === FieldKindEnum.OPINION_SCALE || kind === FieldKindEnum.RATING ? (
    <>{` · ${average} ${t('report.average')}`}</>
  ) : (
    <></>
  )
}

const Rating: FC<RatingProps> = ({ length, leftLabel, rightLabel, chooses }) => {
  const { t } = useTranslation()
  const arrays = Array.from<number>({ length }).map((_, index) => index + 1)
  const total = chooses.filter(isNumeric).reduce((prev, next) => prev + next, 0)

  return (
    <ChoiceContainer>
      {arrays.map((row, index) => {
        const num = chooses[row] || 0

        return (
          <ChoiceItem key={index}>
            <Flex align="center" justify="space-between" style={{ marginBottom: 8 }}>
              <ChoiceLabel>
                {row} ·{' '}
                <RatingLabel
                  index={index}
                  length={length}
                  leftLabel={leftLabel}
                  rightLabel={rightLabel}
                />
                {total > 0 ? Math.round((num * 100) / total) : 0}%
              </ChoiceLabel>
              <ChoiceCount>
                {num} {t('report.responses')}
              </ChoiceCount>
            </Flex>
            <StyledProgress
              percent={num / total}
              barClassName="bar"
              backgroundClassName="background"
            />
          </ChoiceItem>
        )
      })}
    </ChoiceContainer>
  )
}

export const ReportItem: FC<ReportItemProps> = ({ index, response }) => {
  const { t } = useTranslation()

  return (
    <Container>
      <Title id={`field-${response.id}`}>
        {index}. {response.title}
      </Title>
      <Description>
        {response.count} {t('report.responses')}
        <RatingAverage kind={response.kind} average={response.average}/>
      </Description>
      {(() => {
        switch (response.kind) {
          case FieldKindEnum.YES_NO:
          case FieldKindEnum.SINGLE_CHOICE:
          case FieldKindEnum.MULTIPLE_CHOICE:
          case FieldKindEnum.PICTURE_CHOICE:
          case FieldKindEnum.DROPDOWN:
            return <Choices chooses={response.chooses}/>

          case FieldKindEnum.RATING:
          case FieldKindEnum.OPINION_SCALE:
            return (
              <Rating
                length={response.properties?.total}
                leftLabel={response.properties?.leftLabel}
                rightLabel={response.properties?.rightLabel}
                chooses={response.chooses}
              />
            )

          default:
            return <AnswerList response={response}/>
        }
      })()}
    </Container>
  )
}

const Container = styled.div`
  padding: 0 34px 16px 34px;
  margin-bottom: 40px;
  background: #fff;
  border-radius: 3px;

  @media print {
    padding: 0;
  }
`

const Title = styled.div`
  margin-bottom: 4px;
  padding-top: 34px;
  font-size: 16px;
  font-weight: 500;
`

const Description = styled.div`
  margin-bottom: 24px;
  color: #8a94a6;
`

const ChoiceContainer = styled.div`
  margin-bottom: 16px;
`

const ChoiceItem = styled.div`
  margin-bottom: 20px;
`

const ChoiceLabel = styled.div`
  //color: #8a94a6;
`

const ChoiceCount = styled.div`
  font-size: 12px;
  color: #b0b7c3;
`

const StyledProgress = styled(Progress)`
  width: 100%;
  height: 5px;

  .bar,
  .background {
    border-radius: ${props => props.theme.borderRadius};
  }

  .background {
    background: ${props => props.theme.background};
    border: none;

    @media print {
      border: 1px solid ${props => props.theme.border};
    }
  }

  .bar {
    background: #38cb89;

    @media print {
      border: 1px solid #38cb89;
    }
  }
`

const ResponseListContainer = styled.div`
  margin-bottom: 20px;
  padding: 24px;
  background: #fafbfc;
  border-radius: 3px;

  table {
    width: 100%;

    tbody {
      tr td {
        padding: 12px 0;
        border-bottom: 1px solid #f3f3f3;
      }
    }
  }
`
