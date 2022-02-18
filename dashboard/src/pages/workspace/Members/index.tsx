import type { UserModel } from '@/models'
import { InviteMember } from '@/pages/workspace/Members/InviteMember'
import { WorkspaceService } from '@/service'
import { useState } from 'react'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'
import { DotsHorizontalIcon, SwitchHorizontalIcon, TrashIcon } from '@heroicons/react/outline'
import { Avatar, Badge, Button, Dropdown, Heading, Menus, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { observer } from 'mobx-react-lite'
import * as timeago from 'timeago.js'

const Members = observer(() => {
  const { workspaceId } = useParam()
  const userStore = useStore('userStore')
  const workspaceStore = useStore('workspaceStore')
  const [inviteMemberOpen, setInviteMemberOpen] = useState(false)

  function handleInviteMemberOpen() {
    setInviteMemberOpen(true)
  }

  function handleInviteMemberClose() {
    setInviteMemberOpen(false)
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
        return (
          <Dropdown
            overlay={
              <Menus>
                <Menus.Item
                  name="transfer"
                  icon={<SwitchHorizontalIcon />}
                  label="Transfer ownership"
                />
                <Menus.Item name="delete" icon={<TrashIcon />} label="Delete" />
              </Menus>
            }
          >
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

      <InviteMember visible={inviteMemberOpen} onClose={handleInviteMemberClose} />
    </div>
  )
})

export default Members
