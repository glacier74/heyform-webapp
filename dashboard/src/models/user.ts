export interface UserModel {
  id: string
  name: string
  email: string
  avatar: string
  note: string
  lastSeenAt?: number
  isEmailVerified?: boolean
  isDeletionScheduled?: boolean
  deletionScheduledAt?: number
  status: number
  createdAt: string
  updatedAt: string
}
