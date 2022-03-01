import { WorkspaceModel } from '@/legacy_pages/models'
import { Avatar, Flex, Menu } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface WorkspaceLinkProps {
  workspace: WorkspaceModel
  activeWorkspaceId?: string
}

export const WorkspaceLink: FC<WorkspaceLinkProps> = ({ workspace, activeWorkspaceId }) => {
  const { t } = useTranslation()

  return (
    <StyledMenuItem
      name={workspace.id}
      checkmark={true}
      markAlign="right"
      checked={workspace.id === activeWorkspaceId}
    >
      <Link to={`/workspace/${workspace.id}`}>
        <StyledFlex align="center">
          <StyledAvatar text={workspace.name} image={workspace.avatar} width={160} height={160} />
          <Right>
            <Name>{workspace.name}</Name>
            <Description>
              {workspace.plan.name} {t('Plan')} -{' '}
              {workspace.memberCount > 1
                ? t('{{count}} members', { count: workspace.memberCount })
                : t('1 member')}
            </Description>
          </Right>
        </StyledFlex>
      </Link>
    </StyledMenuItem>
  )
}

const StyledMenuItem = styled(Menu.Item)<{
  checked?: boolean
}>`
  height: auto !important;
  padding: 0 !important;

  &:hover {
    background: #fafbfc;
  }

  & > span {
    padding: 1px;
    border-radius: 50%;
    background: #377dff;

    svg {
      width: 16px;
      height: 16px;
      color: #fff !important;
    }
  }

  a {
    position: relative;
    flex: 1;
    z-index: 2;
  }

  .hey-image {
    width: 30px;
    height: 30px;
  }
`

const StyledFlex = styled(Flex)`
  padding: 10px 40px 10px 12px;
`

const StyledAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
  background: #fafbfc;
  font-weight: 500;
  color: #8a94a6;
  line-height: 30px;

  &,
  img {
    border-radius: 50%;
  }
`

const Right = styled.div`
  flex: 1;
  margin-left: 12px;
`

const Name = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  color: rgb(55, 53, 47);
  font-weight: 400;
  white-space: nowrap;
  line-height: 20px;
`

const Description = styled.div`
  font-size: 12px;
  color: rgba(55, 53, 47, 0.6);
  line-height: 1;
`
