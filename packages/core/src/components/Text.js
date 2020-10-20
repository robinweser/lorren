import React from 'react'
import { Text as BaseText } from '@lorren/react-pdf-renderer'
import { objectFilter } from 'fast-loops'

import IndexReference from '../indexing/IndexReference'
import useTheme from '../theming/useTheme'

import Box from './Box'

export default function Text({
  text: content = '',
  children,
  intent,
  variant,
  fontSize,
  textAlign,
  fontWeight,
  color,
  lineHeight,
  letterSpacing,
  textDecorationColor,
  textDecorationStyle,
  textDecoration,
  fontStyle,
  style: customStyle,
  noReference,
  ...props
}) {
  const theme = useTheme()

  const {
    reference,
    textAlign: defaultTextAlign,
    fontSize: defaultFontSize,
    lineHeight: defaultLineHeight,
    fontWeight: defaultFontWeight,
    letterSpacing: defaultLetterSpacing,
    fontStyle: defaultFontStyle,
    color: defaultColor,
    variants,
    ...otherStyle
  } = theme.typography[intent] || {}

  const style = {
    ...otherStyle,
    display: 'inline-flex',
    textDecorationColor,
    textDecorationStyle,
    textDecoration,
    color: color || defaultColor,
    textAlign: textAlign || defaultTextAlign,
    fontWeight: fontWeight || defaultFontWeight,
    lineHeight: lineHeight || defaultLineHeight,
    letterSpacing: letterSpacing || defaultLetterSpacing,
    fontSize: fontSize || defaultFontSize,
    fontStyle: fontStyle || defaultFontStyle,
    ...(variants && variants[variant] ? variants[variant] : {}),
    ...customStyle,
  }

  const text = (
    <Box as={BaseText} {...props} style={style}>
      {content}
      {children}
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
  intent: 'body',
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
