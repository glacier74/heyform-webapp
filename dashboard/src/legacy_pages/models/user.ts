export interface UserModel {
  id: string
  name: string
  email: string
  avatar: string
  note: string
  status: number
  isEmailVerified?: boolean
  isDeletionScheduled?: boolean
  deletionScheduledAt?: number
  createdAt: string
  updatedAt: string
}
