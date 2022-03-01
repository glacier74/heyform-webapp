import { APP_AUTHORIZE_URL_GQL, APP_DETAIL_GQL, APPS_GQL } from '@/consts'
import { request } from '@/utils'

export class AppService {
  static async apps() {
    return request.query({
      query: APPS_GQL
    })
  }

  static async detail(clientId: string, redirectUri: string) {
    return request.query({
      query: APP_DETAIL_GQL,
      variables: {
        input: {
          clientId,
          redirectUri
        }
      }
    })
  }

  static async authorizationCode(clientId: string, redirectUri: string) {
    return request.query({
      query: APP_AUTHORIZE_URL_GQL,
      variables: {
        input: {
          clientId,
          redirectUri,
          responseType: 'code'
        }
      }
    })
  }
}