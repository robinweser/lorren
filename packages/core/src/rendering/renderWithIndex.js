import React from 'react'
import render from './render'

import Document from '../components/Document'
import Page from '../components/Page'

import IndexReference from '../indexing/IndexReference'
import IndexProvider from '../indexing/IndexProvider'

import { FILE_END } from '../indexing/indexTokens'

export default function renderWithIndex(document, renderFn, path) {
  const segments = path.split('/')
  const indexPath = segments.slice(0, segments.length - 1).join('/')

  return render(
    <IndexProvider onDone={(index) => render(renderFn(index), path)}>
      <Document>
        {document}
        <Page>
          <IndexReference type={FILE_END} />
        </Page>
      </Document>
    </IndexProvider>,
    indexPath + '/.lorren-index.json'
  )
}
