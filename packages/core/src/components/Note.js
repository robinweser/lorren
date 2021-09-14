import React from 'react'
import { Note as BaseNote } from '@lorren-js/react-pdf-renderer'

import Box from './Box'

export default function Note(props) {
  return <Box as={BaseNote} {...props} />
}
