export const GOOGLE_FONTS = [
  'Public Sans',
  'Inter',
  'Georgia',
  'Sniglet',
  'Raleway',
  'Heebo',
  'Lekton',
  'Arimo',
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
    label: 'System Fonts'
  },
  ...GOOGLE_FONTS.map(value => ({
    value,
    label: value
  }))
]

export const FORM_THEMES = [
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#000',
    answerTextColor: '#0445AF',
    buttonBackground: '#0445AF',
    buttonTextColor: '#fff',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#3D3D3D',
    answerTextColor: '#4FB0AE',
    buttonBackground: '#4FB0AE',
    buttonTextColor: '#fff',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#37404a',
    answerTextColor: '#5c5c5c',
    buttonBackground: '#37404a',
    buttonTextColor: '#fff',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#ecddc2',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-01.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#FBC4AD',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-02.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#b1cbc0',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-03.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#9f5318',
    answerTextColor: '#cb732b',
    buttonBackground: '#cb732b',
    buttonTextColor: '#fff',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#b89837',
    answerTextColor: '#e4ba3f',
    buttonBackground: '#e4ba3f',
    buttonTextColor: '#000',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#5b9d6f',
    answerTextColor: '#7dbb91',
    buttonBackground: '#7dbb91',
    buttonTextColor: '#000',
    backgroundColor: '#fff',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Lato',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#F9F9F9',
    buttonTextColor: '#7A7A7A',
    backgroundColor: '#83cbcc',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-04.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#3D3D3D',
    answerTextColor: '#6E5C31',
    buttonBackground: '#8A763F',
    buttonTextColor: '#fff',
    backgroundColor: '#d5cdbb',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-05.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Lato',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#F9ADA8',
    buttonTextColor: '#98130B',
    backgroundColor: '#26317e',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-06.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Georgia',
    questionTextColor: '#2A3146',
    answerTextColor: '#C44665',
    buttonBackground: '#2A3146',
    buttonTextColor: '#F5F6F9',
    backgroundColor: '#e5e1da',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-07.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Sniglet',
    questionTextColor: '#3D3D3D',
    answerTextColor: '#437E93',
    buttonBackground: '#97D5E2',
    buttonTextColor: '#1B535F',
    backgroundColor: '#f2eee9',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-08.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Raleway',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#FBFBFB',
    buttonTextColor: '#7C7C7C',
    backgroundColor: '#0b0b0b',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-09.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Heebo',
    questionTextColor: '#262627',
    answerTextColor: '#000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#fabf7a',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-10.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Heebo',
    questionTextColor: '#262627',
    answerTextColor: '#000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#6FD3B7',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-11.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Heebo',
    questionTextColor: '#262627',
    answerTextColor: '#000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#71a8ca',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-12.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#262626',
    answerTextColor: '#262626',
    buttonBackground: '#262626',
    buttonTextColor: '#E5E5E5',
    backgroundColor: '#F1ECE2',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Montserrat',
    questionTextColor: '#262626',
    answerTextColor: '#262626',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#e3d8df',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-13.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#F1ECE2',
    answerTextColor: '#F1ECE2',
    buttonBackground: '#F1ECE2',
    buttonTextColor: '#F1ECE2',
    backgroundColor: '#262626',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#000000',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#9BD7CF',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-14.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#000000',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#F1ECE3',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-15.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#000000',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#FEB494',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-16.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Oswald',
    questionTextColor: '#040404',
    answerTextColor: '#000000',
    buttonBackground: '#252525',
    buttonTextColor: '#E4E4E4',
    backgroundColor: '#F9CD48',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Lekton',
    questionTextColor: '#040404',
    answerTextColor: '#7E7E7E',
    buttonBackground: '#5182E0',
    buttonTextColor: '#08142A',
    backgroundColor: '#F3F3F3',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Arvo',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#407FD4',
    buttonBackground: '#4DC950',
    buttonTextColor: '#1e1e45',
    backgroundColor: '#1e1e45',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-17.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#8ed2c8',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-18.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#1f575e',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-19.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Public Sans',
    questionTextColor: '#262627',
    answerTextColor: '#262627',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#EEC395',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-20.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#8b3249',
    answerTextColor: '#c75875',
    buttonBackground: '#c75875',
    buttonTextColor: '#18080C',
    backgroundColor: '#FFFFFF',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#7a3d7c',
    answerTextColor: '#c384c5',
    buttonBackground: '#c384c5',
    buttonTextColor: '#321832',
    backgroundColor: '#FFFFFF',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Arimo',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#2B6F75',
    buttonTextColor: '#fff',
    backgroundColor: '#1c4b51',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-21.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Arimo',
    questionTextColor: '#262627',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#F6A42B',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-22.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Arimo',
    questionTextColor: '#262627',
    answerTextColor: '#000000',
    buttonBackground: '#262627',
    buttonTextColor: '#E5E5E6',
    backgroundColor: '#cbcbcb',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-23.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#408e91',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#4fb0ae',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#cb732b',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#7dbb91',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#eeeeee',
    answerTextColor: '#eeeeee',
    buttonBackground: '#eeeeee',
    buttonTextColor: '#6F6F6F',
    backgroundColor: '#c384c5',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#535353',
    answerTextColor: '#1A91A2',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#d8ebeb',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-24.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Source Sans Pro',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#358BF3',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#B8CBE2',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-25.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#DAB1AD',
    buttonTextColor: '#5E2F2A',
    backgroundColor: '#7B6771',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-26.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#E0FBFF',
    buttonBackground: '#D25476',
    buttonTextColor: '#1F080E',
    backgroundColor: '#2c2c2c',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-27.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Source Sans Pro',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#FFFFFF',
    buttonTextColor: '#808080',
    backgroundColor: '#141518',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-28.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Work Sans',
    questionTextColor: '#272727',
    answerTextColor: '#272727',
    buttonBackground: '#272727',
    buttonTextColor: '#E6E6E6',
    backgroundColor: '#74dba6',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-29.png',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    buttonBackground: '#5DD2F1',
    buttonTextColor: '#063B49',
    backgroundColor: '#7159bc',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-30.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#0C0C0C',
    answerTextColor: '#0C0C0C',
    buttonBackground: '#E26D5A',
    buttonTextColor: '#340F09',
    backgroundColor: '#acb0b0',
    backgroundImage: 'https://storage-us.heyformhq.com/themev3/theme-background-31.jpeg',
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#6cbf2c',
    answerTextColor: '#89bc62',
    buttonBackground: '#c6dfb2',
    buttonTextColor: '#46672B',
    backgroundColor: '#f3f9ef',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#e66902',
    answerTextColor: '#cb732b',
    buttonBackground: '#e6bb98',
    buttonTextColor: '#663C19',
    backgroundColor: '#faf1ea',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#e6ac00',
    answerTextColor: '#e4ba3f',
    buttonBackground: '#EDD59A',
    buttonTextColor: '#735815',
    backgroundColor: '#fdf8ec',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#bf395d',
    answerTextColor: '#c75875',
    buttonBackground: '#e4adbc',
    buttonTextColor: '#6E2438',
    backgroundColor: '#faeef1',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#c968cc',
    answerTextColor: '#c384c5',
    buttonBackground: '#e2c3e3',
    buttonTextColor: '#703572',
    backgroundColor: '#f9f3fa',
    backgroundImage: undefined,
    backgroundBrightness: 0
  },
  {
    fontFamily: 'Karla',
    questionTextColor: '#38bdcf',
    answerTextColor: '#73bec8',
    buttonBackground: '#bbe0e5',
    buttonTextColor: '#2D6C75',
    backgroundColor: '#f1f9fa',
    backgroundImage: undefined,
    backgroundBrightness: 0
  }
]

export const COLOR_PICKER_PRESET_COLORS = [
  '#0252d7',
  '#22c55e',
  '#06b6d4',
  '#fbbf24',
  '#d946ef',
  '#dc2626',
  '#6b21a8',
  '#854d0e',
  '#94a3b8',
  '#000000'
]
