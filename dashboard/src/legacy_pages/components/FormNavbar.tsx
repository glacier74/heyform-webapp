import { FormNavbarSharing } from '@/legacy_pages/components/FormNavbarSharing'
import { UserAvatar } from '@/legacy_pages/components/UserAvatar'
import { useStore } from '@/legacy_pages/utils'
import { useParam } from '@/utils'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { Button, ComponentProps, Flex } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const FormNavbar: FC<ComponentProps> = observer(() => {
  const { t } = useTranslation()
  const { workspaceId, projectId, formId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const formStore = useStore('formStore')
  const navigate = useNavigate()

  function toProject() {
    navigate(`/workspace/${workspaceId}/project/${projectId}`)
  }

  return (
    <div className="flex grid grid-cols-3 gap-3 space-between py-4 px-4 -mt-px border-b border-slate-200">
      <Left align="center">
        <BackButton icon={<ArrowLeftIcon className="w-4 h-4" />} onClick={toProject}>
          {workspaceStore.project?.name}
        </BackButton>
      </Left>
      <Nav role="navigation" className="flex items-center text-xs gap-x-12">
        <NavLink
          className={'text-slate-700'}
          to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/create`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          {t('form.create')}
        </NavLink>
        <NavLink
          className={'text-slate-700'}
          to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/connect`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
          {t('form.connect')}
        </NavLink>
        <NavLink
          className={'text-slate-700'}
          to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/share`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          {t('form.share')}
        </NavLink>
        <NavLink
          className={'text-slate-700'}
          to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/results`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {t('form.results')}
        </NavLink>
        <NavLink
          className={'text-slate-700'}
          to={`/workspace/${workspaceId}/project/${projectId}/form/${formId}/settings`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {t('form.settings')}
        </NavLink>
      </Nav>
      <Right>
        <FormNavbarSharing form={formStore.current} />
        <UserAvatar />
      </Right>
    </div>
  )
})

const Left = styled(Flex)`
  .input {
    border-color: transparent;
    box-shadow: none;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;

    &.input-focused,
    &:hover {
      border-color: #d1d5db;
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
        var(--tw-shadow);
    }
  }
`

const Nav = styled(Flex)`
  a {
    &.active {
      color: ${props => props.theme.primary};
    }
  }
`

const Right = styled(Flex)`
  justify-content: flex-end;
`

const BackButton = styled(Button)`
  background: none;
  border: none;
  padding: 0;
  color: #4e5d78;

  &:hover {
    color: #0252d7;
  }
`
