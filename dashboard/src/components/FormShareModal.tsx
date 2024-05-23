import { Button, Modal, Tooltip } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import {
  IconArrowLeft,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconQrcode,
  IconX
} from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { QRCodeCanvas } from 'qrcode.react'
import { FC } from 'react'
import isFQDN from 'validator/lib/isFQDN'

import { WorkspaceModel } from '@/models'
import { useStore } from '@/store'
import { urlBuilder, useVisible } from '@/utils'

import { CopyButton } from './CopyButton'
import { FORM_EMBED_OPTIONS } from './formEmbedModal'

function getShareURL(workspace?: WorkspaceModel, formId?: string) {
  let urlPrefix = import.meta.env.VITE_PUBLIC_FORM_PREFIX

  if (
    workspace?.plan?.customDomain &&
    workspace?.enableCustomDomain &&
    isValid(workspace?.customDomain) &&
    isFQDN(workspace!.customDomain!)
  ) {
    urlPrefix = `https://${workspace!.customDomain}`
  }

  return urlPrefix + `/f/${formId}`
}

interface QRCodeProps {
  visible: boolean
  sharingLinkUrl: string
  onQrcodeClose: () => void
  onModelClose: () => void
}

const QRCode: FC<QRCodeProps> = ({ visible, sharingLinkUrl, onQrcodeClose, onModelClose }) => {
  if (!visible) {
    return null
  }

  return (
    <div className="absolute inset-0 bg-white">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1" type="button" onClick={onQrcodeClose}>
            <IconArrowLeft />
            <span className="text-lg font-bold leading-6 text-slate-900">Share via QR Code</span>
          </button>

          <button onClick={onModelClose}>
            <IconX className="text-slate-700 hover:text-slate-900" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <QRCodeCanvas value={sharingLinkUrl} size={160} />
        </div>
      </div>
    </div>
  )
}

export const FormShareModal = observer(() => {
  const workspaceStore = useStore('workspaceStore')
  const formStore = useStore('formStore')
  const appStore = useStore('appStore')

  const [qrcodeVisible, openQrcode, closeQrcode] = useVisible()
  const sharingLinkUrl = getShareURL(workspaceStore.workspace, formStore.current?.id)

  function handleClose() {
    appStore.isFormShareModalOpen = false
  }

  function handleEmail() {
    const url = urlBuilder('mailto:', {
      subject: 'Cold you take a moment to fill in this heyform?',
      body: `We would really appreciate it if you filled in this form: ${sharingLinkUrl}. Thank you.`
    })
    window.open(url)
  }

  function handleFacebook() {
    const url = urlBuilder('https://www.facebook.com/sharer/sharer.php', {
      u: sharingLinkUrl
    })
    window.open(url)
  }

  function handleLinkedin() {
    const url = urlBuilder('https://www.linkedin.com/sharing/share-offsite', {
      url: sharingLinkUrl
    })
    window.open(url)
  }

  function handleTwitter() {
    const url = urlBuilder('https://twitter.com/share', {
      url: sharingLinkUrl,
      title: formStore.current!.name
    })
    window.open(url)
  }

  function openEmbedModal(type: string) {
    appStore.isFormShareModalOpen = false
    formStore.embedType = type
  }

  return (
    <Modal
      className="share-modal"
      contentClassName="max-w-md md:max-w-lg overflow-hidden"
      visible={appStore.isFormShareModalOpen}
      onClose={handleClose}
    >
      <div className="relative text-sm text-slate-900">
        <div className="space-y-7">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold leading-6 text-slate-900">Share this form</h1>

            <button onClick={handleClose}>
              <IconX className="text-slate-700 hover:text-slate-900" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip ariaLabel="Share on X">
              <div>
                <Button.Link
                  leading={<IconBrandX className="text-slate-900" />}
                  onClick={handleTwitter}
                />
              </div>
            </Tooltip>

            <Tooltip ariaLabel="Share on Facebook">
              <div>
                <Button.Link
                  leading={<IconBrandFacebook className="text-slate-900" />}
                  onClick={handleFacebook}
                />
              </div>
            </Tooltip>

            <Tooltip ariaLabel="Share on LinkedIn">
              <div>
                <Button.Link
                  leading={<IconBrandLinkedin className="text-slate-900" />}
                  onClick={handleLinkedin}
                />
              </div>
            </Tooltip>

            <Tooltip ariaLabel="Share via Email">
              <div>
                <Button.Link
                  leading={<IconMail className="text-slate-900" />}
                  onClick={handleEmail}
                />
              </div>
            </Tooltip>

            <Tooltip ariaLabel="Share via QR Code">
              <div>
                <Button.Link
                  leading={<IconQrcode className="text-slate-900" />}
                  onClick={openQrcode}
                />
              </div>
            </Tooltip>
          </div>

          <div>
            <div className="mb-1 text-sm font-medium">Share link</div>
            <div className="relative">
              <div className="h-10 rounded-lg border border-slate-200 px-3 leading-10">
                {sharingLinkUrl}
              </div>
              <CopyButton className="!absolute right-2 top-1.5 !p-1" text={sharingLinkUrl} />
            </div>
          </div>

          <div>
            <div className="mb-1 text-sm font-medium">Embed form</div>
            <div className="mb-4 text-sm text-slate-600">
              Use these options to embed your form into your own website.
            </div>

            <div className="grid grid-cols-4 gap-5">
              {FORM_EMBED_OPTIONS.map(row => (
                <div className="cursor-pointer" onClick={() => openEmbedModal(row.type)}>
                  <div className="rounded-md border border-black/10">
                    <row.icon className="w-full rounded-md" />
                  </div>
                  <div className="mt-1.5 text-center text-sm text-slate-600">{row.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <QRCode
          visible={qrcodeVisible}
          sharingLinkUrl={sharingLinkUrl}
          onQrcodeClose={closeQrcode}
          onModelClose={handleClose}
        />
      </div>
    </Modal>
  )
})
