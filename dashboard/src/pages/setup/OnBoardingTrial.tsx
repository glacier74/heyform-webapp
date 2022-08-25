import { useTranslation } from 'react-i18next'

const OnBoarding = () => {
    const { t } = useTranslation()

    return (
        <div className='bg-white grid place-items-center h-screen'>
            <div className='max-w-3xl mx-auto py-28'>
                <img className='w-72 mx-auto' src='https://forms.b-cdn.net/website/dashboard/free-trial.webp'></img>
                <h1 className='text-4xl font-semibold text-slate-900 text-center mb-4'>{t('onboarding.trialTitle')}</h1>
                <p className='text-xl text-slate-600 text-center'>
                    {t('onboarding.trialDesc')}
                </p>

                <div className='text-center mt-12'>
                    <span><a href='#' className='bg-blue-700 py-4 px-6 font-medium rounded-md text-slate-50'>{t('onboarding.trialButton')}</a></span>
                    <span><a href='#' className='ml-4 text-gray-700 underline text-sm'>{t('onboarding.trialGofree')}</a></span>
                </div>
            </div>
        </div>
    )
}

export default OnBoarding