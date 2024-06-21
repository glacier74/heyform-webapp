import { helper } from '@heyform-inc/utils'
import { IconArrowsDiagonal } from '@tabler/icons-react'
import { useBoolean, usePagination } from 'ahooks'
import { PaginationResult } from 'ahooks/lib/usePagination/types'
import {
  ReactNode,
  Ref,
  TableHTMLAttributes,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/utils'

import { AsyncProps } from './Async'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { Pagination } from './Pagination'
import { Tooltip } from './Tooltip'

export interface TableColumn<T, K> {
  field: T
  headerRender: (field: T, index: number) => ReactNode
  cellRender: (field: T, record: K, index: number) => ReactNode
}

export interface TableFetchParams {
  current: number
  pageSize: number
}

export interface TableDetailRenderProps {
  isNextDisabled: boolean
  isPreviousDisabled: boolean
  loading: boolean
  toNext: () => void
  toPrevious: () => void
  closePanel: () => void
}

type TableDetailRender<K> = (record: K, props: TableDetailRenderProps) => ReactNode

export interface TableRef<K> {
  refresh: () => Promise<{ total: number; list: K[] }>
}

interface TableProps<T, K>
  extends Omit<AsyncProps, 'fetch' | 'children'>,
    TableHTMLAttributes<HTMLTableElement> {
  ref?: Ref<TableRef<K>>
  classNames?: {
    tablePanel?: string
    container?: string
    table?: string
    footer?: string
    pagination?: string
    detailPanel?: string
  }
  rowKey?: string
  isSelectable?: boolean
  isExpandable?: boolean
  selectedRowKeys?: string[]
  columns: TableColumn<T, K>[]
  defaultPage?: number
  defaultPageSize?: number
  fetch: (params: TableFetchParams) => Promise<{ total: number; list: Any[] }>
  detailRender?: TableDetailRender<K>
  onSelectionChange?: (selectedRowKeys: string[]) => void
}

interface DetailPanelProps<K> {
  className?: string
  row: K
  index?: number
  count: number
  loading: boolean
  pagination: PaginationResult<Any, Any>['pagination']
  detailRender: TableDetailRender<K>
  onChange: (index?: number) => void
}

function DetailPanel<T>({
  className,
  row,
  index = 0,
  count,
  loading,
  pagination,
  detailRender,
  onChange
}: DetailPanelProps<T>) {
  const isPreviousDisabled = useMemo(
    () => pagination.current <= 1 && index === 0,
    [index, pagination]
  )
  const isNextDisabled = useMemo(
    () => pagination.current >= pagination.total && index === count - 1,
    [count, index, pagination]
  )

  const toPrevious = useCallback(() => {
    if (index <= 0) {
      pagination.changeCurrent(pagination.current - 1)
      onChange(0)
    } else {
      onChange(index - 1)
    }
  }, [index, onChange, pagination])

  const toNext = useCallback(() => {
    if (index >= count - 1) {
      pagination.changeCurrent(pagination.current + 1)
      onChange(count - 1)
    } else {
      onChange(index + 1)
    }
  }, [index, count, pagination, onChange])

  function handleClose() {
    onChange(undefined)
  }

  return (
    <div className={cn('w-[31.25rem]', className)}>
      {detailRender(row, {
        loading,
        isPreviousDisabled,
        isNextDisabled,
        toNext,
        toPrevious,
        closePanel: handleClose
      })}
    </div>
  )
}

export function Table<T, K>({
  ref,
  className,
  classNames,
  rowKey = 'id',
  isSelectable = true,
  isExpandable = false,
  selectedRowKeys = [],
  columns,
  defaultPage: defaultCurrent = 1,
  defaultPageSize = 20,
  refreshDeps = [],
  fetch,
  loader,
  detailRender,
  emptyRender,
  errorRender,
  onSelectionChange
}: TableProps<T, K>) {
  const { t } = useTranslation()

  const [expandedIndex, setExpandedIndex] = useState<number>()
  const [isRefreshing, { setTrue, setFalse }] = useBoolean(false)

  const isExpanded = useMemo(
    () => isExpandable && detailRender && !helper.isNil(expandedIndex) && expandedIndex! > -1,
    [detailRender, expandedIndex, isExpandable]
  )

  const { data, loading, error, pagination, runAsync, params } = usePagination(fetch, {
    defaultCurrent,
    defaultPageSize,
    refreshDeps,
    staleTime: 0,
    cacheTime: 0,
    onSuccess: setFalse,
    onError: setFalse
  })

  const refresh = useCallback(async () => {
    setTrue()
    return runAsync(params as Any)
  }, [params, runAsync, setTrue])

  const colSpanLength = useMemo(
    () => columns.length + (isSelectable ? 1 : 0),
    [columns, isSelectable]
  )

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      onSelectionChange?.(selected ? (data?.list || []).map(row => (row as AnyMap)[rowKey]) : [])
    },
    [data?.list, onSelectionChange, rowKey]
  )

  const handleSelectRow = useCallback(
    (selected: boolean, key: string) => {
      onSelectionChange?.(
        selected ? [...selectedRowKeys, key] : selectedRowKeys.filter(v => v !== key)
      )
    },
    [onSelectionChange, selectedRowKeys]
  )

  const Thead = useMemo(() => {
    return (
      <tr>
        {isSelectable && (
          <th data-slot="select-all" style={{ width: 40 }}>
            <div className="flex items-center">
              <Checkbox
                value={selectedRowKeys?.length === data?.list.length && data?.list.length > 0}
                onChange={handleSelectAll}
              />
            </div>
          </th>
        )}

        {columns.map((col, index) => (
          <th key={(col.field as AnyMap)[rowKey]}>{col.headerRender(col.field, index)}</th>
        ))}
      </tr>
    )
  }, [columns, data?.list.length, handleSelectAll, isSelectable, rowKey, selectedRowKeys?.length])

  const TBody = useMemo(() => {
    if (!(isRefreshing && pagination.total > 0) && loading) {
      return (
        <tr>
          <td colSpan={colSpanLength}>{loader}</td>
        </tr>
      )
    } else if (error) {
      return (
        <tr>
          <td colSpan={colSpanLength}>{errorRender?.(error)}</td>
        </tr>
      )
    } else {
      if (pagination.total < 1) {
        return (
          <tr>
            <td colSpan={colSpanLength}>{emptyRender?.({ refresh })}</td>
          </tr>
        )
      } else {
        return data?.list.map((record, index) => {
          const key = (record as AnyMap)[rowKey]
          const isSelected = selectedRowKeys.includes(key)

          return (
            <tr
              key={key}
              className="border-b border-accent hover:bg-primary/[2.5%] data-[selected]:bg-primary/[2.5%] [&:hover_[data-slot=expand]]:opacity-100 [&:hover_[data-slot=expand]]:opacity-100"
              data-selected={isSelected ? '' : undefined}
            >
              <td data-slot="select-row">
                <div className="flex items-center gap-x-1">
                  <Checkbox
                    value={isSelected}
                    onChange={selected => handleSelectRow(selected, key)}
                  />

                  {isExpandable && (
                    <Tooltip label={t('components.expand')}>
                      <Button.Link
                        className="!h-6 !w-6 text-secondary opacity-0 hover:text-primary"
                        size="sm"
                        iconOnly
                        onClick={() => setExpandedIndex(index)}
                        data-slot="expand"
                      >
                        <IconArrowsDiagonal className="h-4 w-4" />
                      </Button.Link>
                    </Tooltip>
                  )}
                </div>
              </td>

              {columns.map((col, index) => (
                <td key={(col.field as AnyMap)[rowKey]}>
                  {col.cellRender(col.field, record, index)}
                </td>
              ))}
            </tr>
          )
        })
      }
    }
  }, [
    isRefreshing,
    loading,
    error,
    colSpanLength,
    loader,
    errorRender,
    pagination.total,
    emptyRender,
    refresh,
    data?.list,
    rowKey,
    selectedRowKeys,
    isExpandable,
    t,
    columns,
    handleSelectRow
  ])

  const Footer = useMemo(() => {
    if (pagination.total <= defaultPageSize) {
      return null
    }

    return (
      <div className={cn('mt-4 flex items-center', classNames?.footer)}>
        <Pagination
          className={cn('[&_[data-slot=info]]:text-secondary', classNames?.pagination)}
          total={pagination.total}
          page={pagination.current}
          pageSize={defaultPageSize}
          buttonProps={{
            size: 'sm'
          }}
          loading={loading}
          onChange={pagination.changeCurrent}
        />
      </div>
    )
  }, [classNames?.footer, classNames?.pagination, defaultPageSize, loading, pagination])

  useImperativeHandle<TableRef<K>, TableRef<K>>(
    ref,
    () => ({
      refresh
    }),
    [refresh]
  )

  return (
    <div className={cn({ 'flex gap-5': isExpanded }, className)}>
      <div className={cn({ 'w-[calc(100%-30rem)]': isExpanded }, classNames?.tablePanel)}>
        <div className={classNames?.container}>
          <table className={classNames?.table}>
            <thead className="border-b border-accent">{Thead}</thead>
            <tbody>{TBody}</tbody>
          </table>
        </div>
        {Footer}
      </div>

      {isExpanded && (
        <DetailPanel
          className={classNames?.detailPanel}
          row={data?.list[expandedIndex as number]}
          index={expandedIndex}
          count={data?.list.length as number}
          loading={!isRefreshing && loading}
          pagination={pagination}
          detailRender={detailRender!}
          onChange={setExpandedIndex}
        />
      )}
    </div>
  )
}
