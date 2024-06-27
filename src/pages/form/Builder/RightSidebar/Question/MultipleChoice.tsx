import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Switch } from '@/components'

import { useStoreContext } from '../../store'
import { RequiredSettingsProps } from './Required'

export default function MultipleChoiceSettings({ field }: RequiredSettingsProps) {
  const { t } = useTranslation()
  const { dispatch } = useStoreContext()

  const handleChange = useCallback(
    (key: string, value: Any) => {
      dispatch({
        type: 'updateField',
        payload: {
          id: field.id,
          updates: {
            properties: {
              ...field.properties,
              [key]: value
            }
          }
        }
      })
    },
    [dispatch, field.id, field.properties]
  )

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm/6" htmlFor="#">
            {t('form.builder.settings.multipleSelection')}
          </label>
          <Switch
            value={field.properties?.allowMultiple}
            onChange={value => handleChange('allowMultiple', value)}
          />
        </div>

        <select
          name="status"
          className="[&amp;_optgroup]:font-semibold relative block w-full appearance-none rounded-lg border border-accent-light bg-transparent py-[calc(theme(spacing[2.5])-1px)] pl-[calc(theme(spacing[3.5])-1px)] pr-[calc(theme(spacing.10)-1px)] text-base/6 text-primary placeholder:text-secondary focus:outline-none sm:py-[calc(theme(spacing[1.5])-1px)] sm:pl-[calc(theme(spacing.3)-1px)] sm:pr-[calc(theme(spacing.9)-1px)] sm:text-sm/6"
          id="headlessui-control-:ro:"
          data-headlessui-state=""
          aria-labelledby="headlessui-label-:rp:"
        >
          <option value="active">Unlimited</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm/6" htmlFor="#">
          {t('form.builder.settings.randomize')}
        </label>
        <Switch
          value={field.properties?.randomize}
          onChange={value => handleChange('randomize', value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm/6" htmlFor="#">
          {t('form.builder.settings.allowOther')}
        </label>
        <Switch
          value={field.properties?.allowOther}
          onChange={value => handleChange('allowOther', value)}
        />
      </div>
    </>
  )
}
