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

export const DATE_FORMAT_OPTIONS: IOptionType[] = [
  {
    label: 'MM/DD/YYYY',
    value: 'MM/DD/YYYY'
  },
  {
    label: 'DD/MM/YYYY',
    value: 'DD/MM/YYYY'
  },
  {
    label: 'YYYY/MM/DD',
    value: 'YYYY/MM/DD'
  },
  {
    label: 'MM-DD-YYYY',
    value: 'MM-DD-YYYY'
  },
  {
    label: 'DD-MM-YYYY',
    value: 'DD-MM-YYYY'
  },
  {
    label: 'YYYY-MM-DD',
    value: 'YYYY-MM-DD'
  },
  {
    label: 'MM.DD.YYYY',
    value: 'MM.DD.YYYY'
  },
  {
    label: 'DD.MM.YYYY',
    value: 'DD.MM.YYYY'
  },
  {
    label: 'YYYY.MM.DD',
    value: 'YYYY.MM.DD'
  }
]

export const DATE_FORMAT_NAMES: IMapType = {
  YYYY: 'Year',
  MM: 'Month',
  DD: 'Day'
}
