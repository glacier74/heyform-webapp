import {
  LOGIN_CODE_GQL,
  LOGIN_GQL,
  RESET_PASSWORD_GQL,
  SEND_RESET_EMAIL_GQL,
  SIGN_UP_GQL
} from '@/consts'
import { request } from '@/utils'

export class AuthService {
  static async login(email: string, password: string) {
    return request.mutate({
      mutation: LOGIN_GQL,
      variables: {
        input: {
          email,
          password
        }
      }
    })
  }

  static async loginCode(input: {
    lotNumber: string
    captchaOutput: string
    passToken: string
    genTime: string
    phoneNumber: string
  }) {
    return request.query({
      query: LOGIN_CODE_GQL,
      variables: {
        input
      }
    })
  }

  static async loginWithPhoneNumber(phoneNumber: string, code: string) {
    return request.mutate({
      mutation: LOGIN_GQL,
      variables: {
        input: {
          phoneNumber,
          code
        }
      }
    })
  }

  static signUp(input: { name: string; email: string; password: string }) {
    return request.query({
      query: SIGN_UP_GQL,
      variables: {
        input
      }
    })
  }

  static sendResetEmail(email: string) {
    return request.mutate({
      mutation: SEND_RESET_EMAIL_GQL,
      variables: {
        input: {
          email
        }
      }
    })
  }

  static resetPassword(email: string, password: string, code: string) {
    return request.mutate({
      mutation: RESET_PASSWORD_GQL,
      variables: {
        input: {
          email,
          password,
          code
        }
      }
    })
  }
}
