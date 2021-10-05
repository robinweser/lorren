import React from 'react'
import { PDFViewer as BasePDFViewer } from '@react-pdf/renderer'

export default function PDFViewer(props) {
  return <BasePDFViewer {...props} />
}
