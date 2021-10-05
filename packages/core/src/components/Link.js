import React from 'react'
import { Link as BaseLink } from '@react-pdf/renderer'

import Box from './Box'
import Text from './Text'

import IndexReference from '../indexing/IndexReference'
import { LINK } from '../indexing/indexTokens'

export default function Link({ src, ...props }) {
  return (
    <>
      <IndexReference type={LINK} reference={src} />
      <Box as={BaseLink} src={src}>
        <Text {...props}>{src}</Text>
      </Box>
    </>
  )
}

const { text, ...textTypes } = Text.lorrenTypes({ typography: {} })

Link.childOf = ['Page', 'Box', 'Text']
Link.lorrenTypes = {
  src: {
    type: 'url',
  },
  ...textTypes,
  textDecoration: {
    type: 'select',
    initial: 'underline',
    options: ['none', 'underline', 'line-through'],
  },
}
