import { ComponentProps, Flex, Pagination } from '@heyui/component'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

interface PaginationBarProps extends ComponentProps {
  total: number
  page: number
  pageSize: number
  onChange?: (current: number) => void
}

export const PaginationBar: FC<PaginationBarProps> = ({
  total,
  page,
  pageSize = 30,
  onChange,
  ...restProps
}) => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  useEffect(() => {
    const start = (page - 1) * pageSize + 1
    const end = Math.min(total, page * pageSize)

    setStart(start)
    setEnd(end)
  }, [page, pageSize, total])

  return (
    <Container {...restProps}>
      <Current>
        {start}-{end} of {total} items
      </Current>
      <Pagination total={total} current={page} pageSize={pageSize} onChange={onChange} />
    </Container>
  )
}

const Container = styled(Flex)`
  align-items: center;

  .hey-pagination {
    ul {
      height: 40px;
      padding: 4px 12px;
      background: #f3f3f3;
    }

    li {
      border: none;
      background: none;

      a {
        width: 32px;
        min-width: 32px;
        height: 32px;
        font-weight: normal;
        border-radius: 8px;
        color: #8a94a6;
      }

      &[disabled] {
        a {
          color: #b0b7c3;
        }
      }

      &.hey-pagination-active {
        a {
          color: #0252d7;
        }
      }
    }
  }
`

const Current = styled.div`
  color: #b0b7c3;
`
