import React from 'react'
import { renderToString } from '@react-pdf/renderer'

import render from './render'

import Document from '../components/Document'
import Page from '../components/Page'

import IndexReference from '../indexing/IndexReference'
import IndexProvider from '../indexing/IndexProvider'

import { FILE_END } from '../indexing/indexTokens'

export default function renderWithIndex(document, renderFn, path, callback) {
  renderToString(
    <IndexProvider
      onDone={(index) =>
        setTimeout(() => render(renderFn(index), path, callback), 0)
      }>
      <Document>
        {document}
        <Page>
          <IndexReference type={FILE_END} />
        </Page>
      </Document>
    </IndexProvider>
  )
}
