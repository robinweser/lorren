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
  height,
  width,
  grow,
  shrink,
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
  display,
  wrap,
  children,
  ...props
}) {
  const theme = useTheme()
  const spacing = applyMultiplier(theme.baselineGrid)

  const style = {
    flexDirection: direction,
    flexWrap: wrap,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    flex,
    justifyContent,
    alignContent,
    alignItems,
    alignSelf,
    order,
    maxWidth,
    minWidth,
    width,
    maxHeight,
    minHeight,
    height,
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

Box.defaultProps = {
  grow: 0,
  shrink: 0,
  basis: 'auto',
  alignItems: 'stretch',
  wrap: 'nowrap',
}
