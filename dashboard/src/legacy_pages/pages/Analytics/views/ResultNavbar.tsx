import { useParam } from '@/utils'
import { ComponentProps, Flex } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const ResultNavbar: FC<ComponentProps> = props => {
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()

  return (
    <div className="bg-white py-4 border-b border-slate-200">
      <div className="container mx-auto">
        <Wrapper align="center" {...props}>
          <NavLink
            to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results`}
            end={true}
          >
            {t('analytics.Analytics')}
          </NavLink>
          <NavLink
            to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results/report`}
          >
            {t('analytics.Report')}
          </NavLink>
          <NavLink
            to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results/submissions`}
          >
            {t('analytics.Submissions')}
          </NavLink>
        </Wrapper>
      </div>
    </div>
  )
}

const Wrapper = styled(Flex)`
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  a {
    margin-right: 16px;
    color: #4e5d78;

    &:hover,
    &.active {
      color: #0252d7;
    }
  }
`
