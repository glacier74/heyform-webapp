import { useStoreContext } from '@/pages/form/Create/store'
import { FieldKindEnum, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Basic } from './Basic'
import { Date } from './Date'
import { MultipleChoice } from './MultipleChoice'
import { OpinionScale } from './OpinionScale'
import { PhoneNumber } from './PhoneNumber'
import { Rating } from './Rating'
import { Statement } from './Statement'

export const Settings: FC = () => {
  const { t } = useTranslation()
  const { state } = useStoreContext()
  const field = state.selectedField!

  return (
    <div className="right-sidebar-group right-sidebar-settings">
      <div className="right-sidebar-group-title">{t('formBuilder.settings')}</div>

      {QUESTION_FIELD_KINDS.includes(field.kind) && <Basic field={field} />}

      {(() => {
        switch (field.kind) {
          case FieldKindEnum.DATE:
            return <Date field={field} />

          case FieldKindEnum.MULTIPLE_CHOICE:
          case FieldKindEnum.PICTURE_CHOICE:
            return <MultipleChoice field={field} />

          case FieldKindEnum.OPINION_SCALE:
            return <OpinionScale field={field} />

          case FieldKindEnum.PHONE_NUMBER:
            return <PhoneNumber field={field} />

          case FieldKindEnum.RATING:
            return <Rating field={field} />

          case FieldKindEnum.STATEMENT:
          case FieldKindEnum.WELCOME:
          case FieldKindEnum.THANK_YOU:
            return <Statement field={field} />
        }
      })()}
    </div>
  )
}
