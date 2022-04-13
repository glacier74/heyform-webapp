export const GOOGLE_FONTS = [
  'Public Sans',
  'Inter',
  'Montserrat',
  'Alegreya',
  'B612',
  'Muli',
  'Titillium Web',
  'Varela',
  'Vollkorn',
  'IBM Plex Mono',
  'Crimson Text',
  'Cairo',
  'BioRhyme',
  'Karla',
  'Lora',
  'Frank Ruhl Libre',
  'Playfair Display',
  'Archivo',
  'Spectral',
  'Fjalla One',
  'Roboto',
  'Rubik',
  'Source Sans Pro',
  'Cardo',
  'Cormorant',
  'Work Sans',
  'Rakkas',
  'Concert One',
  'Yatra One',
  'Arvo',
  'Lato',
  'Abril Fatface',
  'Ubuntu',
  'PT Serif',
  'Old Standard TT',
  'Oswald',
  'Open Sans',
  'Courier Prime',
  'Poppins',
  'Josefin Sans',
  'Fira Sans',
  'Nunito',
  'Exo 2',
  'Merriweather',
  'Noto Sans'
]

export const GOOGLE_FONTS_OPTIONS: IOptionType[] = [
  {
    value:
      '-apple-system, BlinkMacSystemFont, Helvetica, Roboto, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", STXihei, "Microsoft YaHei", SimHei, "WenQuanYi Micro Hei", serif',
    label: 'System font'
  },
  ...GOOGLE_FONTS.map(value => ({
    value,
    label: value
  }))
]
