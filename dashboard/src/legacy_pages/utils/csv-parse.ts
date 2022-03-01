import { isValidArray } from '@hpnp/utils/helper'
import { parse, ParseError, ParseResult } from 'papaparse'

export function csvParse<T = Record<string, any>>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    parse(file, {
      complete(result: ParseResult<T>) {
        if (isValidArray(result.errors)) {
          reject(result.errors[0])
        } else {
          resolve(result)
        }
      },
      error(error: ParseError) {
        reject(error)
      }
    })
  })
}
