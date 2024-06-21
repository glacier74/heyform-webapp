import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import { PaymentService } from '@/services'
import { useWorkspaceStore } from '@/store'
import { useParam, useRouter } from '@/utils'

export default function WorkspaceTrial() {
  const { t } = useTranslation()

  const router = useRouter()
  const { workspaceId } = useParam()
  const { workspace } = useWorkspaceStore()

  const { loading, run } = useRequest(
    async () => {
      window.location.href = await PaymentService.freeTrial(workspaceId)
    },
    {
      refreshDeps: [workspaceId],
      manual: true
    }
  )

  function handleSkip() {
    router.replace(`/workspace/${workspace?.id}/`)
  }

  useEffect(() => {
    if (workspace?.trialEndAt && workspace.trialEndAt > 0) {
      handleSkip()
    }
  }, [])

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-y-4 px-4 py-28">
        <img
          className="h-72 w-72 object-cover"
          src="https://forms.b-cdn.net/website/dashboard/free-trial2.png"
          alt="HeyForm"
        />
        <h1 className="text-center text-3xl/8 font-semibold sm:text-2xl/8">
          {t('workspace.trial.title')}
        </h1>
        <p className="text-center text-lg/6 text-secondary sm:text-base/6">
          {t('workspace.trial.subHeadline')}
        </p>
        <div className="flex flex-col gap-y-2 pt-8">
          <Button loading={loading} onClick={run}>
            {t('workspace.trial.startTrial')}
          </Button>
          <Button.Link
            className="text-sm/6 text-secondary hover:bg-transparent hover:text-primary sm:text-xs/6"
            size="sm"
            onClick={handleSkip}
          >
            {t('workspace.trial.continueWithFree')}
          </Button.Link>
        </div>
      </div>
    </div>
  )
}
