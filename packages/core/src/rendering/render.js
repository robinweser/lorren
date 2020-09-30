import { render as baseRender } from '@react-pdf/renderer'

export default function render(document, path) {
  return baseRender(document, path)
}
