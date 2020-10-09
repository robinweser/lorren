import { objectReduce } from 'fast-loops'

export default function getDefaultStyle(propTypes) {
  return objectReduce(
    propTypes,
    (style, value, prop) => {
      style[prop] = value.initial
      return style
    },
    {}
  )
}
