import { Async, RestoreIcon } from '@/components'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useParam, useVisible } from '@/utils'
import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline'
import type { FormModel } from '@heyforms/shared-types-enums'
import { FormStatusEnum } from '@heyforms/shared-types-enums'
import { Badge, Dropdown, EmptyStates, Menus, Modal, notification, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import * as timeago from 'timeago.js'
import { ProjectLayout } from './views/ProjectLayout'
import { Skeleton } from './views/Skeleton'

const Trash = observer(() => {
  const { projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [loading, setLoading] = useState(false)
  const [deleteFormVisible, openDeleteForm, closeDeleteForm] = useVisible()

  const [forms, setForms] = useState<FormModel[]>([])
  const [form, setForm] = useState<FormModel | null>(null)

  async function request() {
    const result = await FormService.forms(projectId, FormStatusEnum.TRASH)
    setForms(result)

    return isValid(result)
  }

  async function handleRestore(record: FormModel) {
    const l = notification.loading({
      title: 'Restoring form'
    })

    try {
      await FormService.restoreForm(record.id)
      setForms(forms.filter(f => f.id !== record.id))
      workspaceStore.addForm(projectId, record)
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    l.dismiss()
  }

  async function handleDelete() {
    setLoading(true)

    try {
      await FormService.delete(form!.id)
      setForms(forms.filter(f => f.id !== form!.id))

      closeDeleteForm()
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
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
      render(record) {
        function handleClick(name?: IKeyType) {
          switch (name) {
            case 'restore':
              handleRestore(record)
              break

            case 'delete':
              setForm(record)
              openDeleteForm()
              break
          }
        }

        return (
          <Dropdown
            className="ml-1 p-1 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
            placement="bottom-start"
            overlay={
              <Menus onClick={handleClick}>
                <Menus.Item name="restore" icon={<RestoreIcon />} label="Restore" />
                <Menus.Item name="delete" icon={<TrashIcon />} label="Delete forever" />
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
      <div className="mt-8 text-sm text-gray-700">
        You can restore any file deleted in the last 30 days.{' '}
        <a
          href="https://help.heyform.net"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          Learn more
        </a>
      </div>

      <Async
        request={request}
        deps={[projectId]}
        skeleton={<Skeleton />}
        emptyState={
          <EmptyStates
            className="empty-states-fit"
            icon={<TrashIcon className="non-scaling-stroke" />}
            title="Don't have any forms in trash"
            description="Forms will be permanently deleted from the trash after 30 days."
          />
        }
      >
        <Table<FormModel> className="mt-8" columns={columns} data={forms} />
      </Async>

      <Modal.Confirm
        type="danger"
        visible={deleteFormVisible}
        title="Delete forever?"
        description={`'${form?.name}' will be deleted forever and you won't be able to restore it.`}
        cancelLabel="cancel"
        confirmLabel="Delete"
        confirmLoading={loading}
        onCancel={closeDeleteForm}
        onClose={closeDeleteForm}
        onConfirm={handleDelete}
      />
    </ProjectLayout>
  )
})

export default Trash
