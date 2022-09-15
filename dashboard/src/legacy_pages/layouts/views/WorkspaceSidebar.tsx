import { IconText } from '@/legacy_pages/components'
import {
  AudienceFillIcon,
  BillingFillIcon,
  ChatIcon,
  HelpIcon,
  MemberFillIcon
} from '@/legacy_pages/components/Icons'
import { PlanPermissionBadge, UpgradePlan } from '@/legacy_pages/components/UpgradePlan'
import { PlanGradeEnum } from '@/legacy_pages/models'
import { useStore } from '@/legacy_pages/utils'
import { useParam } from '@/utils'
import { Flex } from '@heyui/component'
import { AddIcon } from '@heyui/icon'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ProjectLink } from './ProjectLink'
import { SwitchWorkspace } from './SwitchWorkspace'

export const WorkspaceSidebar: FC = observer(() => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const params = useParam()
  const workspaceStore = useStore('workspaceStore')
  const workspaceId = isValid(workspaceStore.activeWorkspaceId)
    ? workspaceStore.activeWorkspaceId
    : params.workspaceId

  function handleCreateProject() {
    navigate(`/workspace/${workspaceId}/project/create`)
  }

  return (
    <SidebarContainer column={true}>
      <SwitchWorkspace />

      <Nav>
        {workspaceStore.workspace?.isOwner && (
          <NavLink to={`/workspace/${workspaceId}/billing`}>
            <IconText icon={<BillingFillIcon />} text={t('Billing')} />
          </NavLink>
        )}
        <UpgradePlan name="Basic" permission={PlanGradeEnum.PREMIUM}>
          <NavLink to={`/workspace/${workspaceId}/members`}>
            <IconText icon={<MemberFillIcon />} text={t('Members')} />
            <PlanPermissionBadge name="Basic" permission={PlanGradeEnum.PREMIUM} />
          </NavLink>
        </UpgradePlan>
        <UpgradePlan name="Basic" permission={PlanGradeEnum.PREMIUM}>
          <NavLink to={`/workspace/${workspaceId}/audience`}>
            <IconText icon={<AudienceFillIcon />} text={t('Audience')} />
            <PlanPermissionBadge name="Basic" permission={PlanGradeEnum.PREMIUM} />
          </NavLink>
        </UpgradePlan>
      </Nav>

      <Projects>
        <ProjectHeader align="center" justify="space-between">
          <span>{t('Projects')}</span>
          <AddIcon onClick={handleCreateProject} />
        </ProjectHeader>
        <ProjectList>
          {workspaceStore.projects.map((row, index) => (
            <ProjectLink
              key={index}
              isOwner={workspaceStore.workspace?.isOwner}
              workspaceId={workspaceId!}
              project={row}
            />
          ))}
        </ProjectList>
      </Projects>

      <BottomNav>
        <a href="https://help.heyform.net" target="_blank" rel="noreferrer">
          <IconText icon={<HelpIcon />} text={t('Help center')} />
        </a>
        <a href="https://heyform.net/f/E4MKK2hx" target="_blank" rel="noreferrer">
          <IconText icon={<ChatIcon />} text={t('Send us a message')} />
        </a>
      </BottomNav>
    </SidebarContainer>
  )
})

const SidebarContainer = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  height: 100vh;
  padding: 0 8px;
  background: ${props => props.theme.white};
  transition: width 0.3s;
  box-shadow: inset -7px 0 9px -7px rgb(0 0 0 / 8%);
  -webkit-box-shadow: inset -7px 0 9px -7px rgb(0 0 0 / 8%);
  -moz-box-shadow: inset -7px 0 9px -7px rgba(0, 0, 0, 0.075);
`

const Nav = styled.div`
  margin-bottom: 16px;

  .hey-button {
    margin-right: 12px;
  }

  .hey-button {
    white-space: pre;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    color: rgba(25, 23, 17, 0.6);
    font-weight: 500;
    transition: background-color, transform, color 0.3s;

    svg {
      color: #b0b7c3;
    }

    &:hover {
      color: #4e5d78;
      background: #fafbfc;
    }

    &:active {
      transform: scale(0.98);
    }

    &.active {
      background: #fafbfc;
    }
  }
`

const Projects = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const ProjectHeader = styled(Flex)`
  position: sticky;
  top: 0;
  width: 100%;
  height: 36px;
  padding-left: 12px;
  padding-right: 12px;
  color: #8a94a6;
  background: #fff;

  svg {
    width: 24px;
    height: 24px;
    background: #fafbfc;
    color: #8a94a6;
    border-radius: 50%;
    cursor: pointer;
    padding: 2px;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.72, 2.55, 0.2, 1);
    transition-delay: initial;
    transition-property: initial;

    &:hover {
      transform: scale(1.15);
      background-color: #0252d7;
      color: #fff;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`

const ProjectList = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px 8px 24px;
    color: rgb(55, 53, 47);
    font-weight: 400;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background: #fafbfc;

      .hey-dropdown-trigger {
        opacity: 1;
      }
    }

    &:active {
      transform: scale(0.98);
    }

    &.active {
      background: #fafbfc;
    }

    .hey-dropdown-trigger {
      opacity: 0;
    }
  }
`

const BottomNav = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;

  a {
    display: block;
    padding: 2px 12px;
    color: #8a94a6;
    border-radius: 3px;

    &:hover {
      color: #0252d7;
    }
  }
`
