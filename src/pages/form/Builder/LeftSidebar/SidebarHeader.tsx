import { IconPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { Button, Tooltip } from '@/components'
import { useAppStore } from '@/store'

export default function SidebarHeader() {
  const { t } = useTranslation()
  const { openModal } = useAppStore()

  return (
    <div className="flex h-12 items-center justify-between px-4 pb-2 pt-3">
      <div className="text-sm/6 font-medium text-primary">
        {t('form.builder.sidebar.questions')}
      </div>

      <div className="flex items-center">
        <Tooltip label={t('form.builder.sidebar.addQuestion')}>
          <Button.Link
            className="-mr-2"
            size="sm"
            iconOnly
            onClick={() => openModal('QuestionTypesModal')}
          >
            <IconPlus className="h-5 w-5" />
          </Button.Link>
        </Tooltip>
      </div>
    </div>
  )
}
