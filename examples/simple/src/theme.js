const colors = {
  primary: 'red',
  secondary: 'blue',
  grey1: '#333333',
}

const fonts = {
  HEADING: {
    family: 'Bell Gothic',
    files: [
      {
        src: 'https://liedgut.bdp-rps.app/fonts/Bell_Gothic.ttf',
      },
      {
        src: 'https://liedgut.bdp-rps.app/fonts/Bell_Gothic_Bold.ttf',
        fontWeight: 'bold',
      },
    ],
  },
}

export default {
  colors,
  baselineGrid: 4,
  fonts,
  typography: {
    quote: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.5,
      paddingLeft: 15,
      borderLeftColor: 'red',
      borderLeftWidth: 3,
      borderLeftStyle: 'solid',
    },
    body: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.2,
      color: colors.grey1,
    },
    paragraph: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.4,
      color: colors.grey1,
      marginBottom: 20,
    },
    heading: {
      reference: 'heading',
      fontFamily: fonts.HEADING,
      fontWeight: 700,
      fontSize: 30,
      lineHeight: 1.4,
      marginBottom: 15,
    },
    subheading: {
      reference: 'subheading',
      fontFamily: fonts.HEADING,
      fontSize: 24,
      lineHeight: 1.2,
      marginBottom: 20,
    },
  },
  styles: {
    imageContainer: {
      marginBottom: 20,
    },
    lineContainer: {
      marginTop: 10,
      marginBottom: 10,
    },
  },
}
