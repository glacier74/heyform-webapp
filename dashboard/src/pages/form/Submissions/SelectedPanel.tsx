import { Button } from '@heyforms/ui'
import { isSet } from '@hpnp/utils/helper'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface SelectedPanelProps extends IComponentProps {
  selected: any[] | Set<any>
  actions: ReactNode
  onDeselect: () => void
}

export const SelectedPanel: FC<SelectedPanelProps> = ({
  selected,
  actions,
  onDeselect,
  ...restProps
}) => {
  const { t } = useTranslation()
  const size = isSet(selected) ? (selected as Set<any>).size : (selected as any[]).length

  return (
    <>
      {size > 0 && (
        <div className="fixed left-0 bottom-10 z-[99] w-full">
          <div
            className="mx-auto flex w-[600px] items-center justify-between rounded-xl bg-white/90 px-4 py-2 shadow-2xl backdrop-blur-3xl"
            {...restProps}
          >
            <div className="flex items-center">
              <span>
                {size} {t('submissions.selected')}
              </span>
              <Button className="ml-3 !py-1" onClick={onDeselect}>
                {t('submissions.Deselect')}
              </Button>
            </div>

            <div className="flex items-center">{actions}</div>
          </div>
        </div>
      )}
    </>
  )
}
