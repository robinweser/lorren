import { Font } from '@lorren-js/react-pdf-renderer'

const fontCache = {}

export default function renderFonts(style) {
  if (style.fontFamily && typeof style.fontFamily === 'object') {
    const { family, files, src } = style.fontFamily

    if (
      (family && files && Array.isArray(files)) ||
      (src && typeof src === 'string')
    ) {
      if (!fontCache[family]) {
        if (files) {
          Font.register({ family, fonts: files })
        } else {
          Font.register({ family, src })
        }

        fontCache[family] = true
      }

      style.fontFamily = family
    }
  }

  return style
}
