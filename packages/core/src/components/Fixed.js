import React from 'react'
import PropTypes from 'prop-types'

import Box from './Box'

import applyMultiplier from '../theming/applyMultipier'
import useTheme from '../theming/useTheme'

export default function Fixed({
  as: As = Box,
  top,
  left,
  right,
  bottom,
  style,
  children,
  ...props
}) {
  const theme = useTheme()
  const spacing = applyMultiplier(theme.baselineGrid)

  return (
    <As
      {...props}
      fixed
      style={{
        position: 'absolute',
        top: spacing(top),
        right: spacing(right),
        left: spacing(left),
        bottom: spacing(bottom),
        ...style,
      }}
      render={typeof children === 'function' ? children : () => children}
    />
  )
}

Fixed.propTypes = {
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
