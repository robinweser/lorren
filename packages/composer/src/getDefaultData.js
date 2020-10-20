import { objectReduce } from 'fast-loops'

export default function getDefaultData(data) {
  return objectReduce(
    data,
    (defaultData, props, name) => {
      defaultData[name] = props

      if (props.default) {
        defaultData[name].value = props.default
      }

      return defaultData
    },
    {}
  )
}
