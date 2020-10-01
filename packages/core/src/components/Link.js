import React from 'react'
import { Link as BaseLink } from '@react-pdf/renderer'

import Box from './Box'

import IndexReference from '../indexing/IndexReference'
import { LINK } from '../indexing/indexTokens'

export default function Link({ src, ...props }) {
  return (
    <>
      <IndexReference type={SOURCE} reference={src} />
      <Box as={BaseLink} src={src} {...props} />
    </>
  )
}
