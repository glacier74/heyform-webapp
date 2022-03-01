import { Async } from '@/components'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import {
  ClipboardCheckIcon,
  DotsHorizontalIcon,
  DuplicateIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/outline'
import type { FormModel } from '@heyforms/shared-types-enums'
import { FormStatusEnum } from '@heyforms/shared-types-enums'
import { Badge, Button, Dropdown, EmptyStates, Menus, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import * as timeago from 'timeago.js'
import { ProjectLayout } from '../views/ProjectLayout'
import { Skeleton } from '../views/Skeleton'
import './index.scss'

const Project = observer(() => {
  const history = useHistory()
  const { projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  async function request() {
    const result = await FormService.forms(projectId, FormStatusEnum.NORMAL)
    workspaceStore.setForms(projectId, result)

    return isValid(result)
  }

  function handleRowClick(record: FormModel) {
    history.push(`/workspace/${record.teamId}/project/${record.projectId}/form/${record.id}/create`)
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
      render(record) {
        if (record.draft) {
          return <Badge className="form-status" text="Draft" dot />
        } else if (record.suspended) {
          return <Badge className="form-status" type="red" text="Suspended" dot />
        } else if (record.settings?.active) {
          return <Badge className="form-status" type="blue" text="Active" dot />
        } else {
          return <Badge className="form-status" text="Closed" dot />
        }
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
      render(record) {
        function handleClick(name?: IKeyType) {
          switch (name) {
            case 'edit':
              handleRowClick(record)
              break

            case 'duplicate':
              break

            case 'delete':
              workspaceStore.deleteForm(projectId, record.id)
              break
          }
        }

        return (
          <Dropdown
            className="ml-1 p-1 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
            placement="bottom-start"
            overlay={
              <Menus onClick={handleClick}>
                <Menus.Item name="edit" icon={<PencilIcon />} label="Edit" />
                <Menus.Item name="duplicate" icon={<DuplicateIcon />} label="Duplicate" />
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
          <EmptyStates
            className="empty-states-fit"
            icon={<ClipboardCheckIcon className="non-scaling-stroke" />}
            title="Don't have any forms in this project yet"
            description="It's your one-stop solution for all form needs. Quickly build online forms without any coding or design experience."
            action={<Button onClick={alert}>Create form</Button>}
          />
        }
      >
        <Table<FormModel>
          className="forms mt-8"
          columns={columns}
          data={workspaceStore.forms}
          onRowClick={handleRowClick}
        />
      </Async>
    </ProjectLayout>
  )
})

export default Project
