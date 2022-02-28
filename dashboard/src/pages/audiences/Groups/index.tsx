import { Async, Pagination } from '@/components'
import { AudienceService } from '@/service'
import { urlBuilder, useParam, useQuery, useVisible } from '@/utils'
import { DotsHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import type { GroupModel } from '@heyforms/shared-types-enums'
import { Button, Dropdown, Input, Menus, notification, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AudienceLayout } from '../views/AudienceLayout'
import AddGroup from './AddGroup'
import RenameGroup from './RenameGroup'
import { Skeleton } from './Skeleton'

const Groups = () => {
  const { workspaceId } = useParam()
  const history = useHistory()

  const [total, setTotal] = useState(0)
  const [groups, setGroups] = useState<GroupModel[]>([])
  const [group, setGroup] = useState<GroupModel | null>(null)
  const [addGroupVisible, openAddGroup, closeAddGroup] = useVisible(false)
  const [renameGroupVisible, openRenameGroup, closeRenameGroup] = useVisible(false)

  const { keyword, page } = useQuery({
    keyword: String,
    page: {
      type: Number,
      default: 1
    }
  })

  // Table columns
  const columns: TableColumn<GroupModel>[] = [
    {
      key: 'name',
      name: 'Group name'
    },
    {
      key: 'contactCount',
      name: 'Contact count',
      render(record) {
        return `${record.contactCount} contacts`
      }
    },
    {
      key: 'action',
      name: 'Action',
      align: 'right',
      render(record) {
        async function handleDeleteGroup() {
          const loading = notification.loading({
            title: 'Deleting group...',
            duration: 0
          })

          try {
            await AudienceService.deleteGroup({
              teamId: workspaceId,
              groupId: record.id
            })

            notification.success({
              title: 'Group has been deleted'
            })
          } catch (err: any) {
            notification.error({
              title: err.message
            })
          }

          loading.dismiss()
        }

        function handleMenuClick(name?: IKeyType) {
          switch (name) {
            case 'rename':
              setGroup(record)
              openRenameGroup()
              break

            case 'delete':
              handleDeleteGroup()
              break
          }
        }

        const Overlay = (
          <Menus onClick={handleMenuClick}>
            <Menus.Item name="rename" label="Rename" icon={<PencilIcon />} />
            <Menus.Item name="delete" label="Delete" icon={<TrashIcon />} />
          </Menus>
        )

        return (
          <Dropdown className="p-1 hover:bg-gray-100 rounded-md cursor-pointer" overlay={Overlay}>
            <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
          </Dropdown>
        )
      }
    }
  ]

  function handleChange(query: IMapType) {
    const url = urlBuilder(`/workspace/${workspaceId}/audience`, query)
    history.push(url)
  }

  function handleKeywordChange(value: string) {
    if (keyword !== value) {
      handleChange({
        keyword: value
      })
    }
  }

  function handlePageChange(currentPage: number) {
    handleChange({
      keyword,
      page: currentPage
    })
  }

  async function request() {
    const result = await AudienceService.groups({
      teamId: workspaceId,
      keyword,
      page,
      limit: 20
    })

    setTotal(result.total)
    setGroups(result.groups)

    return groups.length
  }

  return (
    <AudienceLayout>
      <div className="mt-8 lg:flex lg:items-center lg:justify-between">
        <Input.Search className="w-full md:w-96" />
        <Button className="mt-6 lg:mt-0 w-full md:w-auto" type="primary" onClick={openAddGroup}>
          Add group
        </Button>
      </div>

      <Async request={request} deps={[page, keyword]} skeleton={<Skeleton />}>
        <Table<GroupModel> className="mt-8" columns={columns} data={groups} />
      </Async>

      <Pagination total={total} page={page} pageSize={20} onChange={handlePageChange} />

      <AddGroup visible={addGroupVisible} onClose={closeAddGroup} />

      <RenameGroup visible={renameGroupVisible} group={group} onClose={closeRenameGroup} />
    </AudienceLayout>
  )
}

export default Groups
