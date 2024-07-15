import axios from 'axios'

import { ChangelogType } from '@/types'

export class ChangelogService {
  static async latest(): Promise<ChangelogType> {
    return (await axios.get('/changelog/latest')).data
  }

  static async list(): Promise<ChangelogType[]> {
    return (await axios.get('/changelogs')).data
  }
}
