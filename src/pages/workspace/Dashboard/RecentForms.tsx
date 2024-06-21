import { helper } from '@heyform-inc/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Async, EmptyState, Repeat } from '@/components'
import FormItem from '@/pages/project/Forms/FormItem'
import { WorkspaceService } from '@/services'
import { FormType } from '@/types'
import { useParam } from '@/utils'

export default function RecentForms({ onClick }: ComponentProps) {
  const { t } = useTranslation()

  const { workspaceId } = useParam()
  const [data, setData] = useState<FormType[]>([])

  async function fetch() {
    const result = await WorkspaceService.recentForms(workspaceId)

    setData(result)
    return helper.isValid(result)
  }

  return (
    <Async
      fetch={fetch}
      refreshDeps={[workspaceId]}
      loader={
        <div className="mt-4 divide-y divide-accent-light">
          <Repeat count={3}>
            <FormItem.Skeleton />
          </Repeat>
        </div>
      }
      emptyRender={() => (
        <div className="mt-4 flex flex-1 items-center justify-center rounded-lg border border-dashed border-accent-light py-36 shadow-sm">
          <EmptyState
            headline={t('dashboard.noForms')}
            subHeadline={t('dashboard.pickTemplate')}
            buttonTitle={t('form.creation.title')}
            onClick={onClick}
          />
        </div>
      )}
    >
      <div className="mt-4 divide-y divide-accent-light">
        {data.map(f => (
          <FormItem key={f.id} form={f} />
        ))}
      </div>
    </Async>
  )
}
