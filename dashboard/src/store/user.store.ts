import { UserModel } from '@/models'
import { makeAutoObservable } from 'mobx'
import { mobxStorage } from './mobxStorage'

export class UserStore {
  user = {} as UserModel

  constructor() {
    makeAutoObservable(this)
    mobxStorage(this, 'UserStore')
  }

  setUser(user: UserModel) {
    this.user = user
  }

  update(updates: Partial<UserModel>) {
    Object.assign(this.user, updates)
  }
}
