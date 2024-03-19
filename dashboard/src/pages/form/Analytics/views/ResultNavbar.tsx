import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { useParam } from '@/utils'

export const ResultNavbar: FC<IComponentProps> = props => {
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()

  return (
    <div className="border-b border-slate-200 bg-white py-4">
      <div className="container mx-auto">
        <div className="mx-auto flex h-full items-center" {...props}>
          <NavLink
            className="mr-4 text-gray-700 hover:text-blue-500 active:text-blue-600"
            to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results`}
            end={true}
          >
            {t('analytics.Analytics')}
          </NavLink>
          <NavLink
            className="mr-4 text-gray-700 hover:text-blue-500 active:text-blue-600"
            to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results/report`}
          >
            {t('analytics.Report')}
          </NavLink>
          <NavLink
            className="mr-4 text-gray-700 hover:text-blue-500 active:text-blue-600"
            to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results/submissions`}
          >
            {t('analytics.Submissions')}
          </NavLink>
        </div>
      </div>
    </div>
  )
}
