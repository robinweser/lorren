import React from 'react'
import { format as formatDateTime } from 'date-fns'

import Text from './Text'

import useConfig from '../configuration/useConfig'

export default function DateTime({ children = Date.now(), format, ...props }) {
  const { dateTime } = useConfig()

  return (
    <Text {...props}>
      {formatDateTime(new Date(children), format || dateTime)}
    </Text>
  )
}
