import React from 'react'
import { Image as BaseImage } from '@react-pdf/renderer'

import Box from './Box'

import IndexReference from '../indexing/IndexReference'
import { IMAGE } from '../indexing/indexTokens'

import useConfig from '../configuration/useConfig'
import useTheme from '../theming/useTheme'

export default function Image({ description, height, ...props }) {
  const { styles } = useTheme()
  const { renderers: Renderers } = useConfig()

  const image = (
    <Box
      as={BaseImage}
      alignSelf={height ? 'flex-start' : undefined}
      height={height}
      {...props}
    />
  )

  if (description) {
    return (
      <IndexReference reference={description} type={IMAGE}>
        <Box style={styles.imageContainer}>
          {image}
          <Renderers.imageDescription description={description} />
        </Box>
      </IndexReference>
    )
  }

  return image
}
