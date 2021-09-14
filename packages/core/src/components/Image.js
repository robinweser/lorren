import React from 'react'
import { Image as BaseImage } from '@lorren-js/react-pdf-renderer'

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
      alignSelf={height ? 'flex-start' : undefined}
      height={height}
      src={src}
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

Image.childOf = ['Page', 'Box']
Image.renderTreeInfo = (props) => (props.src ? props.src : '')
Image.lorrenTypes = {
  src: {
    type: 'url',
  },
  description: {
    type: 'string',
  },
  height: {
    type: 'unit',
  },
  width: {
    type: 'unit',
  },
  cache: {
    type: 'boolean',
    initial: true,
  },
}
