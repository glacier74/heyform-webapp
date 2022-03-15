import { UserModel } from '@/models'
import { makeAutoObservable } from 'mobx'

export class UserStore {
  user = {} as UserModel

  constructor() {
    makeAutoObservable(this)
  }

  setUser(user: UserModel) {
    this.user = user
  }

  update(updates: Partial<UserModel>) {
    Object.assign(this.user, updates)
  }
}
