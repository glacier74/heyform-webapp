import en from './en'
import zh from './zh'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      ...en
    }
  },
  zh: {
    translation: {
      ...zh
    }
  }
}
const supportedLngs = Object.keys(resources)

i18n.use(initReactI18next).init({
  lowerCaseLng: true,
  resources,
  lng: 'en',
  fallbackLng: supportedLngs[0],
  supportedLngs,
  interpolation: {
    escapeValue: false
  },
  react: {
    // https://react.i18next.com/latest/trans-component#trans-props
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'b', 'i', 'a']
  }
})

export default i18n
