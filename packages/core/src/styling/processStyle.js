import font from './plugins/font'
import themeValue from './plugins/themeValue'

const plugins = [font, themeValue]

export default function processStyle(style, theme) {
  return plugins.reduce(
    (processedStyle, plugin) => plugin(processedStyle, theme),
    style
  )
}
