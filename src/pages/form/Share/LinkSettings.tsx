import { flattenFields } from '@heyform-inc/answer-utils'
import { UNSELECTABLE_FIELD_KINDS } from '@heyform-inc/shared-types-enums'
import { helper } from '@heyform-inc/utils'
import { IconTrash, IconUpload } from '@tabler/icons-react'
import { useRequest } from 'ahooks'
import { useMemo, useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import LogoIcon from '@/assets/logo.svg?react'
import {
  Button,
  Image,
  ImagePicker,
  ImagePickerRef,
  Input,
  PlanUpgrade,
  Tooltip,
  usePlanGrade
} from '@/components'
import { PlanGradeEnum } from '@/consts'
import { FormService } from '@/services'
import { useFormStore, useWorkspaceStore } from '@/store'
import { useParam } from '@/utils'

export default function LinkSettings() {
  const { t } = useTranslation()

  const { formId } = useParam()
  const { workspace } = useWorkspaceStore()
  const { form, updateSettings } = useFormStore()

  const { isAllowed, openUpgrade } = usePlanGrade(PlanGradeEnum.BASIC)
  const imagePickerRef = useRef<ImagePickerRef | null>(null)

  const { title, description, isBrandingShow } = useMemo(() => {
    if (form) {
      const fieldsCount = flattenFields(form.drafts).filter(
        f => !UNSELECTABLE_FIELD_KINDS.includes(f.kind)
      ).length
      const description = fieldsCount <= 1 ? `1 question` : `${fieldsCount} questions`

      return {
        title: form.settings?.metaTitle || form.name,
        description: form.settings?.metaDescription || description,
        isBrandingShow: !workspace.removeBranding
      }
    }

    return {}
  }, [form, workspace.removeBranding])

  const { run } = useRequest(
    async (name: string, value?: string | null) => {
      if (!isAllowed) {
        return openUpgrade()
      }

      const updates = {
        [name]: value
      }

      updateSettings(updates)
      await FormService.update(formId, updates)
    },
    {
      debounceWait: 300,
      manual: true,
      refreshDeps: [formId, isAllowed]
    }
  )

  function handleUpload() {
    if (!isAllowed) {
      return openUpgrade()
    }

    imagePickerRef.current?.open()
  }

  return (
    <section id="settings">
      <div className="flex items-center gap-4">
        <h2 className="text-base/6 font-semibold">{t('form.share.settings.headline')}</h2>
        <PlanUpgrade
          minimalGrade={PlanGradeEnum.BASIC}
          tooltipLabel={t('billing.upgrade.metadata')}
          isUpgradeShow
        />
      </div>
      <p className="text-sm/6 text-secondary">{t('form.share.settings.subHeadline')}</p>

      <div className="mt-4 flex flex-col gap-4 sm:w-4/5 sm:flex-row sm:gap-10">
        <div className="w-full space-y-4 sm:w-96">
          <div className="space-y-1">
            <div>
              <label
                htmlFor="meta-title"
                className="select-none text-base/6 font-medium sm:text-sm/6"
              >
                {t('form.share.settings.title')}
              </label>
            </div>
            <Input
              id="meta-title"
              maxLength={70}
              value={title}
              onFocus={openUpgrade}
              onChange={value => run('metaTitle', value)}
            />
          </div>

          <div className="space-y-1">
            <div>
              <label
                htmlFor="meta-description"
                className="select-none text-base/6 font-medium sm:text-sm/6"
              >
                {t('form.share.settings.description')}
              </label>
            </div>
            <Input.TextArea
              id="meta-description"
              rows={6}
              maxLength={156}
              value={form?.settings?.metaDescription}
              onFocus={openUpgrade}
              onChange={value => run('metaDescription', value)}
            />
          </div>
        </div>

        <div className="w-full sm:w-96">
          <div className="text-base/6 font-medium sm:text-sm/6">
            {t('form.share.settings.preview.headline')}
          </div>
          <div className="text-sm text-secondary">
            <Trans
              key="meta-preview"
              t={t}
              i18nKey="form.share.settings.preview.subHeadline"
              components={{
                a: (
                  <a
                    href="https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/"
                    target="_blank"
                    rel="noreferrer"
                  />
                ),
                button: (
                  <Button.Link
                    className="!h-auto !p-0 !text-sm text-primary underline"
                    onClick={handleUpload}
                  />
                )
              }}
            />

            <div className="mt-4 select-none rounded-lg border border-input">
              {helper.isValid(form?.settings?.metaOGImageUrl) ? (
                <div className="group relative h-full w-full">
                  <Image
                    src={form!.settings!.metaOGImageUrl}
                    className="aspect-[1200/630] w-full rounded-lg"
                  />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-100 group-hover:opacity-100">
                    <div className="flex items-center gap-1 rounded-lg bg-foreground px-1.5 py-1">
                      <Tooltip label={t('components.change')}>
                        <Button.Link size="sm" iconOnly onClick={handleUpload}>
                          <IconUpload className="h-5 w-5" />
                        </Button.Link>
                      </Tooltip>
                      <Tooltip label={t('components.delete')}>
                        <Button.Link size="sm" iconOnly onClick={() => run('metaOGImageUrl', null)}>
                          <IconTrash className="h-5 w-5" />
                        </Button.Link>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="aspect-[1200/630] rounded-lg px-4 py-2"
                  style={{
                    backgroundImage:
                      'radial-gradient(60% 100%,#fff,rgba(255,255,255,0.1)),radial-gradient(100% 30% at 50% 0px, #fff 60%, rgba(255,255,255,0.1)),linear-gradient(120.7deg,#fbddf0 10.68%,#c2f2ff 88.93%)'
                  }}
                >
                  <div className="flex h-full w-full flex-col justify-center">
                    {/* Workspace logo */}
                    <div className="flex w-full">
                      {workspace.avatar ? (
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={workspace.avatar}
                          resize={{
                            width: 100,
                            height: 100
                          }}
                        />
                      ) : (
                        <LogoIcon className="h-8 w-8" />
                      )}
                    </div>

                    {/* Meta title or form name */}
                    <div className="mt-3 line-clamp-2 text-sm/6 font-semibold leading-[1.25] text-[#09090b]">
                      {title}
                    </div>

                    {/* Meta description or question count */}
                    <div className="mt-1 line-clamp-2 text-sm leading-[1.25] text-[#71717a]">
                      {description}
                    </div>

                    {isBrandingShow && (
                      <div className="mt-4">
                        <div className="flex items-center text-xs leading-[1.25] text-[#09090b]">
                          <span className="flex">Made with</span>
                          <LogoIcon className="ml-1 mr-0.5 h-4 w-4" />
                          <span>HeyForm</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ImagePicker
        ref={imagePickerRef}
        tabs={['image']}
        tabConfigs={{
          image: {
            title: t('form.share.settings.preview.uploadTitle'),
            description: t('form.share.settings.preview.uploadDescription')
          }
        }}
        onChange={value => run('metaOGImageUrl', value)}
      />
    </section>
  )
}
