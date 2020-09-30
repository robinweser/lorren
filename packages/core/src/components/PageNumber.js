import React from 'react'

import Text from './text'

export default function PageNumber({ children }) {
  return <Fixed as={Text}>{children}</Fixed>
}
