import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'

interface PaginationProps {
  total: number
  page: number
  pageSize: number
  onChange?: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({ total, page = 1, pageSize = 20, onChange }) => {
  const maxPage = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  function handlePrevious() {
    onChange?.(page - 1)
  }

  function handleNext() {
    onChange?.(page + 1)
  }

  useEffect(() => {
    setStart((page - 1) * pageSize + 1)
    setEnd(Math.min(total, page * pageSize))
  }, [page, pageSize, total])

  if (maxPage <= 1) {
    return null
  }

  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-100 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{start}</span> to{' '}
          <span className="font-medium">{end}</span> of <span className="font-medium">{total}</span>{' '}
          results
        </p>
      </div>

      <div className="flex-1 flex justify-between sm:justify-end">
        <Button disabled={page <= 1} onClick={handlePrevious}>
          Previous
        </Button>
        <Button className="ml-3" disabled={page >= maxPage} onClick={handleNext}>
          Next
        </Button>
      </div>
    </nav>
  )
}
