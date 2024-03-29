import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Text as BaseText } from '@react-pdf/renderer'

import useIndex from './useIndex'

export default function IndexReference({ reference, type, children }) {
  const [isAdded, setIsAdded] = useState(false)
  const index = useIndex()

  if (!index) {
    return children || null
  }

  return (
    <>
      {children}
      <BaseText
        render={({ pageNumber }) => {
          if (!isAdded) {
            index.addIndex({ type, reference, value: pageNumber })
            setIsAdded(true)
          }
        }}
      />
    </>
  )
}

IndexReference.propTypes = {
  reference: PropTypes.node,
  type: PropTypes.string,
}
