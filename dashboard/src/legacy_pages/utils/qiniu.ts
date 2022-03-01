import * as qiniu from 'qiniu-js'
import { UploadCompleteData } from 'qiniu-js/esm/api'
import { QiniuError, QiniuNetworkError, QiniuRequestError } from 'qiniu-js/esm/errors'
import { UploadProgress } from 'qiniu-js/esm/upload/base'
import { Observable } from 'qiniu-js/esm/utils'
import { ISubscriptionLike } from 'qiniu-js/src/utils/observable'

export class QiniuCdn {
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
  ): QiniuCdn {
    return new QiniuCdn(file, key, token, onProgress)
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
