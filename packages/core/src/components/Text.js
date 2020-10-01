import React from 'react'
import { Text as BaseText } from '@react-pdf/renderer'

import IndexReference from '../indexing/IndexReference'
import useTheme from '../theming/useTheme'

import Box from './Box'

export default function Text({
  children,
  intent,
  variant,
  align,
  weight,
  color,
  height,
  style,
  ...props
}) {
  const theme = useTheme()

  const {
    reference,
    fontSize,
    lineHeight,
    fontWeight,
    variants,
    color: defaultColor,
    ...fontStyle
  } = theme.typography[intent]

  const text = (
    <Box
      as={BaseText}
      {...props}
      style={{
        ...fontStyle,
        color: color || defaultColor,
        textAlign: align,
        fontWeight: weight || fontWeight,
        lineHeight: height || lineHeight,
        fontSize,
        ...(variants && variants[variant] ? variants[variant] : {}),
        ...style,
      }}>
      {children}
    </Box>
  )

  if (reference) {
    return (
      <IndexReference type={reference} reference={children}>
        {text}
      </IndexReference>
    )
  }

  return text
}

Text.defaultProps = {
  intent: 'body',
}
