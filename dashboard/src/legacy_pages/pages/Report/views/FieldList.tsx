import { flattenFields } from '@/legacy_pages/pages/Report'
import { useStore } from '@/legacy_pages/utils'
import { htmlUtils } from '@heyforms/answer-utils'
import { STATEMENT_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { isArray } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const FieldList: FC = observer(() => {
  const { t } = useTranslation()
  const formStore = useStore('formStore')
  const fields = flattenFields(formStore.current?.fields).filter(
    field => !STATEMENT_FIELD_KINDS.includes(field.kind)
  )

  function handleClick(id: string) {
    const elem = document.getElementById(`field-${id}`)
    elem!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })
  }

  return (
    <Container>
      <List>
        <Header>{t('report.Questions')}</Header>
        {fields?.map((row, index) => {
          const title = isArray(row.title)
            ? htmlUtils.plain(htmlUtils.serialize(row.title as any))
            : row.title

          return (
            <StyledLink key={row.id} onClick={() => handleClick(row.id)}>
              {index + 1}. {title}
            </StyledLink>
          )
        })}
      </List>
    </Container>
  )
})

const Container = styled.div`
  width: 280px;

  @media print {
    display: none;
  }
`

const List = styled.div`
  position: sticky;
  top: 92px;
  padding: 20px;
  margin-top: 44px;
  height: calc(100vh - 212px);
  background: #fff;
  border-radius: 3px;
  overflow-y: auto;
`

const Header = styled.div`
  padding: 8px 14px;
  color: #8a94a6;
`

const StyledLink = styled.div`
  display: block;
  padding: 8px 14px;
  color: #4e5d78;
  font-weight: 400;
  cursor: pointer;
`
