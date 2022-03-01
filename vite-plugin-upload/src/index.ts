// @ts-ignore
import * as Uploader from '@hpnp/qiniu-uploader'

export interface UploadPluginOptions {
  envFile?: string
  prefix?: string
  base?: string
  glob?: string
  globIgnore?: string[]
  bucket?: string
  overrides?: true
  parallelCount?: number
  zone?: string
  debug?: true
}

export default function uploadPlugin(options: UploadPluginOptions) {
  return {
    name: 'upload-plugin',
    apply: 'build',
    closeBundle() {
      new Uploader(options)
    }
  }
}
