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

Box.propTypes = {}
