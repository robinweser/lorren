import React from 'react'

import Text from '../components/Text'

export default function ListItem({ children, level, ...props }) {
  return <Text {...props}>{children}</Text>
}
