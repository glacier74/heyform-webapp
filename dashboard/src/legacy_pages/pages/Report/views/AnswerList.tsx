import { Fetcher, Heading } from '@/legacy_pages/components'
import { PaginationBar } from '@/legacy_pages/components/PaginationBar'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { SubmissionService } from '@/service'
import { useParam } from '@/utils'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { Flex } from '@heyui/component'
import { isValidArray } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import * as timeago from 'timeago.js'
import { ModalListSkeleton } from './ModalListSkeleton'

interface AnswerModel {
  submissionId: string
  kind: FieldKindEnum
  value: any
  endAt: number
}

interface AnswerListProps {
  response: {
    count: number
    answers: AnswerModel[]
  }
}

export const AnswerValue: FC<{ answer: AnswerModel }> = ({ answer }) => {
  return (
    <ItemValue align="center" auto={true}>
      {(() => {
        switch (answer.kind) {
          case FieldKindEnum.ADDRESS:
            return (
              answer.value &&
              `${answer.value.address1}, ${answer.value.address2} ${answer.value.city}, ${answer.value.state}, ${answer.value.zip}`
            )

          case FieldKindEnum.FULL_NAME:
            return answer.value && `${answer.value.firstName} ${answer.value.lastName}`

          case FieldKindEnum.FILE_UPLOAD:
            return (
              <a
                href={`${answer.value.cdnUrlPrefix}/${
                  answer.value.cdnKey
                }?attname=${encodeURIComponent(answer.value?.filename)}`}
                target="_blank"
                rel="noreferrer"
              >
                {answer.value?.filename}
              </a>
            )

          case FieldKindEnum.SIGNATURE:
            return (
              <a href={`${answer.value}?attname=signature.jpg`} target="_blank" rel="noreferrer">
                Signature
              </a>
            )

          default:
            return answer.value
        }
      })()}
    </ItemValue>
  )
}

interface AnswerModalProps {
  visible?: boolean
  response: any
  onVisibleChange?: (visible: boolean) => void
}

const AnswerModal: FC<AnswerModalProps> = ({ visible, response, onVisibleChange }) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [answers, setAnswers] = useState<AnswerModel[]>([])

  function handleClose() {
    onVisibleChange && onVisibleChange(false)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  async function fetchAnswers() {
    if (!visible) {
      return false
    }

    const result = await SubmissionService.answers({
      formId,
      fieldId: response.id,
      page
    })
    const { total, answers } = result

    setAnswers(answers)
    setTotal(total)

    return answers.length > 0
  }

  return (
    <>
      {visible && (
        <ModalContainer close={true} onClose={handleClose}>
          <ModalContent>
            <Heading style={{ textAlign: 'center' }}>{t('report.Responses')}</Heading>
          </ModalContent>

          <Fetcher request={fetchAnswers} deps={[visible, page]} skeleton={<ModalListSkeleton/>}>
            <ModalList>
              {answers.map(row => (
                <Item key={row.submissionId} align="center">
                  <AnswerValue answer={row}/>
                  <ItemDate>{timeago.format(row.endAt! * 1_000)}</ItemDate>
                </Item>
              ))}
            </ModalList>

            <StyledPaginationBar
              total={total}
              page={page}
              pageSize={30}
              onChange={handlePageChange}
            />
          </Fetcher>
        </ModalContainer>
      )}
    </>
  )
}

const ModalContainer = styled(NavBarContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
  overflow-y: auto;
`

const ModalContent = styled.div``

const ModalList = styled.div``

const StyledPaginationBar = styled(PaginationBar)`
  justify-content: space-between;
  margin-top: 32px;

  .hey-pagination {
    ul {
      background: #fafbfc;
    }

    li {
      background: none;

      &.hey-pagination-active {
        background: none;

        a {
          color: #377dff;
        }
      }
    }
  }
`

export const AnswerList: FC<AnswerListProps> = ({ response }) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  if (!isValidArray(response.answers)) {
    return null
  }

  function handleClick() {
    setVisible(true)
  }

  return (
    <Container>
      {response.answers?.map(row => (
        <Item key={row.submissionId} align="center">
          <AnswerValue answer={row}/>
          <ItemDate>{timeago.format(row.endAt! * 1_000)}</ItemDate>
        </Item>
      ))}
      {response.count > 5 && (
        <MoreAnswer onClick={handleClick}>
          {t('report.seeAll', { count: response.count })}
        </MoreAnswer>
      )}
      <AnswerModal response={response} visible={visible} onVisibleChange={setVisible}/>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 20px;
  padding: 24px;
  background: #fafbfc;
  border-radius: 3px;
`

const Item = styled(Flex)`
  padding: 12px 0;
  border-bottom: 1px solid #f3f3f3;
`

const ItemValue = styled(Flex)`
  margin-right: 20px;
`

const ItemDate = styled.div`
  color: #8a94a6;
`

const MoreAnswer = styled.div`
  display: inline-flex;
  margin-top: 12px;
  cursor: pointer;

  &:hover {
    color: #377dff;
  }
`
