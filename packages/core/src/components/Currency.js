import React from 'react'

import Text from './Text'

import useConfig from '../configuration/useConfig'

export default function Currency({
  children,
  currency,
  thousandSeparator,
  locale,
  ...props
}) {
  const config = useConfig()

  if (children === undefined) {
    return null
  }

  const formatter = Intl.NumberFormat(locale || config.locale, {
    style: 'currency',
    useGrouping: thousandSeparator,
    currency: currency || config.currency,
  })

  return <Text {...props}>{formatter.format(children)}</Text>
}
