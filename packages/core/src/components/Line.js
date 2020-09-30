import React from 'react'

import Box from './Box'

import useTheme from '../theming/useTheme'

export default function Line({ size, color, width = '100%' }) {
  const { styles } = useTheme()

  return (
    <Box style={styles.lineContainer}>
      <Box height={size} width={width} style={{ backgroundColor: color }} />
    </Box>
  )
}
