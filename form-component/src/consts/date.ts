export const DATE_FORMAT_MAPS: IMapType = {
  'MM/DD/YYYY': ['MM', 'DD', 'YYYY', '/'],
  'DD/MM/YYYY': ['DD', 'MM', 'YYYY', '/'],
  'YYYY/MM/DD': ['YYYY', 'MM', 'DD', '/'],
  'MM-DD-YYYY': ['MM', 'DD', 'YYYY', '-'],
  'DD-MM-YYYY': ['DD', 'MM', 'YYYY', '-'],
  'YYYY-MM-DD': ['YYYY', 'MM', 'DD', '-'],
  'MM.DD.YYYY': ['MM', 'DD', 'YYYY', '.'],
  'DD.MM.YYYY': ['DD', 'MM', 'YYYY', '.'],
  'YYYY.MM.DD': ['YYYY', 'MM', 'DD', '.']
}

export const DATE_FORMAT_NAMES: IMapType = {
  YYYY: 'Year',
  MM: 'Month',
  DD: 'Day'
}

export const DATE_FORMAT_RANGE: IMapType = {
  YYYY: [1, 9999],
  MM: [1, 12],
  DD: [1, 31]
}

export const FILTER_NUMBER_REGEX = /[^\d]/g
