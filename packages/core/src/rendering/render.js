import { render as baseRender } from '@lorren/react-pdf-renderer'

import TestRenderer from 'react-test-renderer'

export default function render(document, path) {
  // we run the TestRenderer once in order to pre-register used fonts
  TestRenderer.create(document)
  baseRender(document, path)
}
