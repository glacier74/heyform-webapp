import { ProjectModel } from '@/legacy_pages/models/project'
import { UserModel } from '@/legacy_pages/models/user'
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
  status: SubscriptionStatusEnum
}

export enum MemberRoleEnum {
  OWNER,
  ADMIN,
  COLLABORATOR,
  MEMBER
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
  role?: MemberRoleEnum
  owner?: UserModel
  createdAt?: number
}

export enum MemberActionEnum {
  TRANSFER = 1,
  REMOVE
}

export interface MemberModel {
  id: string
  name: string
  email: string
  avatar: string
  role: MemberRoleEnum
  isOwner: boolean
  lastSeenAt?: number
}
