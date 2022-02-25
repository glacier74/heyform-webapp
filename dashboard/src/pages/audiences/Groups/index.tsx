import { Async, Pagination } from '@/components'
import { AudienceService } from '@/service'
import { urlBuilder, useParam, useQuery } from '@/utils'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import type { GroupModel } from '@heyforms/shared-types-enums'
import { Button, Input, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AudienceLayout from '../layout'
import { Skeleton } from './Skeleton'

const Groups = () => {
  const { workspaceId } = useParam()
  const history = useHistory()

  const [total, setTotal] = useState(0)
  const [groups, setGroups] = useState<GroupModel[]>([])

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
        <Button className="mt-6 lg:mt-0 w-full md:w-auto" type="primary">
          Add group
        </Button>
      </div>

      <Async request={request} deps={[page, keyword]} skeleton={<Skeleton />}>
        <Table<GroupModel> className="mt-8" columns={columns} data={groups} />
      </Async>

      <Pagination total={total} page={page} pageSize={20} onChange={handlePageChange} />
    </AudienceLayout>
  )
}

export default Groups
