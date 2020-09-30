import React from 'react'

import IndexReference from '../indexing/IndexReference'
import useIndex from '../indexing/useIndex'
import { SOURCE } from '../indexing/indexTokens'

import useConfig from '../configuration/useConfig'

const reference = []

export default function Source({ value, children }) {
  const { renderers } = useConfig()
  const { index } = useIndex()

  if (!value) {
    // TODO: log error
    return null
  }

  if (reference.indexOf(value) === -1) {
    reference.push(value)
  }

  const content = children
    ? typeof children === 'function'
      ? children(reference.indexOf(value) + 1)
      : children
    : renderers.source(reference.indexOf(value) + 1)

  return (
    <>
      <IndexReference type={SOURCE} reference={value} />
      {content}
    </>
  )
}