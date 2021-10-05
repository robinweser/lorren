import React from 'react'
import { Document as BaseDocument } from '@react-pdf/renderer'

export default function Document({ children, ...props }) {
  return <BaseDocument {...props}>{children}</BaseDocument>
}

Document.childOf = []
Document.lorrenTypes = {
  title: {
    type: 'string',
  },
  author: {
    type: 'string',
  },
  subject: {
    type: 'string',
  },
  keywords: {
    type: 'string',
  },
  creator: {
    type: 'string',
  },
  producer: {
    type: 'string',
  },
}
