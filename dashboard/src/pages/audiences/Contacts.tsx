import type { ContactModel } from '@/models'
import { AudienceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam, useQuery } from '@/utils'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { Avatar, Heading, Navbar, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Contacts = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const { keyword, groupIds, page } = useQuery({
    keyword: String,
    groupIds: Array,
    page: {
      type: Number,
      default: 1
    }
  })
  const [total, setTotal] = useState(0)
  const [contacts, setContacts] = useState<ContactModel[]>([])

  // Table columns
  const columns: TableColumn<ContactModel>[] = [
    {
      key: 'id',
      name: 'Contact',
      width: '40%',
      render(record) {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Avatar
                src={record.avatar}
                text={record.fullName}
                retainLength={2}
                size={36}
                rounded
                circular
              />
            </div>
            <div className="flex-1 px-4">
              <p className="text-sm font-medium text-gray-800 truncate">{record.fullName}</p>
              <p className="mt-0.5 flex items-center font-normal text-sm text-gray-500">
                <span className="truncate">{record.email}</span>
              </p>
            </div>
          </div>
        )
      }
    },
    {
      key: 'phoneNumber',
      name: 'Phone number',
      width: '15%'
    },
    {
      key: 'jobTitle',
      name: 'Job Title',
      width: '15%'
    },
    {
      key: 'company',
      name: 'Company',
      width: '15%'
    },
    {
      key: 'action',
      name: 'Action',
      align: 'right',
      render(record) {
        return <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
      }
    }
  ]

  useAsyncEffect(async () => {
    const result = await AudienceService.contacts({
      teamId: workspaceId,
      groupIds,
      keyword,
      page,
      limit: 20
    })

    setTotal(result.total)
    setContacts(result.contacts)
  }, [page, keyword, groupIds])

  return (
    <div>
      <Heading title="Audience" description="Create the right audience for accurate results" />
      <div className="py-4">
        <Navbar className="mt-4">
          <NavLink to={`/workspace/${workspaceId}/audiences`} exact>
            Contacts
          </NavLink>
          <NavLink to={`/workspace/${workspaceId}/audiences/groups`}>Groups</NavLink>
        </Navbar>

        <Table<ContactModel> className="mt-8" columns={columns} data={contacts} />
      </div>
    </div>
  )
})

export default Contacts
