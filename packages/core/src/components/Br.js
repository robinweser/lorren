import React from 'react'
import PropTypes from 'prop-types'

export default function Br({ lines = 1 }) {
  return `\n`.repeat(lines)
}

Br.propTypes = {
  lines: PropTypes.number,
}
