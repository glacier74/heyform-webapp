import * as qiniu from 'qiniu-js'
import type { UploadCompleteData } from 'qiniu-js/esm/api'
import type { QiniuError, QiniuNetworkError, QiniuRequestError } from 'qiniu-js/esm/errors'
import type { UploadProgress } from 'qiniu-js/esm/upload/base'
import type { Observable } from 'qiniu-js/esm/utils'
import type { ISubscriptionLike } from 'qiniu-js/src/utils/observable'

export class Qiniu {
  private observable!: Observable<
    UploadProgress,
    QiniuError | QiniuRequestError | QiniuNetworkError,
    UploadCompleteData
  >

  private subscription!: ISubscriptionLike

  private readonly onProgress?: (percent: number) => void

  constructor(file: File, key: string, token: string, onProgress?: (percent: number) => void) {
    this.observable = qiniu.upload(file, key, token)
    this.onProgress = onProgress
  }

  static init(
    file: File,
    key: string,
    token: string,
    onProgress?: (percent: number) => void
  ): Qiniu {
    return new Qiniu(file, key, token, onProgress)
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.subscription = this.observable.subscribe(
        this.handleProgress.bind(this) as any,
        reject,
        resolve
      )
    })
  }

  cancel() {
    this.subscription.unsubscribe()
  }

  private handleProgress({ total: { percent } }: UploadProgress) {
    this.onProgress && this.onProgress(Number(percent.toFixed(2)))
  }
}
