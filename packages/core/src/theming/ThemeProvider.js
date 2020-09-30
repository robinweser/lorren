import React, { createContext, useContext } from 'react'

import ThemeContext from './ThemeContext'
import defaultTheme from './defaultTheme'

export default function ThemeProvider({
  theme = {},
  overwrite = false,
  children,
}) {
  const previousTheme = useContext(ThemeContext)

  const mergedTheme = {
    ...defaultTheme,
    ...(!overwrite && previousTheme ? previousTheme : {}),
    ...theme,
  }

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}
