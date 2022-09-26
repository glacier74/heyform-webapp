import { FORM_THEMES } from '@/consts'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { cropImage, useParam } from '@/utils'
import { FormThemeV3 } from '@heyforms/shared-types-enums'
import { notification, Spin } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'

const ThemeItem: FC<{ theme: FormThemeV3 }> = ({ theme }) => {
  const { formId } = useParam()
  const [loading, setLoading] = useState(false)
  const formStore = useStore('formStore')

  async function handleClick() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await FormService.updateTheme(formId, {
        theme
      })

      formStore.updateCustomTheme(theme)

      notification.success({
        title: 'Theme settings updated'
      })
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  return (
    <div
      className="theme-item"
      style={{
        backgroundColor: theme.backgroundColor,
        backgroundImage: theme.backgroundImage
          ? `url(${cropImage(theme.backgroundImage, 480, 240)})`
          : undefined
      }}
      onClick={handleClick}
    >
      <div
        className="theme-item-question"
        style={{
          color: theme.questionTextColor
        }}
      >
        Question
      </div>
      <div
        className="theme-item-answer"
        style={{
          color: theme.answerTextColor
        }}
      >
        Answer
      </div>
      <div
        className="theme-item-button"
        style={{
          background: theme.buttonBackground
        }}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50 rounded-md">
          <Spin className="text-white" />
        </div>
      )}
    </div>
  )
}

export const Theme: FC = () => (
  <div className="theme-list p-4 space-y-6 scrollbar">
    {FORM_THEMES.map((theme, index) => (
      <ThemeItem key={index} theme={theme} />
    ))}
  </div>
)
