import React from 'react'
import PropTypes from 'prop-types'

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

Line.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
