import React, { createContext, useContext } from 'react'
import { Text as BaseText } from '@react-pdf/renderer'
import { objectFilter } from 'fast-loops'

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

  const { reference, variants, ...fontStyles } = theme.typography[variant]
  const standardStyle = (variants && variants.standard) || {}
  const variantStyle = (variants && variants[appliedSubStyle]) || {}

  const style = {
    ...fontStyles,
    ...standardStyle,
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
  text: '',
}

Text.childOf = ['Page', 'Box', 'Text']
Text.renderTreeInfo = (props) => (props.text ? props.text : '')

const blackListProps = [
  'direction',
  'justifyContent',
  'alignItems',
  'alignContent',
  'wrap',
  'space',
]

const usedBoxTypes = objectFilter(
  Box.lorrenTypes,
  (_, key) => blackListProps.indexOf(key) === -1
)

Text.lorrenTypes = (theme) => ({
  text: {
    type: 'string',
    initial: '',
    multiline: true,
    variable: true,
  },
  intent: {
    type: 'select',
    initial: 'body',
    hidden: Object.keys(theme.typography).length === 0,
    options: Object.keys(theme.typography || {}),
  },
  hyphenationCallback: {
    type: 'integer',
    initial: 600,
  },
  // fontFamily: {
  //   type: "select"
  //   // options: [""]
  // },
  color: {
    type: 'color',
  },
  fontSize: {
    type: 'integer',
  },
  fontStyle: {
    type: 'select',
    options: ['normal', 'italic', 'oblique'],
  },

  fontWeight: {
    type: 'select',
    options: [
      'thin',
      'ultralight',
      'light',
      'normal',
      'medium',
      'semibold',
      'bold',
      'ultrabold',
      'heavy',
    ],
  },
  letterSpacing: {
    type: 'float',
    step: 0.1,
  },
  lineHeight: {
    type: 'float',
    step: 0.1,
  },
  // "maxLines",
  textAlign: {
    type: 'select',
    options: ['left', 'center', 'justify', 'right'],
  },
  textDecorationColor: {
    type: 'string',
  },
  textDecorationStyle: {
    type: 'select',
    options: ['solid', 'double', 'dotted', 'dashed', 'wavy'],
  },
  textDecoration: {
    type: 'select',
    options: ['none', 'underline', 'line-through'],
  },
  ...Box.lorrenTypes,
})
