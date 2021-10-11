import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { Text as BaseText } from '@react-pdf/renderer'

import IndexReference from '../indexing/IndexReference'
import useTheme from '../theming/useTheme'

import Box from './Box'

export const TextContext = createContext({})

const defaultVariant = 'body'
const defaultSubStyle = 'standard'
const defaultColor = 'black'

export default function Text({
  text: content = '',
  children,
  variant,
  subStyle,
  color,
  align,
  transform,
  style: customStyle,
  noReference,
  ...props
}) {
  const theme = useTheme()
  const { parentVariant, parentSubStyle, parentColor } = useContext(TextContext)

  const appliedVariant = variant || parentVariant || defaultVariant
  const appliedSubStyle = subStyle || parentSubStyle || defaultSubStyle
  const appliedColor = color || parentColor || defaultColor

  if (!theme.typography[variant]) {
    console.error(
      `Lorren Rendering: An unknown variant "${variant}" was passed to Text.`
    )
  }

  const { reference, variants, ...fontStyles } = theme.typography[variant]
  const variantStyle = (variants && variants[appliedSubStyle]) || {}

  const style = {
    ...fontStyles,
    ...variantStyle,
    color: appliedColor,
    textAlign: align,
    textTransform: transform,
    ...customStyle,
  }

  const text = (
    <Box as={BaseText} {...props} style={style}>
      <TextContext.Provider
        value={{
          parentVariant: appliedVariant,
          parentSubStyle: appliedSubStyle,
          parentColor: appliedColor,
        }}>
        {content}
        {children}
      </TextContext.Provider>
    </Box>
  )

  if (!noReference && reference) {
    return (
      <IndexReference type={reference} reference={content || children}>
        {text}
      </IndexReference>
    )
  }

  return text
}

Text.defaultProps = {
  variant: 'body',
  children: '',
}

Text.propTypes = {
  ...BaseText.propTypes,
  variant: PropTypes.string,
  subStyle: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string,
  transform: PropTypes.string,
  noReference: PropTypes.bool,
}
