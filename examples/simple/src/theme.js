const colors = {
  primary: 'red',
  secondary: 'blue',
  grey1: '#333333',
}

export default {
  colors,
  baselineGrid: 4,
  typography: {
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
      fontFamily: 'Helvetica',
      fontWeight: 700,
      fontSize: 30,
      lineHeight: 1.4,
      marginBottom: 15,
    },
    subheading: {
      reference: 'subheading',
      fontFamily: 'Helvetica',
      fontWeight: 500,
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
