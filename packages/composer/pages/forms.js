import React from 'react'
import {
  Page as LorrenPage,
  Document,
  PDFViewer,
  Box as LorrenBox,
  Text,
  Currency,
  Line,
  DateTime,
  Link,
  Image,
  Spacer,
  Markdown,
} from '@lorren/core'
import { Box } from 'kilvin'

import Forms from '../components/Forms'

const components = {
  Page: LorrenPage,
  Document,
  Box: LorrenBox,
  Text,
  Currency,
  Line,
  Link,
  DateTime,
  Image,
  Spacer,
  Markdown,
}

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

const theme = {
  colors,
  baselineGrid: 4,

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
      // fontFamily: fonts.HEADING,
      fontSize: 12,
      lineHeight: 1.2,
      color: colors.grey1,
    },
    paragraph: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.4,
      color: colors.grey1,
      marginBottom: 10,
    },
    heading1: {
      reference: 'heading',
      // fontFamily: fonts.HEADING,
      fontWeight: 700,
      fontSize: 30,
      lineHeight: 1.4,
      marginBottom: 10,
    },
    heading2: {
      reference: 'subheading',
      fontFamily: fonts.HEADING,
      fontSize: 24,
      lineHeight: 1.2,
      marginBottom: 10,
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

export default () => (
  <Box padding={20}>
    <Forms components={components} />
  </Box>
)
