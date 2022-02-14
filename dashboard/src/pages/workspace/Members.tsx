import { UserModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsync, useParam } from '@/utils'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { Avatar, Badge, Button, Heading, Table } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/lib/types/table'
import { observer } from 'mobx-react-lite'
import * as timeago from 'timeago.js'

const Members = observer(() => {
  const { workspaceId } = useParam()
  const userStore = useStore('userStore')
  const workspaceStore = useStore('workspaceStore')

  // Table columns
  const columns: TableColumn<UserModel>[] = [
    {
      key: 'id',
      name: 'Member',
      width: '40%',
      render(record: UserModel) {
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
      render(record: UserModel) {
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
      render(record: UserModel) {
        if (record.lastSeenAt) {
          return timeago.format(record.lastSeenAt * 1_000)
        }
      }
    },
    {
      key: 'action',
      name: 'Action',
      align: 'right',
      render(record: UserModel) {
        return <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
      }
    }
  ]

  useAsync(async () => {
    const result = await WorkspaceService.members(workspaceId)
    workspaceStore.setMembers(workspaceId, result)
  }, [workspaceId])

  return (
    <div>
      <Heading
        title="Members"
        description="Manage who has access to the workspace."
        actions={<Button type="primary">Invite member</Button>}
      />
      <div className="py-4">
        <Table<UserModel> className="mt-8" columns={columns} data={workspaceStore.members} />
      </div>
    </div>
  )
})

export default Members
