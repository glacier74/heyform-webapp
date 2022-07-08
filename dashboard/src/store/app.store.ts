import { makeAutoObservable } from 'mobx'

export class AppStore {
  // Email address of user who wants to reset password
  resetPasswordEmail = ''

  // Plan modal is open or not
  isPlanModalOpen = false

  // Open create from modal
  isCreateFormOpen = false

  // Form preview is open or not
  isFormPreviewOpen = false

  // User settings is open or not
  isUserSettingsOpen = false

  constructor() {
    makeAutoObservable(this)
  }
}
