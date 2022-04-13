import { useStoreContext } from '@/pages/form/Create/store'
import { isEmpty } from '@hpnp/utils/helper'
import type { FC } from 'react'
import { useMemo } from 'react'
import { CoverImage } from './CoverImage'
import { Layout } from './Layout'
import { Settings } from './Settings'
import { TypeSelect } from './TypeSelect'

export const Question: FC = () => {
  const { state } = useStoreContext()
  const field = state.selectedField

  const memoTypeSelect = useMemo(() => <TypeSelect />, [field?.id, field?.kind])
  const memoSettings = useMemo(
    () => <Settings />,
    [field?.id, field?.properties, field?.validations]
  )
  const memoCoverImage = useMemo(() => <CoverImage />, [field?.id, field?.layout?.mediaUrl])
  const memoLayout = useMemo(
    () => <Layout />,
    [field?.id, field?.layout?.align, field?.layout?.brightness]
  )

  if (isEmpty(field?.id)) {
    return null
  }

  return (
    <div>
      {memoTypeSelect}
      {memoSettings}
      {memoCoverImage}
      {memoLayout}
    </div>
  )
}
