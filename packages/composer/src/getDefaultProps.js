import { objectReduce } from 'fast-loops'

export default function getDefaultProps(propTypes) {
  return objectReduce(
    propTypes,
    (props, value, prop) => {
      props[prop] = value.initial

      if (value.type === 'shape') {
        props[prop] = getDefaultProps(value.shape)
      }

      return props
    },
    {}
  )
}
