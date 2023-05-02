import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    gray: {
      700: '#1A181B',
      600: '#3E3A40',
      500: '#5F5B62',
      400: '#9F9BA1',
      300: '#D9D8DA',
      200: '#EDECEE',
      100: '#F7F7F8'
    },
    red: {
      400: '#EE7979'
    },
    blue: {
      500: '#364D9D',
      400: '#647AC7'
    }
  },
  fonts: {    
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
    extra: 'Karla_800ExtraBold',
  },
  fontSizes: {
    xxs: 10,
    xs: 11,
    s: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    14: 56,
    33: 148
  }
})
