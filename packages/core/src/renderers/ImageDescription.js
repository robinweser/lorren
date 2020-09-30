import React from 'react'

import Text from '../components/Text'
import Box from '../components/Box'

export default function ImageDescription(description) {
  return (
    <Box paddingTop={1}>
      <Text>{description}</Text>
    </Box>
  )
}
