/**
 * @program: dashboard-next
 * @description:
 * @author:
 * @date: 2021-06-16 10:53
 **/
import { IconDots } from '@tabler/icons-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Heading, RoundLogoIcon } from '@/components'
import { AppModel } from '@/models'

interface SummaryProps {
  app?: AppModel
}

export const Summary: FC<SummaryProps> = ({ app }) => {
  const { t } = useTranslation()

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center">
        <RoundLogoIcon className="summary-logo relative mx-5 h-[54px] w-[54px] overflow-hidden rounded-xl border border-[rgba(0,0,0,0.1)]" />
        <IconDots className="h-9 w-9 text-[#A1A1A1]" />
        {app?.avatar && (
          <img
            className="summary-image relative mx-5 h-[54px] w-[54px] overflow-hidden rounded-xl border border-[rgba(0,0,0,0.1)] p-[10px]"
            src={app.avatar}
          />
        )}
      </div>

      <Heading className="summary-heading mt-8 mb-8" description={app?.description}>
        {t('integration.ConnectWith')} {app?.name}
      </Heading>
    </div>
  )
}
