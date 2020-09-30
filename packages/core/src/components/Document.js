import React from 'react'
import { Document as BaseDocument } from '@react-pdf/renderer'

export default function Document({ children, ...props }) {
  return <BaseDocument {...props}>{children}</BaseDocument>
}
