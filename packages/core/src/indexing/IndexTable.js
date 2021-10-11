import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

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

IndexTable.propTypes = {
  index: PropTypes.array,
  include: PropTypes.arrayOf(PropTypes.string),
  container: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]),
}
