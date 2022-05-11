import {
  BIND_PHONE_NUMBER_GQL,
  LOGIN_GQL,
  RESET_PASSWORD_CODE_GQL,
  RESET_PASSWORD_GQL,
  RESET_PASSWORD_WIDTH_PHONE_NUMBER_GQL,
  SEND_RESET_EMAIL_GQL,
  SIGN_UP_CODE_GQL,
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

  static async loginWithPhoneNumber(input: { phoneNumber: string; password: string }) {
    return request.mutate({
      mutation: LOGIN_GQL,
      variables: {
        input
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

  static async signUpCode(input: {
    lotNumber: string
    captchaOutput: string
    passToken: string
    genTime: string
    phoneNumber: string
  }) {
    return request.query({
      query: SIGN_UP_CODE_GQL,
      variables: {
        input
      }
    })
  }

  static signUpWithPhoneNumber(input: { phoneNumber: string; code: string; password: string }) {
    return request.query({
      query: SIGN_UP_GQL,
      variables: {
        input
      }
    })
  }

  static resetPasswordCode(input: {
    lotNumber: string
    captchaOutput: string
    passToken: string
    genTime: string
    phoneNumber: string
  }) {
    return request.query({
      query: RESET_PASSWORD_CODE_GQL,
      variables: {
        input
      }
    })
  }

  static resetPasswordWithPhoneNumber(phoneNumber: string, password: string, code: string) {
    return request.mutate({
      mutation: RESET_PASSWORD_WIDTH_PHONE_NUMBER_GQL,
      variables: {
        input: {
          phoneNumber,
          password,
          code
        }
      }
    })
  }

  static async bindPhoneNumber(input: {
    phoneNumber: string
    password: string
    kind: string
    encryptedData: string
  }) {
    return request.mutate({
      mutation: BIND_PHONE_NUMBER_GQL,
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
