import type { UserModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'
import {
  DotsHorizontalIcon,
  LogoutIcon,
  SwitchHorizontalIcon,
  TrashIcon
} from '@heroicons/react/outline'
import { Avatar, Badge, Button, Dropdown, Heading, Menus, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
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
  const [inviteMemberOpen, setInviteMemberOpen] = useState(false)
  const [transferWorkspaceOpen, setTransferWorkspaceOpen] = useState(false)
  const [deleteMemberOpen, setDeleteMemberOpen] = useState(false)
  const [leaveWorkspaceOpen, setLeaveWorkspaceOpen] = useState(false)

  function handleInviteMemberOpen() {
    setInviteMemberOpen(true)
  }

  function handleInviteMemberClose() {
    setInviteMemberOpen(false)
  }

  function handleTransferWorkspaceClose() {
    setTransferWorkspaceOpen(false)
    setMember(null)
  }

  function handleDeleteMemberClose() {
    setDeleteMemberOpen(false)
    setMember(null)
  }

  function handleLeaveWorkspaceClose() {
    setLeaveWorkspaceOpen(false)
    setMember(null)
  }

  // Table columns
  const columns: TableColumn<UserModel>[] = [
    {
      key: 'id',
      name: 'Member',
      width: '40%',
      render(record) {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Avatar
                src={record.avatar}
                text={record.name}
                retainLength={2}
                size={36}
                rounded
                circular
              />
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
      name: 'Role',
      width: '30%',
      render(record) {
        if (record.id === workspaceStore.workspace.ownerId) {
          return <Badge type="green" text="Owner" />
        }
        return <Badge text="Member" />
      }
    },
    {
      key: 'last_seen',
      name: 'Last seen',
      width: '20%',
      render(record) {
        if (record.lastSeenAt) {
          return timeago.format(record.lastSeenAt * 1_000)
        }
      }
    },
    {
      key: 'action',
      name: 'Action',
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
              setDeleteMemberOpen(true)
              break

            case 'transfer':
              setTransferWorkspaceOpen(true)
              break

            case 'leave':
              setLeaveWorkspaceOpen(true)
              break
          }
        }

        const OwnerOverlay = (
          <Menus onClick={handleMenuClick}>
            <Menus.Item
              name="transfer"
              icon={<SwitchHorizontalIcon />}
              label="Transfer ownership"
            />
            <Menus.Item name="remove" icon={<TrashIcon />} label="Remove" />
          </Menus>
        )

        const MemberOverlay = (
          <Menus onClick={handleMenuClick}>
            <Menus.Item name="leave" icon={<LogoutIcon />} label="Leave workspace" />
          </Menus>
        )

        return (
          <Dropdown overlay={workspaceStore.workspace.isOwner ? OwnerOverlay : MemberOverlay}>
            <Button.Link className="-m-3" leading={<DotsHorizontalIcon />} />
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
        title="Members"
        description="Manage who has access to the workspace."
        actions={
          <Button type="primary" onClick={handleInviteMemberOpen}>
            Invite member
          </Button>
        }
      />
      <div className="py-4">
        <Table<UserModel> className="mt-8" columns={columns} data={workspaceStore.members} />
      </div>

      {/* Invite member */}
      <InviteMember visible={inviteMemberOpen} onClose={handleInviteMemberClose} />

      {/* Transfer workspace */}
      <TransferWorkspace
        visible={transferWorkspaceOpen}
        member={member}
        onClose={handleTransferWorkspaceClose}
      />

      {/* Delete member */}
      <DeleteMember visible={deleteMemberOpen} member={member} onClose={handleDeleteMemberClose} />

      {/* Leave workspace */}
      <LeaveWorkspace visible={leaveWorkspaceOpen} onClose={handleLeaveWorkspaceClose} />
    </div>
  )
})

export default Members
