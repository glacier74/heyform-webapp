import { Button, Switch } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { IconExternalLink } from '@tabler/icons-react'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LazyLoad from 'react-lazyload'

import { AppInternalTypeEnum, AppModel, AppStatusEnum, IntegrationStatusEnum } from '@/models'
import { IntegrationService } from '@/service'
import { useParam } from '@/utils'

interface AppItemProps extends Omit<IComponentProps, 'onClick'> {
  app: AppModel
  onClick: (app?: any) => void
  onDelete: () => void
}

const AppItemAction: FC<AppItemProps> = ({ app, onClick, onDelete }) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const isIntegrated = isValid(app.integration?.attributes)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [active, setActive] = useState(
    isIntegrated && app.integration?.status === IntegrationStatusEnum.ACTIVE
  )

  function handleOpenHomepage() {
    window.open(app.homepage)
  }

  async function handleUpdateStatus(active: boolean) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const status = active ? IntegrationStatusEnum.ACTIVE : IntegrationStatusEnum.DISABLED

      await IntegrationService.updateStatus(formId, app.id, status)
      setActive(active)
    } catch (err: any) {
      console.error(err)
    }

    setLoading(false)
  }

  async function handleDeleteSettings() {
    if (loading2) {
      return
    }

    setLoading2(true)

    try {
      await IntegrationService.deleteSettings(formId, app.id)
      onDelete()
    } catch (err: any) {
      console.error(err)
    }

    setLoading2(false)
  }

  if (app.internalType === AppInternalTypeEnum.OPEN_APP_OAUTH) {
    return (
      <Button
        className="h-8 px-5"
        type="primary"
        leading={<IconExternalLink />}
        onClick={handleOpenHomepage}
      >
        {t('integration.Connect')}
      </Button>
    )
  } else if (isIntegrated) {
    return (
      <div className="flex items-center">
        <Switch value={active} loading={loading} onChange={handleUpdateStatus} />
        <Button className="ml-3" loading={loading2} onClick={handleDeleteSettings}>
          {t('submissions.Delete')}
        </Button>
      </div>
    )
  } else {
    return (
      <Button className="h-8 px-5" type="primary" onClick={onClick}>
        {t('integration.Connect')}
      </Button>
    )
  }
}

export const AppItem: FC<AppItemProps> = ({ app, onClick, onDelete, ...restProps }) => {
  const { t } = useTranslation()

  function handleClick() {
    onClick(app)
  }

  return (
    <div className="mb-10" {...restProps}>
      <div className="mb-2.5 flex items-center">
        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white p-2">
          <img className="aspect-square h-8 w-8 rounded-xl object-cover" src={app.avatar!} />
          <div className="z-9 absolute bottom-0 left-0 right-0 top-0 rounded-xl border border-solid border-gray-200"></div>
        </div>
        <div className="ml-4 mr-8 flex-1">
          <div className="mb-1 text-base font-semibold text-slate-900">{t(app.name)}</div>
        </div>
        {app.status === AppStatusEnum.ACTIVE ? (
          <AppItemAction app={app} onClick={handleClick} onDelete={onDelete} />
        ) : (
          <span className={`bg-slate-100 px-3 py-2 text-xs uppercase text-slate-600`}>
            {t('integration.coming')}
          </span>
        )}
      </div>
      <div className="text-slate-600">{t(app.description as any)}</div>
    </div>
  )
}
