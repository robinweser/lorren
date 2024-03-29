import React, { useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { objectMergeDeep } from 'fast-loops'

import ThemeContext from './ThemeContext'
import defaultTheme from './defaultTheme'

export default function ThemeProvider({
  theme: customTheme = {},
  overwrite = false,
  children,
}) {
  const previousTheme = useContext(ThemeContext)

  const theme = objectMergeDeep(
    {},
    defaultTheme,
    !overwrite && previousTheme ? previousTheme : {},
    customTheme
  )

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  overwrite: PropTypes.bool,
}
