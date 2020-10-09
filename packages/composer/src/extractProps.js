import { objectReduce } from 'fast-loops'

export default function extractProps(props, propTypes) {
  return objectReduce(
    props,
    (extracted, value, prop) => {
      if (propTypes[prop]) {
        extracted[prop] = value
      }

      return extracted
    },
    {}
  )
}
