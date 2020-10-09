import React from 'react'
import { Note as BaseNote } from '@lorren/react-pdf-renderer'

import Box from './Box'

export default function Note(props) {
  return <Box as={BaseNote} {...props} />
}
