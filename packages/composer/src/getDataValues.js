import { objectReduce } from 'fast-loops'

export default function getDataValues(data, timestamp = Date.now()) {
  return objectReduce(
    data,
    (values, { type, value }, prop) => {
      if (type === 'calculated') {
        const replacedValue = objectReduce(
          data,
          (replaced, { value }, name) =>
            replaced.replace(new RegExp(name, 'gi'), value),
          value || ''
        )

        try {
          values[prop] = eval(replacedValue)
        } catch (e) {}
      } else {
        values[prop] = value
      }

      return values
    },
    {
      timestamp,
    }
  )
}
