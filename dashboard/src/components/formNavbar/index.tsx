import { Button } from '@heyforms/ui'
import {
  IconArrowLeft,
  IconBolt,
  IconChartBar,
  IconDatabase,
  IconEdit,
  IconSettings
} from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'

import { useStore } from '@/store'
import { useParam } from '@/utils'

import { FormActions } from './FormActions'
import { UserAccount } from './UserAccount'

export const FormNavbar: FC<IComponentProps> = observer(() => {
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const navigate = useNavigate()

  const navLinks = [
    {
      to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/create`,
      label: t('form.create'),
      icon: IconEdit
    },
    {
      to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/connect`,
      label: t('form.connect'),
      icon: IconBolt
    },
    {
      to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/analytics`,
      label: t('form.analytics'),
      icon: IconChartBar
    },
    {
      to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/submissions`,
      label: t('form.submissions'),
      icon: IconDatabase
    },
    {
      to: `/workspace/${workspaceId}/project/${projectId}/form/${formId}/settings`,
      label: t('form.settings'),
      icon: IconSettings
    }
  ]

  function toProject() {
    navigate(`/workspace/${workspaceId}/project/${projectId}`)
  }

  return (
    <div className="space-between -mt-px grid grid-cols-3 gap-3 border-b border-slate-200 py-3 px-4">
      <div className="flex items-center">
        <Button
          className="group !border-none bg-none !p-0 text-[#4e5d78] !shadow-none hover:!bg-transparent hover:text-[#0252d7]"
          leading={<IconArrowLeft className="h-4 w-4 text-[#4e5d78] group-hover:text-[#0252d7]" />}
          onClick={toProject}
        >
          {workspaceStore.project?.name}
        </Button>
      </div>
      <div role="navigation" className="flex items-center gap-x-12 text-xs">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className="flex flex-col items-center text-slate-700 hover:text-[#0252d7]"
          >
            <link.icon className="mx-auto mb-1 h-5 w-5" />
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="flex justify-end">
        <FormActions />
        <UserAccount />
      </div>
    </div>
  )
})
