import { getTheme } from '@heyform-inc/form-renderer'
import { FormTheme } from '@heyform-inc/shared-types-enums'
import { useBoolean } from 'ahooks'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Image, Loader, useToast } from '@/components'
import { FORM_THEMES } from '@/consts'
import { FormService } from '@/services'
import { useFormStore } from '@/store'
import { useParam } from '@/utils'

const ThemeItem: FC<{ theme: FormTheme }> = ({ theme }) => {
  const { t } = useTranslation()

  const { formId } = useParam()
  const toast = useToast()
  const { updateTempTheme } = useFormStore()

  const [loading, { setTrue, setFalse }] = useBoolean(false)

  async function handleClick() {
    if (loading) {
      return
    }

    setTrue()

    try {
      const newTheme = getTheme(theme)

      await FormService.updateTheme(formId, newTheme)
      updateTempTheme(newTheme)

      toast({
        title: t('form.builder.design.theme.success')
      })
    } catch (err: Any) {
      toast({
        title: t('form.builder.design.theme.failed'),
        message: err.message
      })
    }

    setFalse()
  }

  return (
    <Image.Background
      as="li"
      className="relative cursor-pointer rounded-lg bg-cover p-4 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:border after:border-accent"
      src={theme.backgroundImage}
      style={{
        backgroundColor: theme.backgroundColor
      }}
      onClick={handleClick}
    >
      <div
        className="text-sm font-medium"
        style={{
          color: theme.questionTextColor
        }}
      >
        {t('form.builder.question.title')}
      </div>
      <div
        className="-mt-1 mb-2 text-xs/6 font-medium"
        style={{
          color: theme.answerTextColor
        }}
      >
        {t('form.builder.question.answer')}
      </div>
      <div
        className="h-5 w-14 rounded-xl"
        style={{
          background: theme.buttonBackground
        }}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-slate-900 bg-opacity-50">
          <Loader className="text-foreground" />
        </div>
      )}
    </Image.Background>
  )
}

export default function Theme() {
  return (
    <div className="p-4">
      <ul className="space-y-4">
        {FORM_THEMES.map((theme, index) => (
          <ThemeItem key={index} theme={theme} />
        ))}
      </ul>
    </div>
  )
}
