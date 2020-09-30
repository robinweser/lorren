import React from 'react'

import Box from './Box'
import applyMultiplier from '../theming/applyMultipier'
import useTheme from '../theming/useTheme'

export default function Spacer({ size = 1 }) {
  const theme = useTheme()

  const spacing = applyMultiplier(theme.baselineGrid)

  return <Box width={spacing(size)} basis={spacing(size)} />
}
