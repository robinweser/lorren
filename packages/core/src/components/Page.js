import React from 'react'
import { Page as BasePage } from '@react-pdf/renderer'

import Box from './Box'

export default function Page(props) {
  return <Box as={BasePage} {...props} />
}
