import { Async, RestoreIcon } from '@/components'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline'
import type { FormModel } from '@heyforms/shared-types-enums'
import { FormStatusEnum } from '@heyforms/shared-types-enums'
import { Badge, Dropdown, EmptyStates, Menus, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import * as timeago from 'timeago.js'
import { ProjectLayout } from './views/ProjectLayout'
import { Skeleton } from './views/Skeleton'

const Trash = observer(() => {
  const { projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  async function request() {
    const result = await FormService.forms(projectId, FormStatusEnum.TRASH)
    workspaceStore.setForms(projectId, result)

    return isValid(result)
  }

  // Table columns
  const columns: TableColumn<FormModel>[] = [
    {
      key: 'id',
      name: 'Form name',
      width: '40%',
      render(record) {
        return (
          <div>
            <p className="text-sm font-medium text-gray-800 truncate">{record.name}</p>
            <p className="mt-0.5 flex items-center font-normal text-sm text-gray-500">
              <span className="truncate">
                {record.submissionCount && record.submissionCount > 0
                  ? `${record.submissionCount} submissions`
                  : 'No submissions yet'}
              </span>
            </p>
          </div>
        )
      }
    },
    {
      key: 'status',
      name: 'Status',
      width: '30%',
      render() {
        return <Badge className="form-status" text="Closed" dot />
      }
    },
    {
      key: 'fieldUpdateAt',
      name: 'Last update',
      width: '20%',
      render(record) {
        if (record.fieldUpdateAt) {
          return timeago.format(record.fieldUpdateAt * 1_000)
        }
      }
    },
    {
      key: 'action',
      name: 'Action',
      align: 'right',
      render() {
        return (
          <Dropdown
            className="ml-1 p-1 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
            placement="bottom-start"
            overlay={
              <Menus>
                <Menus.Item name="restore" icon={<RestoreIcon />} label="Restore" />
                <Menus.Item name="delete" icon={<TrashIcon />} label="Delete" />
              </Menus>
            }
          >
            <DotsHorizontalIcon className="w-5 h-5" />
          </Dropdown>
        )
      }
    }
  ]

  return (
    <ProjectLayout>
      <Async
        request={request}
        deps={[projectId]}
        skeleton={<Skeleton />}
        emptyState={
          <div className="empty-states-container flex flex-col justify-center">
            <EmptyStates
              icon={<TrashIcon className="non-scaling-stroke" />}
              title="Don't have any forms in trash"
              description="Forms will be permanently deleted from the trash after 30 days."
            />
          </div>
        }
      >
        <Table<FormModel> className="mt-8" columns={columns} data={workspaceStore.forms} />
      </Async>
    </ProjectLayout>
  )
})

export default Trash
