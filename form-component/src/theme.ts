import type { FormThemeV3 } from '@heyforms/shared-types-enums'
import { alpha } from '@hpnp/utils'
import { isNil } from '@hpnp/utils/helper'

const DEFAULT_THEME: FormThemeV3 = {
  fontFamily: 'Public Sans',
  questionTextColor: '#000',
  answerTextColor: '#000',
  buttonBackground: '#2563eb',
  buttonTextColor: '#fff',
  backgroundColor: '#fff'
}

export function getWebFontURL(fontName?: string) {
  if (fontName) {
    return `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}&display=swap`
  }
}

export function loadWebFont(fontName?: string) {
  const href = getWebFontURL(fontName)

  if (!href) {
    return
  }

  const link = document.createElement('link')

  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)

  document.head.appendChild(link)
}

export function getTheme(theme?: FormThemeV3): FormThemeV3 {
  return {
    ...DEFAULT_THEME,
    ...theme
  }
}

export function getThemeStyles(theme: FormThemeV3): string {
  return `
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
    background-position: top;
    z-index: 2;
    background-color: var(--heyform-background-color);
    ${theme.backgroundImage && `background-image: url(${theme.backgroundImage});`}
  }
  
  ${
    !isNil(theme.backgroundBrightness) &&
    `
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
  }
  `
}
