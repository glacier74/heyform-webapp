import type { FormThemeV3 } from '@heyforms/shared-types-enums'
import { alpha } from '@hpnp/utils'
import { isValid } from '@hpnp/utils/helper'

export const DEFAULT_THEME: FormThemeV3 = {
  fontFamily: 'Public Sans',
  questionTextColor: '#000',
  answerTextColor: '#000',
  buttonBackground: '#2563eb',
  buttonTextColor: '#fff',
  backgroundColor: '#fff'
}

export const GOOGLE_FONTS = [
  'Public Sans',
  'Inter',
  'Montserrat',
  'Alegreya',
  'B612',
  'Muli',
  'Titillium Web',
  'Varela',
  'Vollkorn',
  'IBM Plex Mono',
  'Crimson Text',
  'Cairo',
  'BioRhyme',
  'Karla',
  'Lora',
  'Frank Ruhl Libre',
  'Playfair Display',
  'Archivo',
  'Spectral',
  'Fjalla One',
  'Roboto',
  'Rubik',
  'Source Sans Pro',
  'Cardo',
  'Cormorant',
  'Work Sans',
  'Rakkas',
  'Concert One',
  'Yatra One',
  'Arvo',
  'Lato',
  'Abril Fatface',
  'Ubuntu',
  'PT Serif',
  'Old Standard TT',
  'Oswald',
  'Open Sans',
  'Courier Prime',
  'Poppins',
  'Josefin Sans',
  'Fira Sans',
  'Nunito',
  'Exo 2',
  'Merriweather',
  'Noto Sans'
]

export function getWebFontURL(fontName?: string) {
  if (fontName && GOOGLE_FONTS.includes(fontName)) {
    return `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}&display=swap`
  }
}

export function insertWebFont(fontName?: string) {
  const href = getWebFontURL(fontName)

  if (!href) {
    return
  }

  let link = document.getElementById('heyform-webfont')

  if (!link) {
    link = document.createElement('link')

    link.id = 'heyform-webfont'
    link.setAttribute('rel', 'stylesheet')

    document.head.appendChild(link)
  }

  link.setAttribute('href', href)
}

export function getTheme(theme?: FormThemeV3): FormThemeV3 {
  return {
    ...DEFAULT_THEME,
    ...theme
  }
}

export function insertThemeStyle(theme: FormThemeV3) {
  let style = document.getElementById('heyform-theme')

  if (!style) {
    style = document.createElement('style')
    style.id = 'heyform-theme'

    document.head.appendChild(style)
  }

  style.innerHTML = `
  html {
    --heyform-font-family: ${theme.fontFamily};
    --heyform-question-color: ${theme.questionTextColor};
    --heyform-description-color: ${alpha(theme.questionTextColor!, 0.7)};
    --heyform-label-color: ${alpha(theme.questionTextColor!, 0.5)};
    --heyform-answer-color: ${theme.answerTextColor};
    --heyform-answer-opacity-80-color: ${alpha(theme.answerTextColor!, 0.8)};
    --heyform-answer-opacity-60-color: ${alpha(theme.answerTextColor!, 0.6)};
    --heyform-answer-opacity-30-color: ${alpha(theme.answerTextColor!, 0.3)};
    --heyform-answer-opacity-10-color: ${alpha(theme.answerTextColor!, 0.1)};
    --heyform-button-color: ${theme.buttonBackground};
    --heyform-button-opacity-80-color: ${alpha(theme.buttonBackground!, 0.8)};
    --heyform-button-text-color: ${theme.buttonTextColor};
    --heyform-background-color: ${theme.backgroundColor};
  }
  
  .heyform-theme-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    z-index: 2;
    background-color: var(--heyform-background-color);
    ${theme.backgroundImage ? `background-image: url(${theme.backgroundImage});` : ''}
  }
  
  ${
    isValid(theme.backgroundBrightness)
      ? `
    .heyform-theme-background:before {
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: "";
      z-index: 2;
      opacity: ${Math.abs(theme.backgroundBrightness! / 100)};
      background: ${theme.backgroundBrightness! > 0 ? '#fff' : '#000'};
    }`
      : ''
  }
  `
}
