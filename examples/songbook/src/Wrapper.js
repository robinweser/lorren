import React from 'react'
import { ThemeProvider, ConfigProvider, Text } from '@lorren-js/core'

import theme from './theme'

export default function Wrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
