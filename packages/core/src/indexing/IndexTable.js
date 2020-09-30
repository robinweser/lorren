import React, { Fragment } from 'react'

export default function IndexTable({
  index,
  include = [],
  children,
  container: Container = Fragment,
}) {
  const elements = index
    .filter(([type]) => include.indexOf(type) !== -1)
    .map(([type, content, pageNumber], index) =>
      children({ type, content, pageNumber, index })
    )

  return <Container>{elements}</Container>
}
