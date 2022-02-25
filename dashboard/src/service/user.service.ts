import {
  CANCEL_USER_DELETION_GQL,
  CHANGE_USER_EMAIL_GQL,
  RESEND_VERIFY_EMAIL_GQL,
  UPDATE_USER_DETAIL_GQL,
  UPDATE_USER_PASSWORD_GQL,
  USER_CDN_TOKEN_GQL,
  USER_DANGER_ZONE_GQL,
  USER_DELETION_CODE_GQL,
  USER_DETAILS_GQL,
  VERIFY_USER_DELETION_GQL,
  VERIFY_USER_EMAIL_GQL
} from '@/consts'
import { request } from '@/utils'

export class UserService {
  static async user() {
    const result = await request.query({
      query: USER_DETAILS_GQL
    })
    return result.data.userDetail
  }

  static update(input: { name?: string; avatar?: string; restoreGravatar?: boolean }) {
    return request.mutate({
      mutation: UPDATE_USER_DETAIL_GQL,
      variables: {
        input
      }
    })
  }

  static changeEmail(token: string, email: string) {
    return request.mutate({
      mutation: CHANGE_USER_EMAIL_GQL,
      variables: {
        input: {
          token,
          email
        }
      }
    })
  }

  static verifyEmail(token: string) {
    return request.mutate({
      mutation: VERIFY_USER_EMAIL_GQL,
      variables: {
        input: {
          token
        }
      }
    })
  }

  static updatePassword(token: string, password: string) {
    return request.mutate({
      mutation: UPDATE_USER_PASSWORD_GQL,
      variables: {
        input: {
          token,
          password
        }
      }
    })
  }

  static resendVerifyEmail(token: string) {
    return request.query({
      query: RESEND_VERIFY_EMAIL_GQL,
      variables: {
        input: {
          token
        }
      }
    })
  }

  static dangerZone(password: string) {
    return request.query({
      query: USER_DANGER_ZONE_GQL,
      variables: {
        input: {
          password
        }
      }
    })
  }

  static async cdnToken(filename: string, mime: string) {
    const result = await request.query({
      query: USER_CDN_TOKEN_GQL,
      variables: {
        input: {
          filename,
          mime
        }
      }
    })
    return result.data.userCdnToken
  }

  static sendDeletionCode() {
    return request.query({
      query: USER_DELETION_CODE_GQL
    })
  }

  static verifyDeletionCode(code: string) {
    return request.mutate({
      mutation: VERIFY_USER_DELETION_GQL,
      variables: {
        input: {
          code
        }
      }
    })
  }

  static cancelDeletion() {
    return request.mutate({
      mutation: CANCEL_USER_DELETION_GQL
    })
  }
}
