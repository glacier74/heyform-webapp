import { Async, Pagination } from '@/components'
import type { ContactModel } from '@/models'
import { AudienceService } from '@/service'
import { urlBuilder, useParam, useQuery } from '@/utils'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { Avatar, Button, Input, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AudienceLayout from '../layout'
import { ContactFilter } from './ContactFilter'
import { Skeleton } from './Skeleton'

const Contacts = () => {
  const { workspaceId } = useParam()
  const history = useHistory()

  const { keyword, groups, page } = useQuery({
    keyword: String,
    groups: Array,
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
      render() {
        return <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
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
      groups,
      keyword,
      page: currentPage
    })
  }

  function handleGroupChange(newGroups: string[]) {
    handleChange({
      keyword,
      groups: newGroups
    })
  }

  async function request() {
    const result = await AudienceService.contacts({
      teamId: workspaceId,
      groupIds: groups,
      keyword,
      page,
      limit: 20
    })

    setTotal(result.total)
    setContacts(result.contacts)
  }

  return (
    <AudienceLayout>
      <div className="mt-8 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center space-x-2">
          <Input.Search className="w-full md:w-96" onSearch={handleKeywordChange} />
          <ContactFilter value={groups} onChange={handleGroupChange} />
        </div>

        <div className="mt-6 flex flex-col justify-items-stretch space-x-0 space-y-4 md:space-y-0 md:space-x-3 lg:mt-0 md:flex-row">
          <Button type="primary">Add contact</Button>
          <Button>Import</Button>
        </div>
      </div>

      <Async request={request} deps={[page, keyword, groups]} skeleton={<Skeleton />}>
        <Table<ContactModel> className="mt-8" columns={columns} data={contacts} />
      </Async>

      <Pagination total={total} page={page} pageSize={20} onChange={handlePageChange} />
    </AudienceLayout>
  )
}

export default Contacts
