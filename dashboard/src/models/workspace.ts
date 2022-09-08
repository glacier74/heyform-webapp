import { ProjectModel } from '@/models/project'
import { UserModel } from '@/models/user'
import { CF_DnsRecord } from '@heyforms/shared-types-enums'
import { BillingCycleEnum } from './invoice'
import { PlanModel } from './plan'

export enum SubscriptionStatusEnum {
  PENDING = 0,
  ACTIVE = 1,
  EXPIRED = 2
}

export interface SubscriptionModel {
  planId: string
  billingCycle: BillingCycleEnum
  startAt: number
  endAt: number
  canceledAt: number
  isCanceled?: boolean
  trialing?: boolean
  status: SubscriptionStatusEnum
}

export interface CustomHostnameModel {
  teamId: string
  hostname: string
  cloudflareId: string
  dnsRecords: CF_DnsRecord[]
  isActivated: boolean
}

export interface WorkspaceModel {
  id: string
  name: string
  ownerId: string
  avatar?: string
  enableCustomDomain?: boolean
  customDomain?: string
  removeBranding?: boolean
  inviteCode: string
  inviteCodeExpireAt?: number
  allowJoinByInviteLink: boolean
  storageQuota: number
  memberCount: number
  additionalSeats: number
  contactCount: number
  subscription: SubscriptionModel
  plan: PlanModel
  projects: ProjectModel[]
  members: UserModel[]
  isOwner?: boolean
  owner?: UserModel
  createdAt?: number
}

export interface WorkspaceMemberModel {
  id: string
  name: string
  email: string
  avatar: string
  isOwner: boolean
  lastSeenAt?: number
}
