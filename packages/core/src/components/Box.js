import React, { Children, Fragment } from 'react'
import { View } from '@react-pdf/renderer'

import Spacer from './Spacer'
import applyMultiplier from '../theming/applyMultipier'
import useTheme from '../theming/useTheme'

import processStyle from '../styling/processStyle'

export default function Box({
  as: As = View,
  style: customStyle,
  space,
  padding,
  paddingLeft,
  paddingRight,
  paddingBottom,
  paddingTop,
  margin,
  marginLeft,
  marginRight,
  marginBottom,
  marginTop,
  borderTopColor,
  borderBottomColor,
  borderLeftColor,
  borderRightColor,
  borderTopStyle,
  borderRightStyle,
  borderBottomStyle,
  borderLeftStyle,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  position,
  height,
  width,
  top,
  left,
  bottom,
  right,
  grow,
  shrink,
  flexWrap,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  order,
  alignContent,
  justifyContent,
  alignItems,
  alignSelf,
  flex,
  basis,
  direction,
  color,
  fontSize,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  bg,
  backgroundColor = bg,
  children,
  ...props
}) {
  const theme = useTheme()
  const spacing = applyMultiplier(theme.baselineGrid)

  const style = {
    flexDirection: direction,
    flexWrap,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    flex,
    justifyContent,
    alignContent,
    alignItems,
    alignSelf,
    order,
    color,
    fontSize,
    fontStyle,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    maxWidth,
    minWidth,
    width,
    maxHeight,
    minHeight,
    height,
    top,
    left,
    bottom,
    right,
    position,
    backgroundColor,
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopStyle,
    borderRightStyle,
    borderBottomStyle,
    borderLeftStyle,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    backgroundColor,
    padding: spacing(padding),
    paddingLeft: spacing(paddingLeft),
    paddingRight: spacing(paddingRight),
    paddingBottom: spacing(paddingBottom),
    paddingTop: spacing(paddingTop),
    margin: spacing(margin),
    marginLeft: spacing(marginLeft),
    marginRight: spacing(marginRight),
    marginBottom: spacing(marginBottom),
    marginTop: spacing(marginTop),
    ...customStyle,
  }

  const processedStyle = processStyle(style, theme)

  return (
    <As {...props} style={processedStyle}>
      {space
        ? Children.toArray(children).map((child, index, arr) => (
            <Fragment key={index}>
              {child}
              {index === arr.length - 1 ? null : <Spacer size={space} />}
            </Fragment>
          ))
        : children}
    </As>
  )
}

// Box.defaultProps = {
//   grow: 0,
//   shrink: 1,
//   alignItems: 'stretch',
//   direction: 'column',
//   flexWrap: 'nowrap',
// }

Box.childOf = ['Page', 'Box']
Box.lorrenTypes = {
  debug: {
    type: 'boolean',
  },
  break: {
    type: 'boolean',
  },
  fixed: {
    type: 'boolean',
  },
  wrap: {
    type: 'boolean',
  },
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
  textAlign: {
    type: 'select',
    options: ['left', 'center', 'justify', 'right'],
  },
  direction: {
    type: 'select',
    initial: 'row',
    options: ['column', 'row'],
  },
  space: {
    type: 'unit',
  },
  padding: {
    type: 'unit',
  },
  paddingLeft: {
    type: 'unit',
  },
  paddingRight: {
    type: 'unit',
  },
  paddingBottom: {
    type: 'unit',
  },
  paddingTop: {
    type: 'unit',
  },
  margin: {
    type: 'unit',
  },
  marginLeft: {
    type: 'unit',
  },
  marginRight: {
    type: 'unit',
  },
  marginBottom: {
    type: 'unit',
  },
  marginTop: {
    type: 'unit',
  },
  top: {
    type: 'unit',
  },
  left: {
    type: 'unit',
  },
  right: {
    type: 'unit',
  },
  bottom: {
    type: 'unit',
  },
  height: {
    type: 'unit',
  },
  width: {
    type: 'unit',
  },
  minWidth: {
    type: 'unit',
  },
  maxWidth: {
    type: 'unit',
  },
  minHeight: {
    type: 'unit',
  },
  maxHeight: {
    type: 'unit',
  },
  borderBottomWidth: {
    type: 'unit',
  },
  borderLeftWidth: {
    type: 'unit',
  },
  borderTopWidth: {
    type: 'unit',
  },
  borderRightWidth: {
    type: 'unit',
  },
  borderBottomStyle: {
    type: 'select',
    initial: 'solid',
    options: ['solid', 'dotted', 'dashed'],
  },
  borderLeftStyle: {
    type: 'select',
    initial: 'solid',
    options: ['solid', 'dotted', 'dashed'],
  },
  borderTopStyle: {
    type: 'select',
    initial: 'solid',
    options: ['solid', 'dotted', 'dashed'],
  },
  borderRightStyle: {
    type: 'select',
    initial: 'solid',
    options: ['solid', 'dotted', 'dashed'],
  },
  borderBottomColor: {
    type: 'color',
  },
  borderLeftColor: {
    type: 'color',
  },
  borderTopColor: {
    type: 'color',
  },
  borderRightColor: {
    type: 'color',
  },
  backgroundColor: {
    type: 'color',
  },
  alignContent: {
    type: 'select',
    initial: 'flex-start',
    options: [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ],
  },
  alignItems: {
    type: 'select',
    initial: 'stretch',
    options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
  },
  alignSelf: {
    type: 'select',
    initial: 'stretch',
    options: [
      'auto',
      'flex-start',
      'flex-end',
      'center',
      'stretch',
      'baseline',
    ],
  },
  direction: {
    type: 'select',
    initial: 'column',
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  flexWrap: {
    type: 'select',
    initial: 'nowrap',
    options: ['nowrap', 'wrap'],
  },
  grow: {
    type: 'integer',
    initial: 0,
  },
  shrink: {
    type: 'integer',
    initial: 1,
  },
  basis: {
    type: 'integer',
  },
  justifyContent: {
    type: 'select',
    initial: 'flex-start',
    options: [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ],
  },
  order: {
    type: 'integer',
  },
  position: {
    type: 'select',
    initial: 'relative',
    options: ['relative', 'absolute'],
  },
}
