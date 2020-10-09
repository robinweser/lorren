import React from 'react'
import { format as formatDateTime } from 'date-fns'

import Text from './Text'

import useConfig from '../configuration/useConfig'

export default function DateTime({
  children = Date.now(),
  value = children,
  format,
  ...props
}) {
  const { dateTime } = useConfig()

  let formatted
  try {
    formatted = formatDateTime(new Date(value), format || dateTime)
  } catch (e) {}

  return <Text {...props} text={formatted} />
}

DateTime.childOf = ['Page', 'Box', 'Text']
DateTime.lorrenTypes = {
  value: {
    type: 'date',
    initial: Date.now(),
  },
  format: {
    type: 'string',
    initial: 'yyyy-MM-dd',
  },
}
