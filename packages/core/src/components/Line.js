import React from 'react'

import Box from './Box'

import useTheme from '../theming/useTheme'

export default function Line({ size = 1, color = 'black', width = '100%' }) {
  const { styles } = useTheme()

  return (
    <Box style={styles.lineContainer}>
      <Box height={size} width={width} style={{ backgroundColor: color }} />
    </Box>
  )
}

Line.childOf = ['Page', 'Box']
Line.lorrenTypes = {
  size: {
    type: 'integer',
    initial: 1,
  },
  color: {
    type: 'color',
    initial: 'black',
  },
  width: {
    type: 'unit',
    initial: '100%',
  },
}
