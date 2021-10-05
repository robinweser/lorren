import React from 'react'
import { Note as BaseNote } from '@react-pdf/renderer'

import Box from './Box'

export default function Note(props) {
  return <Box as={BaseNote} {...props} />
}
