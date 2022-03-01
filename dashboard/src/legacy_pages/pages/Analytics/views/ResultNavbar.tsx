import { ComponentProps, Flex } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

export const ResultNavbar: FC<ComponentProps> = props => {
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()

  return (
    <Container>
      <Wrapper align="center" {...props}>
        <NavLink
          to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results`}
          exact={true}
        >
          {t('Analytics')}
        </NavLink>
        <NavLink
          to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results/report`}
        >
          {t('Report')}
        </NavLink>
        <NavLink
          to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results/submissions`}
        >
          {t('Submissions')}
        </NavLink>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  height: 48px;
  background: #fff;
  z-index: 9;

  @media print {
    display: none;
  }
`

const Wrapper = styled(Flex)`
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  a {
    margin-right: 16px;
    color: #4e5d78;

    &:hover,
    &.active {
      color: #377dff;
    }
  }
`
