import React from 'react'

import Box from './Box'
import applyMultiplier from '../theming/applyMultipier'
import useTheme from '../theming/useTheme'

export default function Spacer({ size = 1, debug }) {
  const theme = useTheme()

  const spacing = applyMultiplier(theme.baselineGrid)

  return <Box debug={debug} width={spacing(size)} height={spacing(size)} />
}

Spacer.childOf = ['Page', 'Box']
Spacer.lorrenTypes = {
  size: {
    type: 'unit',
    initial: 1,
  },
}
