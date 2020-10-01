import fonts from './plugins/fonts'

const plugins = [fonts]

export default function processStyle(style, theme) {
  return plugins.reduce(
    (processedStyle, plugin) => plugin(processedStyle, theme),
    style
  )
}
