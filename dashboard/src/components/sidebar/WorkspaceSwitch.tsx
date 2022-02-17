import type { WorkspaceModel } from '@/models'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { PlusIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, SelectorIcon } from '@heroicons/react/solid'
import { Avatar, Dropdown, Menus } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { WorkspaceIcon } from '../icons'

interface WorkspaceItemProps {
  workspace: WorkspaceModel
  onClick: (workspace: WorkspaceModel) => void
}

interface WorkspaceSwitchProps {
  onCreateWorkspace: () => void
}

const WorkspaceItem: FC<WorkspaceItemProps> = ({ workspace, onClick }) => {
  const { workspaceId } = useParam()

  function handleClick() {
    onClick(workspace)
  }

  return (
    <div
      className="group flex items-center px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <Avatar
        src={workspace.avatar}
        defaultIcon={<WorkspaceIcon />}
        size={40}
        retainLength={2}
        rounded
        circular
      />

      <div className="ml-4 flex-auto">
        <p className="text-sm font-medium text-gray-700 truncate">{workspace.name}</p>
        <p className="text-sm text-gray-500 truncate">{`${workspace.plan.name} plan | ${workspace.memberCount} members`}</p>
      </div>

      {workspaceId === workspace.id && <CheckCircleIcon className="w-5 h-5 text-blue-500" />}
    </div>
  )
}

export const WorkspaceSwitch: FC<WorkspaceSwitchProps> = observer(({ onCreateWorkspace }) => {
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const workspaceStore = useStore('workspaceStore')

  function handleClick(workspace: WorkspaceModel) {
    setVisible(false)
    history.push(`/workspace/${workspace.id}`)
  }

  const Overlay = (
    <div className="menus">
      {workspaceStore.list.map(workspace => (
        <WorkspaceItem key={workspace.id} workspace={workspace} onClick={handleClick} />
      ))}
      <Menus.Divider />
      <Menus.Item
        name="create"
        icon={<PlusIcon />}
        label="Create new workspace"
        onClick={onCreateWorkspace}
      />
    </div>
  )

  return (
    <div className="workspace-switch px-2">
      <Dropdown visible={visible} placement="left" overlay={Overlay}>
        <button className="group w-full rounded-md text-sm text-left text-gray-700">
          <span className="flex w-full justify-between items-center cursor-pointer">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              <Avatar
                className="w-10 h-10 rounded-full flex-shrink-0"
                src={workspaceStore.workspace?.avatar}
                defaultIcon={<WorkspaceIcon />}
                size={40}
                rounded
                circular
              />
              <span className="flex-1 flex flex-col min-w-0">
                <span className="text-gray-900 text-sm font-medium truncate">
                  {workspaceStore.workspace?.name}
                </span>
                <span className="text-gray-500 text-sm truncate">
                  {workspaceStore.workspace?.plan.name} plan
                </span>
              </span>
            </span>
            <SelectorIcon className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          </span>
        </button>
      </Dropdown>
    </div>
  )
})
