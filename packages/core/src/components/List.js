import React, { useContext, createContext } from 'react'
import PropTypes from 'prop-types'

import Box from './Box'

import useTheme from '../theming/useTheme'

export const ListContext = createContext(0)
export function useList() {
  return useContext(ListContext)
}

export default function List({ children, ident, style, ...props }) {
  const theme = useTheme()
  const level = useList()

  return (
    <ListContext.Provider value={level + 1}>
      <Box
        {...props}
        style={{
          paddingLeft: ident || (level > 0 ? theme.list.ident || 0 : 0),
          ...style,
        }}>
        {children}
      </Box>
    </ListContext.Provider>
  )
}

List.propTypes = {
  ident: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
