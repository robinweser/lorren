import React from 'react'
import { Image as BaseImage } from '@react-pdf/renderer'

import Box from './Box'

import IndexReference from '../indexing/IndexReference'
import { IMAGE } from '../indexing/indexTokens'

import useConfig from '../configuration/useConfig'
import useTheme from '../theming/useTheme'

export default function Image({ description, style, height, width, ...props }) {
  const { styles } = useTheme()
  const { renderers } = useConfig()

  const image = (
    <BaseImage
      {...props}
      style={{
        alignSelf: height ? 'flex-start' : undefined,
        height,
        width,
        ...style,
      }}
    />
  )

  if (description) {
    return (
      <IndexReference reference={description} type={IMAGE}>
        <Box style={styles.imageContainer}>
          {image}
          {renderers.imageDescription(description)}
        </Box>
      </IndexReference>
    )
  }

  return image
}
