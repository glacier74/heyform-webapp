import { isValidArray } from '@hpnp/utils/helper'
import type { ParseError, ParseResult } from 'papaparse'
import { parse } from 'papaparse'

export function csvParse<T = IMapType>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    parse(file, {
      complete(result: ParseResult<T>) {
        if (isValidArray(result.errors)) {
          reject(result.errors[0])
        } else {
          resolve(result.data)
        }
      },
      error(error: ParseError) {
        reject(error)
      }
    })
  })
}
