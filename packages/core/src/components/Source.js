import React from 'react'
import PropTypes from 'prop-types'

import IndexReference from '../indexing/IndexReference'
import useIndex from '../indexing/useIndex'
import { SOURCE } from '../indexing/indexTokens'

import useConfig from '../configuration/useConfig'

const reference = []

export default function Source({ value, children }) {
  const { renderers: Renderers } = useConfig()
  const { index } = useIndex()

  if (!value) {
    // TODO: log error
    console.error('Lorren Rendering: Source was rendered without a value.')
    return null
  }

  if (reference.indexOf(value) === -1) {
    reference.push(value)
  }

  const content = children ? (
    typeof children === 'function' ? (
      children(reference.indexOf(value) + 1)
    ) : (
      children
    )
  ) : (
    <Renderers.source reference={reference.indexOf(value) + 1} />
  )

  return (
    <>
      <IndexReference type={SOURCE} reference={value} />
      {content}
    </>
  )
}

Source.propTypes = {
  value: PropTypes.string,
}
