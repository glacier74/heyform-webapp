import Uploader from '@hpnp/qiniu-uploader'

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

export const UploadZone = Uploader.zone as {
  z0: any
  z1: any
  z2: any
  na0: any
}

export default function uploadPlugin(options: UploadPluginOptions): any {
  return {
    name: 'upload-plugin',
    apply: 'build',
    closeBundle() {
      new Uploader(options).start()
    }
  }
}
