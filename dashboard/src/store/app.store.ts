import { makeAutoObservable } from 'mobx'

export class AppStore {
  // Email address of user who wants to reset password
  resetPasswordEmail = ''

  // Plan modal is open or not
  isPlanModalOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  setResetPasswordEmail(email: string) {
    this.resetPasswordEmail = email
  }

  deleteResetPasswordEmail() {
    this.resetPasswordEmail = ''
  }

  openPlanModal() {
    this.isPlanModalOpen = true
  }

  closePlanModal() {
    this.isPlanModalOpen = false
  }
}
