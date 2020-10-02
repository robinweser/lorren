import React, { useContext } from 'react'

import Text from './Text'
import Box from './Box'
import { useList } from './List'

import useTheme from '../theming/useTheme'
import useConfig from '../configuration/useConfig'

export default function ListItem({ children, marker: customMarker, ...props }) {
  const theme = useTheme()
  const { renderers: Renderers } = useConfig()
  const level = useList()

  const marker =
    customMarker ||
    (Array.isArray(theme.list.marker)
      ? theme.list.marker[level] || theme.list.marker[0]
      : theme.list.marker)

  return (
    <Box direction="row" space={1.5}>
      <Renderers.listItem noReference level={level} {...props}>
        {marker}
      </Renderers.listItem>
      <Renderers.listItem level={level} {...props}>
        {children}
      </Renderers.listItem>
    </Box>
  )
}
