import type { Plugin } from 'vite'

export interface HTMLInjectionOptions {
  variables: Record<string, string>
  openDelimiter?: string
  closeDelimiter?: string
}

export default function htmlInjectionPlugin(options: HTMLInjectionOptions): Plugin {
  return {
    name: 'html-injection-plugin',

    async transformIndexHtml(html: string) {
      const openDelimiter = options.openDelimiter || '%'
      const closeDelimiter = options.closeDelimiter || '%'

      Object.keys(options.variables).forEach(key => {
        const regex = new RegExp(`${openDelimiter}${key}${closeDelimiter}`, 'g')
        html = html.replace(regex, options.variables[key])
      })

      return html
    }
  }
}
