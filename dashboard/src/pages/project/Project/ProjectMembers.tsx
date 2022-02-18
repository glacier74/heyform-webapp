import type { UserModel } from '@/models'
import { useStore } from '@/store'
import { Avatar, Badge, Button, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import type { FC } from 'react'

interface MemberItemProps {
  member: UserModel
  onClick: (member: UserModel) => void
}

const MemberItem: FC<MemberItemProps> = ({ member, onClick }) => {
  function handleClick() {
    onClick(member)
  }

  return (
    <div className="group flex items-center py-2.5 text-sm text-gray-700" onClick={handleClick}>
      <Avatar src={member.avatar} size={40} retainLength={2} rounded circular />

      <div className="ml-4 flex-auto">
        <p className="text-sm font-medium text-gray-700 truncate">
          {member.name}
          {member.isSelf && ' (You)'}
          {member.isOwner && <Badge className="ml-1" type="blue" text="Owner" />}
        </p>
        <p className="text-sm text-gray-500 truncate">{member.email}</p>
      </div>

      {!(member.isSelf && member.isOwner) && (
        <Button className="px-2.5 py-0.5" rounded onClick={handleClick}>
          {member.isAssigned ? 'Remove' : 'Assign'}
        </Button>
      )}
    </div>
  )
}

export const ProjectMembers: FC<IModalProps> = observer(({ visible, onClose }) => {
  const workspaceStore = useStore('workspaceStore')
  const userStore = useStore('userStore')

  const assignedMembers = useMemo(() => {
    return workspaceStore.members
      .filter(m => workspaceStore.project?.members.includes(m.id))
      .map(m => ({
        ...m,
        isAssigned: true,
        isOwner: workspaceStore.workspace.ownerId === m.id,
        isSelf: userStore.user.id === m.id
      }))
  }, [workspaceStore.project, workspaceStore.members])

  const unassignedMembers = useMemo(() => {
    return workspaceStore.members.filter(m => !workspaceStore.project?.members.includes(m.id))
  }, [workspaceStore.project, workspaceStore.members])

  function handleClick(member: UserModel) {
    console.log(member)
  }

  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            Members in <span>{workspaceStore.project?.name}</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Assigned members can co-manage the activities here in this project.
          </p>
        </div>

        <div>
          <div className="block text-sm font-medium text-gray-700">Assigned</div>
          <div>
            {assignedMembers.map(row => (
              <MemberItem key={row.id} member={row} onClick={handleClick} />
            ))}
          </div>
        </div>

        {unassignedMembers.length > 0 && (
          <div className="opacity-70">
            <div className="block text-sm font-medium text-gray-700">Not assigned</div>
            <div>
              {unassignedMembers.map(row => (
                <MemberItem key={row.id} member={row} onClick={handleClick} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
})
