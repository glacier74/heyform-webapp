import { UserModel } from '@/models'
import { makeAutoObservable } from 'mobx'
import { mobxStorage } from './storage'

export class UserStore {
  user = {} as UserModel

  constructor() {
    makeAutoObservable(this)
    mobxStorage(this, 'US')
  }

  setUser(user: UserModel) {
    this.user = user
  }

  update(updates: Partial<UserModel>) {
    Object.assign(this.user, updates)
  }
}
