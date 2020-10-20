import { objectReduce } from 'fast-loops'

export default function getCleanData(data) {
  return objectReduce(
    data,
    (cleanData, { value, ...rest }, name) => {
      cleanData[name] = rest
      return cleanData
    },
    {}
  )
}
