import { GOOGLE_FONTS, SYSTEM_FONTS, insertWebFont } from '@heyform-inc/form-renderer'
import { FormTheme } from '@heyform-inc/shared-types-enums'
import { helper } from '@heyform-inc/utils'
import { useRequest } from 'ahooks'
import { useForm as useRCForm } from 'rc-field-form'
import { FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ColorPicker,
  Form,
  ImagePicker,
  Input,
  PlanUpgrade,
  Select,
  useToast
} from '@/components'
import { PlanGradeEnum } from '@/consts'
import { FormService } from '@/services'
import { useFormStore } from '@/store'
import { nextTick, useParam } from '@/utils'

import ImageBrightness, { ImageBrightnessProps } from '../Question/ImageBrightness'

const BackgroundImage: FC<Pick<ImageBrightnessProps, 'value' | 'onChange'>> = ({
  value,
  onChange
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <ImagePicker tabs={['image', 'unsplash']} onChange={onChange}>
        <Button.Ghost size="sm">
          {t(helper.isURL(value) ? 'components.change' : 'components.add')}
        </Button.Ghost>
      </ImagePicker>

      {helper.isURL(value) && (
        <Button.Ghost size="sm" onClick={() => onChange?.(undefined)}>
          {t('components.remove')}
        </Button.Ghost>
      )}
    </div>
  )
}

export default function Customize() {
  const { t } = useTranslation()

  const { formId } = useParam()
  const toast = useToast()
  const [rcForm] = useRCForm()
  const { tempTheme, updateTempTheme, revertTempTheme } = useFormStore()

  const { loading, run } = useRequest(
    async (theme: Any) => {
      await FormService.updateTheme(formId, { ...theme })
    },
    {
      refreshDeps: [formId],
      manual: true,
      onSuccess: () => {
        toast({
          title: t('form.builder.design.theme.success')
        })
      },
      onError: (err: Any) => {
        console.error(err)

        toast({
          title: t('form.builder.design.theme.failed'),
          message: err.message
        })
      }
    }
  )

  const options = useMemo(
    () => [
      {
        value: SYSTEM_FONTS,
        label: (
          <span
            style={{
              fontFamily: SYSTEM_FONTS
            }}
          >
            {t('form.builder.design.customize.systemFonts')}
          </span>
        )
      },
      ...GOOGLE_FONTS.map(value => ({
        value,
        label: (
          <span
            style={{
              fontFamily: value
            }}
          >
            {value}
          </span>
        )
      }))
    ],
    [t]
  )

  function handleRevert() {
    revertTempTheme()

    nextTick(() => {
      rcForm.setFieldsValue(tempTheme)
      rcForm.resetFields()
    })
  }

  function handleValuesChange(changes: FormTheme) {
    updateTempTheme(changes)
  }

  useEffect(() => {
    insertWebFont(GOOGLE_FONTS)
  }, [])

  return (
    <>
      <Form
        form={rcForm}
        initialValues={tempTheme}
        className="space-y-4 p-4"
        onValuesChange={handleValuesChange}
        onFinish={run}
      >
        <Form.Item name="fontFamily">
          <Select
            className="w-full"
            options={options}
            contentProps={{
              className: 'w-[17.25rem]',
              position: 'popper'
            }}
          />
        </Form.Item>

        <div className="space-y-4">
          <Form.Item
            name="questionTextColor"
            className="[&_[data-slot=content]]:flex-none [&_[data-slot=control]]:flex [&_[data-slot=control]]:items-center [&_[data-slot=control]]:justify-between"
            label={t('form.builder.design.customize.question')}
          >
            <ColorPicker
              contentProps={{
                side: 'bottom',
                align: 'end'
              }}
            />
          </Form.Item>

          <Form.Item
            name="answerTextColor"
            className="[&_[data-slot=content]]:flex-none [&_[data-slot=control]]:flex [&_[data-slot=control]]:items-center [&_[data-slot=control]]:justify-between"
            label={t('form.builder.design.customize.answer')}
          >
            <ColorPicker
              contentProps={{
                side: 'bottom',
                align: 'end'
              }}
            />
          </Form.Item>

          <Form.Item
            name="buttonBackground"
            className="[&_[data-slot=content]]:flex-none [&_[data-slot=control]]:flex [&_[data-slot=control]]:items-center [&_[data-slot=control]]:justify-between"
            label={t('form.builder.design.customize.buttons')}
          >
            <ColorPicker
              contentProps={{
                side: 'bottom',
                align: 'end'
              }}
            />
          </Form.Item>

          <Form.Item
            name="buttonTextColor"
            className="[&_[data-slot=content]]:flex-none [&_[data-slot=control]]:flex [&_[data-slot=control]]:items-center [&_[data-slot=control]]:justify-between"
            label={t('form.builder.design.customize.buttonText')}
          >
            <ColorPicker
              contentProps={{
                side: 'bottom',
                align: 'end'
              }}
            />
          </Form.Item>

          <Form.Item
            name="backgroundColor"
            className="[&_[data-slot=content]]:flex-none [&_[data-slot=control]]:flex [&_[data-slot=control]]:items-center [&_[data-slot=control]]:justify-between"
            label={t('form.builder.design.customize.background')}
          >
            <ColorPicker
              contentProps={{
                side: 'bottom',
                align: 'end'
              }}
            />
          </Form.Item>
        </div>

        <div className="border-t border-accent-light pt-4">
          <Form.Item
            name="backgroundImage"
            className="[&_[data-slot=content]]:flex-none [&_[data-slot=control]]:flex [&_[data-slot=control]]:items-center [&_[data-slot=control]]:justify-between"
            label={t('form.builder.design.customize.backgroundImage')}
          >
            <BackgroundImage />
          </Form.Item>
        </div>

        {helper.isURL(tempTheme?.backgroundImage) && (
          <div className="border-t border-accent-light pt-4">
            <Form.Item name="backgroundBrightness">
              <ImageBrightness imageURL={tempTheme?.backgroundImage} />
            </Form.Item>
          </div>
        )}

        <div className="border-t border-accent-light pt-4">
          <Form.Item
            name="customCSS"
            label={
              <div className="flex items-center justify-between">
                <span>{t('form.builder.design.customize.customCSS')}</span>
                <PlanUpgrade
                  minimalGrade={PlanGradeEnum.PREMIUM}
                  tooltipLabel={t('billing.upgrade.customCSS')}
                />
              </div>
            }
          >
            <PlanUpgrade
              minimalGrade={PlanGradeEnum.PREMIUM}
              isUpgradeShow={false}
              fallback={() => <Input.TextArea className="mt-2" rows={4} disabled />}
            >
              <Input.TextArea className="mt-2" rows={4} />
            </PlanUpgrade>
          </Form.Item>
        </div>

        <div className="sticky bottom-4 flex items-center gap-x-4 border-t border-accent-light bg-foreground pt-4">
          <Button.Ghost size="md" onClick={handleRevert}>
            {t('components.revert')}
          </Button.Ghost>
          <Button type="submit" size="md" className="flex-1" loading={loading}>
            {t('components.saveChanges')}
          </Button>
        </div>
      </Form>
    </>
  )
}
