import React from 'react'
import PropTypes from 'prop-types'
import { Image as BaseImage, View } from '@react-pdf/renderer'

import Box from './Box'

import IndexReference from '../indexing/IndexReference'
import { IMAGE } from '../indexing/indexTokens'

import useConfig from '../configuration/useConfig'
import useTheme from '../theming/useTheme'

export default function Image({ src, description, height, ...props }) {
  const { styles } = useTheme()
  const { renderers: Renderers } = useConfig()

  if (!src) {
    return null
  }

  const image = (
    <Box
      as={BaseImage}
      src={src}
      height={height}
      alignSelf={height ? 'flex-start' : undefined}
      {...props}
    />
  )

  if (description) {
    return (
      <IndexReference reference={description} type={IMAGE}>
        <Box wrap={false} style={styles.imageContainer}>
          {image}
          <Renderers.imageDescription description={description} />
        </Box>
      </IndexReference>
    )
  }

  return image
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  description: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cache: PropTypes.bool,
}
