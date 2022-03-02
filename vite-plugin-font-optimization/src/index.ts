import got from 'got'
import type { Plugin } from 'vite'

export interface FontOptimizationOptions {
  fontFamilies: string[]
}

export default function fontOptimizationPlugin({ fontFamilies }: FontOptimizationOptions): Plugin {
  return {
    name: 'font-optimization-plugin',

    async transformIndexHtml(html: string) {
      if (Array.isArray(fontFamilies) && fontFamilies.length > 0) {
        const promises = fontFamilies.map(async fontFamily => {
          const css = await got(fontFamily).text()
          return `<style data-href="${fontFamily}">${css}</style>`
        })
        const css = (await Promise.all(promises)).join('')

        html = html.replace('</head>', `${css}</head>`)
      }

      return html
    }
  }
}
