import type { UserModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { cropImage, useAsyncEffect, useParam, useVisible } from '@/utils'
import {
  DotsHorizontalIcon,
  LogoutIcon,
  SwitchHorizontalIcon,
  TrashIcon
} from '@heroicons/react/outline'
import { Avatar, Badge, Button, Dropdown, Heading, Menus, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/types/table'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as timeago from 'timeago.js'
import { DeleteMember } from './DeleteMember'
import { InviteMember } from './InviteMember'
import { LeaveWorkspace } from './LeaveWorkspace'
import { TransferWorkspace } from './TransferWorkspace'

const Members = observer(() => {
  const { workspaceId } = useParam()
  const userStore = useStore('userStore')
  const workspaceStore = useStore('workspaceStore')

  const [member, setMember] = useState<UserModel | null>(null)
  const [inviteMemberVisible, openInviteMember, closeInviteMember] = useVisible()
  const [transferWorkspaceVisible, openTransferWorkspace, closeTransferWorkspace] = useVisible()
  const [deleteMemberVisible, openDeleteMember, closeDeleteMember] = useVisible()
  const [leaveWorkspaceVisible, openLeaveWorkspace, closeLeaveWorkspace] = useVisible()
  const { t } = useTranslation()

  // Table columns
  const columns: TableColumn<UserModel>[] = [
    {
      key: 'id',
      name: t('workspace.members.index.member'),
      width: '40%',
      render(record) {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Avatar src={cropImage(record.avatar, 60, 60)} size={36} rounded circular />
            </div>
            <div className="flex-1 px-4">
              <p className="text-sm font-medium text-gray-800 truncate">
                {record.name} {userStore.user.id === record.id && <span>(You)</span>}
              </p>
              <p className="mt-0.5 flex items-center font-normal text-sm text-gray-500">
                <span className="truncate">{record.email}</span>
              </p>
            </div>
          </div>
        )
      }
    },
    {
      key: 'role',
      name: t('workspace.members.Role'),
      width: '30%',
      render(record) {
        if (record.id === workspaceStore.workspace.ownerId) {
          return <Badge type="green" text={t('workspace.members.index.owner')} />
        }
        return <Badge text={t('workspace.members.index.member')} />
      }
    },
    {
      key: 'last_seen',
      name: t('workspace.members.LastSeen'),
      width: '20%',
      render(record) {
        if (record.lastSeenAt) {
          return timeago.format(record.lastSeenAt * 1_000)
        }
      }
    },
    {
      key: 'action',
      name: t('workspace.members.Action'),
      align: 'right',
      render(record) {
        if (workspaceStore.workspace.isOwner) {
          if (record.id === userStore.user.id) {
            return null
          }
        } else {
          if (record.id !== userStore.user.id) {
            return null
          }
        }

        function handleMenuClick(name?: IKeyType) {
          setMember(record)

          switch (name) {
            case 'remove':
              openDeleteMember()
              break

            case 'transfer':
              openTransferWorkspace()
              break

            case 'leave':
              openLeaveWorkspace()
              break
          }
        }

        const OwnerOverlay = (
          <Menus onClick={handleMenuClick}>
            <Menus.Item
              value="transfer"
              icon={<SwitchHorizontalIcon />}
              label={t('workspace.members.index.transfer')}
            />
            <Menus.Item value="remove" icon={<TrashIcon />} label={t('workspace.members.remove')} />
          </Menus>
        )

        const MemberOverlay = (
          <Menus onClick={handleMenuClick}>
            <Menus.Item
              value="leave"
              icon={<LogoutIcon />}
              label={t('workspace.members.index.leave')}
            />
          </Menus>
        )

        return (
          <Dropdown
            className="inline-flex p-1 hover:bg-gray-100 rounded-md cursor-pointer"
            overlay={workspaceStore.workspace.isOwner ? OwnerOverlay : MemberOverlay}
          >
            <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
          </Dropdown>
        )
      }
    }
  ]

  useAsyncEffect(async () => {
    const result = await WorkspaceService.members(workspaceId)
    workspaceStore.setMembers(workspaceId, result)
  }, [workspaceId])

  return (
    <div>
      <Heading
        title={t('workspace.members.member')}
        description={t('workspace.members.manage')}
        actions={
          <Button type="primary" onClick={openInviteMember}>
            {t('workspace.members.index.invite')}
          </Button>
        }
      />
      <div className="py-4">
        <Table<UserModel> className="mt-8" columns={columns} data={workspaceStore.members} />
      </div>

      {/* Invite member */}
      <InviteMember visible={inviteMemberVisible} onClose={closeInviteMember} />

      {/* Transfer workspace */}
      <TransferWorkspace
        visible={transferWorkspaceVisible}
        member={member}
        onClose={closeTransferWorkspace}
      />

      {/* Delete member */}
      <DeleteMember visible={deleteMemberVisible} member={member} onClose={closeDeleteMember} />

      {/* Leave workspace */}
      <LeaveWorkspace visible={leaveWorkspaceVisible} onClose={closeLeaveWorkspace} />
    </div>
  )
})

export default Members
