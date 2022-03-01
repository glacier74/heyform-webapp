import {
  CONTACTS_GQL,
  CREATE_CONTACT_GQL,
  CREATE_GROUP_GQL,
  DELETE_CONTACTS_GQL,
  DELETE_GROUP_GQL,
  GROUPS_GQL,
  IMPORT_CONTACTS_GQL,
  SHARE_TO_AUDIENCE_GQL,
  UPDATE_CONTACT_GQL,
  UPDATE_GROUP_GQL
} from '@/consts'
import { request } from '@/utils'

export class AudienceService {
  static async contacts(input: {
    teamId: string
    groupIds?: string[]
    keyword?: string
    page: number
    limit: number
  }) {
    return request.query({
      query: CONTACTS_GQL,
      variables: {
        input
      }
    })
  }

  static async createContact(input: {
    teamId: string
    fullName: string
    email: string
    jobTitle?: string
    groupIds: string[]
  }) {
    return request.mutate({
      mutation: CREATE_CONTACT_GQL,
      variables: {
        input
      }
    })
  }

  static async importContacts(input: { teamId: string; contacts: any[]; groupIds: string[] }) {
    return request.mutate({
      mutation: IMPORT_CONTACTS_GQL,
      variables: {
        input
      }
    })
  }

  static async updateContact(input: {
    teamId: string
    contactId: string
    fullName?: string
    email?: string
    jobTitle?: string
    groupIds?: string[]
  }) {
    return request.mutate({
      mutation: UPDATE_CONTACT_GQL,
      variables: {
        input
      }
    })
  }

  static async deleteContacts(input: { teamId: string; contactIds: string[] }) {
    return request.mutate({
      mutation: DELETE_CONTACTS_GQL,
      variables: {
        input
      }
    })
  }

  static async groups(input: { teamId: string; keyword?: string; page: number; limit: number }) {
    return request.query({
      query: GROUPS_GQL,
      variables: {
        input
      }
    })
  }

  static async createGroup(input: { teamId: string; name: string }) {
    return request.mutate({
      mutation: CREATE_GROUP_GQL,
      variables: {
        input
      }
    })
  }

  static async updateGroup(input: { teamId: string; name: string }) {
    return request.mutate({
      mutation: UPDATE_GROUP_GQL,
      variables: {
        input
      }
    })
  }

  static async deleteGroup(input: { teamId: string; groupId: string }) {
    return request.mutate({
      mutation: DELETE_GROUP_GQL,
      variables: {
        input
      }
    })
  }

  static async share(input: { formId: string; groupIds: string[] }) {
    return request.mutate({
      mutation: SHARE_TO_AUDIENCE_GQL,
      variables: {
        input
      }
    })
  }
}
