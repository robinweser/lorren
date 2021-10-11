import React from 'react'
import PropTypes from 'prop-types'
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

Link.propTypes = {
  ...Text.propTypes,
  src: PropTypes.string,
}
